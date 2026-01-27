"use client"

import { useEffect, useState } from "react"

const TABLET_BREAKPOINT = 768

const AudiencesAnimation = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < TABLET_BREAKPOINT)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    if (!isMobile) return

    const cards = document.querySelectorAll<HTMLElement>("[data-audience-card]")
    if (cards.length === 0) return

    let currentActiveIndex: number | null = null

    const setActiveCard = (index: number | null) => {
      if (currentActiveIndex === index) return

      currentActiveIndex = index

      cards.forEach((card, i) => {
        const image = card.querySelector("[data-audience-image]")
        const darkOverlay = card.querySelector("[data-audience-overlay]")
        const blueOverlay = card.querySelector("[data-audience-blue-overlay]")
        const defaultContent = card.querySelector(
          "[data-audience-content-default]"
        )
        const activeContent = card.querySelector(
          "[data-audience-content-active]"
        )

        if (i === index) {
          // Active state
          image?.classList.remove("grayscale", "brightness-75")
          image?.classList.add("grayscale-0", "brightness-100", "scale-105")
          darkOverlay?.classList.add("opacity-0")
          darkOverlay?.classList.remove("opacity-100")
          blueOverlay?.classList.add("opacity-100")
          blueOverlay?.classList.remove("opacity-0")
          defaultContent?.classList.add("opacity-0")
          defaultContent?.classList.remove("opacity-100")
          activeContent?.classList.add("opacity-100")
          activeContent?.classList.remove("opacity-0")
        } else {
          // Default state
          image?.classList.add("grayscale", "brightness-75")
          image?.classList.remove("grayscale-0", "brightness-100", "scale-105")
          darkOverlay?.classList.remove("opacity-0")
          darkOverlay?.classList.add("opacity-100")
          blueOverlay?.classList.remove("opacity-100")
          blueOverlay?.classList.add("opacity-0")
          defaultContent?.classList.remove("opacity-0")
          defaultContent?.classList.add("opacity-100")
          activeContent?.classList.remove("opacity-100")
          activeContent?.classList.add("opacity-0")
        }
      })
    }

    const findMostVisibleCard = () => {
      const viewportCenter = window.innerHeight / 2
      let closestIndex: number | null = null
      let closestDistance = Infinity

      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect()
        const cardCenter = rect.top + rect.height / 2
        const distance = Math.abs(cardCenter - viewportCenter)

        // Only consider cards that are at least partially visible
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          if (distance < closestDistance) {
            closestDistance = distance
            closestIndex = index
          }
        }
      })

      return closestIndex
    }

    const handleScroll = () => {
      const mostVisibleIndex = findMostVisibleCard()
      setActiveCard(mostVisibleIndex)
    }

    // Initial check
    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [isMobile])

  return null
}

export default AudiencesAnimation
