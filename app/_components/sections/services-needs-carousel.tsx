"use client"

import { useEffect, useState } from "react"
import EmblaCarousel from "embla-carousel"

const DESKTOP_BREAKPOINT = 1280 // xl breakpoint

const ServicesNeedsCarousel = () => {
  const [isCarouselMode, setIsCarouselMode] = useState(false)

  useEffect(() => {
    const checkBreakpoint = () => {
      setIsCarouselMode(window.innerWidth < DESKTOP_BREAKPOINT)
    }

    checkBreakpoint()
    window.addEventListener("resize", checkBreakpoint)

    return () => window.removeEventListener("resize", checkBreakpoint)
  }, [])

  useEffect(() => {
    if (!isCarouselMode) return

    const container = document.querySelector<HTMLElement>(
      "#services-needs-cards-container"
    )

    if (!container) return

    // Initialize Embla carousel
    const embla = EmblaCarousel(container, {
      align: "start",
      containScroll: false,
      dragFree: false,
    })

    return () => {
      embla.destroy()
    }
  }, [isCarouselMode])

  return null
}

export default ServicesNeedsCarousel
