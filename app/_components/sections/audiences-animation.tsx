"use client"

import { useEffect, useRef } from "react"

const TABLET_BREAKPOINT = 768

const AudiencesAnimation = () => {
  const isMobileRef = useRef(false)

  useEffect(() => {
    const cards = document.querySelectorAll<HTMLElement>("[data-audience-card]")
    if (cards.length === 0) return

    let currentActiveIndex: number | null = null

    const checkMobile = () => {
      const wasMobile = isMobileRef.current
      isMobileRef.current = window.innerWidth < TABLET_BREAKPOINT

      // Reset states when switching modes
      if (wasMobile !== isMobileRef.current) {
        currentActiveIndex = null
        if (isMobileRef.current) {
          // Switched to mobile - trigger scroll check
          handleMobileScroll()
        } else {
          // Switched to desktop - set first card active
          setDesktopActiveCard(0)
        }
      }
    }

    const setMobileActiveCard = (index: number | null) => {
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

    const setDesktopActiveCard = (index: number) => {
      if (currentActiveIndex === index) return
      currentActiveIndex = index

      cards.forEach((card, i) => {
        const image = card.querySelector("[data-audience-image]")
        const blueOverlay = card.querySelector("[data-audience-desktop-overlay]")
        const defaultContent = card.querySelector(
          "[data-audience-desktop-default]"
        )
        const activeContent = card.querySelector(
          "[data-audience-desktop-active]"
        )

        if (i === index) {
          // Active state
          image?.classList.add("scale-105")
          blueOverlay?.classList.add("opacity-100")
          blueOverlay?.classList.remove("opacity-0")
          defaultContent?.classList.add("opacity-0")
          defaultContent?.classList.remove("opacity-100")
          activeContent?.classList.add("opacity-100")
          activeContent?.classList.remove("opacity-0")
        } else {
          // Default state
          image?.classList.remove("scale-105")
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

    const handleMobileScroll = () => {
      if (!isMobileRef.current) return
      const mostVisibleIndex = findMostVisibleCard()
      setMobileActiveCard(mostVisibleIndex)
    }

    // Desktop hover handlers
    const handleMouseEnter = (index: number) => {
      if (isMobileRef.current) return
      setDesktopActiveCard(index)
    }

    const handleMouseLeave = () => {
      if (isMobileRef.current) return
      // Return to first card when not hovering any
      setDesktopActiveCard(0)
    }

    // Attach hover listeners for desktop
    cards.forEach((card, index) => {
      card.addEventListener("mouseenter", () => handleMouseEnter(index))
      card.addEventListener("mouseleave", handleMouseLeave)
    })

    // Initial setup
    checkMobile()
    if (isMobileRef.current) {
      handleMobileScroll()
    } else {
      setDesktopActiveCard(0)
    }

    window.addEventListener("scroll", handleMobileScroll, { passive: true })
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleMobileScroll)
      window.removeEventListener("resize", checkMobile)
      cards.forEach((card, index) => {
        card.removeEventListener("mouseenter", () => handleMouseEnter(index))
        card.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return null
}

export default AudiencesAnimation
