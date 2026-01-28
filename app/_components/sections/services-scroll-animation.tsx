"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_BREAKPOINT = 1280 // xl breakpoint

interface ServicesScrollAnimationProps {
  cardCount: number
}

const ServicesScrollAnimation = ({
  cardCount,
}: ServicesScrollAnimationProps) => {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  )
  const [isCarouselMode, setIsCarouselMode] = useState(() =>
    typeof window !== "undefined"
      ? window.innerWidth < DESKTOP_BREAKPOINT
      : false
  )

  // Track window width changes to refresh animation
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth)
        setIsCarouselMode(window.innerWidth < DESKTOP_BREAKPOINT)
      }, 100) // Debounce resize
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  // Set dynamic section height to sync horizontal and vertical scroll (desktop only)
  useLayoutEffect(() => {
    const section = document.querySelector("#services") as HTMLElement
    if (!section || windowWidth === 0 || isCarouselMode) {
      if (section) section.style.height = ""
      return
    }

    const cardWidth = 500
    const gap = 24
    const endPause = 300 // Extra scroll distance for pause at end
    const totalCardsWidth = cardCount * cardWidth + (cardCount - 1) * gap
    const scrollDistance = Math.max(
      totalCardsWidth - window.innerWidth + 244,
      0
    )

    // Section height = viewport height + scroll distance + end pause
    const requiredHeight = window.innerHeight + scrollDistance + endPause
    section.style.height = `${requiredHeight}px`

    return () => {
      section.style.height = ""
    }
  }, [cardCount, windowWidth, isCarouselMode])

  useEffect(() => {
    // Disable horizontal scroll animation on mobile/tablet (use Embla carousel instead)
    if (isCarouselMode) return

    const container = document.querySelector("#services-cards-container")
    const cards = document.querySelector("#services-cards")
    const section = document.querySelector("#services")

    if (!container || !cards || !section || windowWidth === 0) return

    const cardWidth = 500
    const gap = 24
    const endPause = 300 // Must match the value in useLayoutEffect
    const totalCardsWidth = cardCount * cardWidth + (cardCount - 1) * gap
    const scrollDistance = Math.max(
      totalCardsWidth - window.innerWidth + 244,
      0
    )

    // Reset cards position before creating new animation
    gsap.set(cards, { x: 0 })

    const ctx = gsap.context(() => {
      // Pin the section for the entire scroll distance
      ScrollTrigger.create({
        trigger: container,
        start: "center center",
        endTrigger: section,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        invalidateOnRefresh: true,
      })

      // Animate cards - ends earlier to create pause at end
      ScrollTrigger.create({
        trigger: container,
        start: "center center",
        endTrigger: section,
        end: `bottom bottom+=${endPause}`,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(cards, {
          x: -scrollDistance,
          ease: "none",
        }),
      })
    }, container)

    return () => ctx.revert()
  }, [cardCount, windowWidth, isCarouselMode])

  // This component only handles animation, no render needed
  return null
}

export default ServicesScrollAnimation
