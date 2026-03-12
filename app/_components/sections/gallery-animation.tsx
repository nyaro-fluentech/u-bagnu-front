"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const TOTAL_IMAGE_BLOCKS = 7
const TOTAL_IMAGES = 9

const GalleryAnimation = () => {
  const marqueeRef = useRef<gsap.core.Tween | null>(null)
  // Initial indices matching initialImages in gallery-section.tsx
  // Block 0: 1-a.png=1, Block 1: 2-a.png=4, Block 2: 3-c.png=8
  // Block 3: 1-b.png=2, Block 4: 2-b.jpg=5, Block 5: 1-c.png=3, Block 6: 2-c.png=6
  const imageStateRef = useRef<number[]>([1, 4, 8, 2, 5, 3, 6])
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([])
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([])

  // Marquee animation
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let scrollTimeout: ReturnType<typeof setTimeout> | null = null
    let brakeTween: gsap.core.Tween | null = null
    let handleScroll: (() => void) | null = null

    const DEFAULT_SPEED = 1
    const SCROLL_SPEED = 3

    // Small delay to ensure DOM is mounted
    const initTimeout = setTimeout(() => {
      const marqueeContainer = document.querySelector(".marquee-container")
      if (!marqueeContainer) return

      const marqueeTexts = marqueeContainer.querySelectorAll(".marquee-text")
      if (!marqueeTexts.length) return

      const totalWidth = (marqueeTexts[0] as HTMLElement).offsetWidth + 80

      gsap.set(marqueeContainer, { x: 0 })

      marqueeRef.current = gsap.to(marqueeContainer, {
        x: -totalWidth,
        duration: 60,
        ease: "none",
        repeat: -1,
      })

      marqueeRef.current.timeScale(DEFAULT_SPEED)

      handleScroll = () => {
        if (!marqueeRef.current) return

        if (brakeTween) {
          brakeTween.kill()
          brakeTween = null
        }

        marqueeRef.current.timeScale(SCROLL_SPEED)

        if (scrollTimeout) clearTimeout(scrollTimeout)

        scrollTimeout = setTimeout(() => {
          if (marqueeRef.current) {
            brakeTween = gsap.to(marqueeRef.current, {
              timeScale: DEFAULT_SPEED,
              duration: 1.2,
              ease: "power3.out",
            })
          }
        }, 100)
      }

      window.addEventListener("scroll", handleScroll, { passive: true })
    }, 100)

    return () => {
      clearTimeout(initTimeout)
      if (handleScroll) {
        window.removeEventListener("scroll", handleScroll)
      }
      if (marqueeRef.current) marqueeRef.current.kill()
    }
  }, [])

  // Image cycling animation - separate effect
  useEffect(() => {
    // Mounted flag to prevent operations after cleanup
    let isMounted = true

    // Clear any existing intervals first (handles React Strict Mode)
    timeoutsRef.current.forEach((id) => clearTimeout(id))
    intervalsRef.current.forEach((id) => clearInterval(id))
    timeoutsRef.current = []
    intervalsRef.current = []

    // Reset state - maps block index to current image index in allImages
    // Must match initialImages in gallery-section.tsx
    imageStateRef.current = [1, 4, 8, 5, 2, 3, 6]

    // Queue system - only one switch at a time
    const switchQueue: number[] = []
    let isAnimating = false
    const ANIMATION_DURATION = 1500 // ms
    const MAX_RETRY_ATTEMPTS = 10

    // Get all currently used image indices
    const getUsedImages = (): Set<number> => {
      return new Set(imageStateRef.current)
    }

    // Get available image index not currently shown anywhere
    const getAvailableImageIndex = (excludeBlock: number): number | null => {
      const usedImages = getUsedImages()
      const available: number[] = []

      for (let i = 0; i < TOTAL_IMAGES; i++) {
        if (!usedImages.has(i)) {
          available.push(i)
        }
      }

      if (available.length === 0) return null
      return available[Math.floor(Math.random() * available.length)]
    }

    // Verify an image is safe to use (not used by any other block)
    const isImageSafeToUse = (imgIndex: number, forBlock: number): boolean => {
      for (let i = 0; i < TOTAL_IMAGE_BLOCKS; i++) {
        if (i === forBlock) continue
        if (imageStateRef.current[i] === imgIndex) {
          return false
        }
      }
      return true
    }

    const processQueue = () => {
      if (!isMounted || isAnimating || switchQueue.length === 0) return

      const block = switchQueue.shift()!
      isAnimating = true

      const currentImgIndex = imageStateRef.current[block]

      // Try multiple times to find a valid image
      let nextImgIndex: number | null = null
      for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
        const candidate = getAvailableImageIndex(block)
        if (candidate !== null && isImageSafeToUse(candidate, block)) {
          nextImgIndex = candidate
          break
        }
      }

      // Final verification - if still no valid image, skip this switch
      if (nextImgIndex === null || !isImageSafeToUse(nextImgIndex, block)) {
        isAnimating = false
        setTimeout(processQueue, 100)
        return
      }

      const blockContainer = document.querySelector(`.gallery-block-${block}`)
      if (!blockContainer) {
        isAnimating = false
        setTimeout(processQueue, 100)
        return
      }

      const currentEl = blockContainer.querySelector(
        `.gallery-img-${block}-${currentImgIndex}`
      )
      const nextEl = blockContainer.querySelector(
        `.gallery-img-${block}-${nextImgIndex}`
      )

      if (!currentEl || !nextEl) {
        isAnimating = false
        setTimeout(processQueue, 100)
        return
      }

      // Final check right before committing
      if (!isImageSafeToUse(nextImgIndex, block)) {
        isAnimating = false
        setTimeout(processQueue, 100)
        return
      }

      // Update state BEFORE animation to prevent duplicates
      imageStateRef.current[block] = nextImgIndex

      // Animate
      gsap.to(currentEl, {
        opacity: 0,
        duration: ANIMATION_DURATION / 1000,
        ease: "power2.inOut",
      })

      gsap.to(nextEl, {
        opacity: 1,
        duration: ANIMATION_DURATION / 1000,
        ease: "power2.inOut",
        onComplete: () => {
          isAnimating = false
          // Process next in queue after a small delay
          if (isMounted) {
            setTimeout(processQueue, 500)
          }
        },
      })
    }

    const queueBlockSwitch = (block: number) => {
      if (!isMounted) return
      // Add to queue if not already queued
      if (!switchQueue.includes(block)) {
        switchQueue.push(block)
      }
      processQueue()
    }

    // Small delay to ensure DOM is mounted
    const initTimeout = setTimeout(() => {
      if (!isMounted) return

      // Set up cycling for each block with different delays
      for (let block = 0; block < TOTAL_IMAGE_BLOCKS; block++) {
        const initialDelay = 2000 + block * 2000 // 2s, 4s, 6s, etc.
        const interval = 6000 + Math.random() * 4000 // 6-10 seconds

        const timeoutId = setTimeout(() => {
          if (!isMounted) return
          queueBlockSwitch(block)

          const intervalId = setInterval(() => {
            if (!isMounted) return
            queueBlockSwitch(block)
          }, interval)

          intervalsRef.current.push(intervalId)
        }, initialDelay)

        timeoutsRef.current.push(timeoutId)
      }
    }, 100)

    return () => {
      isMounted = false
      clearTimeout(initTimeout)
      timeoutsRef.current.forEach((id) => clearTimeout(id))
      intervalsRef.current.forEach((id) => clearInterval(id))
      timeoutsRef.current = []
      intervalsRef.current = []
    }
  }, [])

  return null
}

export default GalleryAnimation
