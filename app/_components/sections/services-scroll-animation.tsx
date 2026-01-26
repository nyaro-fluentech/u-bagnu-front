"use client"

import { useEffect, useLayoutEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface ServicesScrollAnimationProps {
  cardCount: number
}

const ServicesScrollAnimation = ({
  cardCount,
}: ServicesScrollAnimationProps) => {
  const [windowWidth, setWindowWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 0
  )

  // Track window width changes to refresh animation
  useEffect(() => {
    let resizeTimeout: NodeJS.Timeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(() => {
        setWindowWidth(window.innerWidth)
      }, 100) // Debounce resize
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      clearTimeout(resizeTimeout)
    }
  }, [])

  // Set dynamic section height to sync horizontal and vertical scroll
  useLayoutEffect(() => {
    const section = document.querySelector("#services") as HTMLElement
    if (!section || windowWidth === 0) return

    const cardWidth = 500
    const gap = 24
    const totalCardsWidth = cardCount * cardWidth + (cardCount - 1) * gap
    const scrollDistance = Math.max(
      totalCardsWidth - window.innerWidth + 244,
      0
    )

    // Section height = viewport height + scroll distance (1:1 ratio for fluid feel)
    const requiredHeight = window.innerHeight + scrollDistance
    section.style.height = `${requiredHeight}px`

    return () => {
      section.style.height = ""
    }
  }, [cardCount, windowWidth])

  useEffect(() => {
    const container = document.querySelector("#services-cards-container")
    const cards = document.querySelector("#services-cards")
    const section = document.querySelector("#services")

    if (!container || !cards || !section || windowWidth === 0) return

    const cardWidth = 500
    const gap = 24
    const totalCardsWidth = cardCount * cardWidth + (cardCount - 1) * gap
    const scrollDistance = Math.max(
      totalCardsWidth - window.innerWidth + 244,
      0
    )

    // Reset cards position before creating new animation
    gsap.set(cards, { x: 0 })

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "center center",
        endTrigger: section,
        end: "bottom bottom",
        pin: true,
        pinSpacing: false,
        scrub: 1,
        invalidateOnRefresh: true,
        animation: gsap.to(cards, {
          x: -scrollDistance,
          ease: "none",
        }),
      })
    }, container)

    return () => ctx.revert()
  }, [cardCount, windowWidth])

  // This component only handles animation, no render needed
  return null
}

export default ServicesScrollAnimation
