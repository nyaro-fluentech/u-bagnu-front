"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const TOTAL_SERVICES = 4

const ServicesDetailAnimation = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    let ctx: gsap.Context | null = null

    const initAnimation = () => {
      // Disable animation on smaller screens
      if (window.matchMedia("(max-width: 1280px)").matches) {
        if (ctx) {
          ctx.revert()
          ctx = null
          ScrollTrigger.getAll().forEach((t) => t.kill())
        }
        // Reset container height for mobile
        const container = document.querySelector(
          ".service-blocks-container"
        ) as HTMLElement
        if (container) {
          container.style.height = "auto"
        }
        return
      }

      ctx = gsap.context(() => {
        // Calculate and set container height based on tallest block
        const container = document.querySelector(
          ".service-blocks-container"
        ) as HTMLElement
        if (container) {
          let maxHeight = 0
          for (let i = 1; i <= TOTAL_SERVICES; i++) {
            const block = document.querySelector(
              `.service-block-${i}`
            ) as HTMLElement
            if (block) {
              // Temporarily make visible to measure
              const originalStyles = {
                position: block.style.position,
                visibility: block.style.visibility,
                opacity: block.style.opacity,
              }
              block.style.position = "relative"
              block.style.visibility = "hidden"
              block.style.opacity = "1"

              maxHeight = Math.max(maxHeight, block.offsetHeight)

              // Restore
              block.style.position = originalStyles.position
              block.style.visibility = originalStyles.visibility
              block.style.opacity = originalStyles.opacity
            }
          }
          container.style.height = `${maxHeight}px`
        }

        // Initialize all blocks and images
        for (let i = 1; i <= TOTAL_SERVICES; i++) {
          gsap.set(`.service-block-${i}`, {
            opacity: i === 1 ? 1 : 0,
            y: i === 1 ? 0 : "100%",
          })
          gsap.set(`.service-image-${i}`, {
            opacity: i === 1 ? 1 : 0,
          })
        }

        // Create ScrollTriggers for each transition
        const triggers = [
          { start: "20%", end: "35%", from: 1, to: 2 },
          { start: "40%", end: "55%", from: 2, to: 3 },
        ]

        triggers.forEach(({ start, end, from, to }) => {
          ScrollTrigger.create({
            trigger: "#services-detail",
            start: `${start} top`,
            end: `${end} top`,
            scrub: false,
            onEnter: () => {
              // Animate out current block
              gsap.to(`.service-block-${from}`, {
                y: "-100%",
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
              })
              // Animate in next block
              gsap.to(`.service-block-${to}`, {
                y: "0%",
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
              })
              // Crossfade images
              gsap.to(`.service-image-${from}`, {
                opacity: 0,
                duration: 0.5,
              })
              gsap.to(`.service-image-${to}`, {
                opacity: 1,
                duration: 0.5,
              })
            },
            onLeaveBack: () => {
              // Reverse: animate current block back in
              gsap.to(`.service-block-${from}`, {
                y: "0%",
                opacity: 1,
                duration: 0.6,
                ease: "power2.out",
              })
              // Reverse: animate next block back out
              gsap.to(`.service-block-${to}`, {
                y: "100%",
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
              })
              // Reverse crossfade images
              gsap.to(`.service-image-${from}`, {
                opacity: 1,
                duration: 0.5,
              })
              gsap.to(`.service-image-${to}`, {
                opacity: 0,
                duration: 0.5,
              })
            },
          })
        })
      })
    }

    initAnimation()

    const mediaQuery = window.matchMedia("(max-width: 1280px)")
    const handleResize = () => initAnimation()
    mediaQuery.addEventListener("change", handleResize)

    return () => {
      if (ctx) ctx.revert()
      ScrollTrigger.getAll().forEach((t) => t.kill())
      mediaQuery.removeEventListener("change", handleResize)
    }
  }, [])

  return null
}

export default ServicesDetailAnimation
