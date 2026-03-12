"use client"

import { useEffect, useRef } from "react"

const DESKTOP_BREAKPOINT = 1280 // xl breakpoint

const ServicesNeedsAnimation = () => {
  const isDesktopRef = useRef(false)

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>(
      "[data-services-needs-card]"
    )
    if (cards.length === 0) return

    let currentActiveIndex: number | null = null

    const checkDesktop = () => {
      const wasDesktop = isDesktopRef.current
      isDesktopRef.current = window.innerWidth >= DESKTOP_BREAKPOINT

      // Reset states when switching modes
      if (wasDesktop !== isDesktopRef.current) {
        currentActiveIndex = null
        if (isDesktopRef.current) {
          // Switched to desktop - set first card active
          setActiveCard(0)
        } else {
          // Switched to mobile/tablet - reset all cards to default
          resetAllCards()
        }
      }
    }

    const resetAllCards = () => {
      cards.forEach((card) => {
        const content = card.querySelector("[data-services-needs-content]")
        const price = card.querySelector("[data-services-needs-price]")
        const details = card.querySelector("[data-services-needs-details]")

        card.classList.remove("active")
        content?.classList.remove("translate-y-[30px]")
        content?.classList.add("translate-y-[250px]")
        price?.classList.remove("opacity-100")
        price?.classList.add("opacity-0")
        details?.classList.remove("opacity-100")
        details?.classList.add("opacity-0")
      })
    }

    const setActiveCard = (index: number) => {
      if (currentActiveIndex === index) return
      currentActiveIndex = index

      cards.forEach((card, i) => {
        const content = card.querySelector("[data-services-needs-content]")
        const price = card.querySelector("[data-services-needs-price]")
        const details = card.querySelector("[data-services-needs-details]")

        if (i === index) {
          // Active state
          card.classList.add("active")
          content?.classList.remove("translate-y-[250px]")
          content?.classList.add("translate-y-[30px]")
          price?.classList.remove("opacity-0")
          price?.classList.add("opacity-100")
          details?.classList.remove("opacity-0")
          details?.classList.add("opacity-100")
        } else {
          // Default state
          card.classList.remove("active")
          content?.classList.remove("translate-y-[30px]")
          content?.classList.add("translate-y-[250px]")
          price?.classList.remove("opacity-100")
          price?.classList.add("opacity-0")
          details?.classList.remove("opacity-100")
          details?.classList.add("opacity-0")
        }
      })
    }

    // Hover handlers
    const handleMouseEnter = (index: number) => {
      if (!isDesktopRef.current) return
      setActiveCard(index)
    }

    const handleMouseLeave = () => {
      if (!isDesktopRef.current) return
      // Return to first card when not hovering any
      setActiveCard(0)
    }

    // Attach hover listeners
    cards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => handleMouseEnter(index))
      card.addEventListener("mouseleave", handleMouseLeave)
    })

    // Initial setup
    checkDesktop()
    if (isDesktopRef.current) {
      setActiveCard(0)
    }

    window.addEventListener("resize", checkDesktop)

    return () => {
      window.removeEventListener("resize", checkDesktop)
      cards.forEach((card, index) => {
        card.removeEventListener("mouseenter", () => handleMouseEnter(index))
        card.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return null
}

export default ServicesNeedsAnimation
