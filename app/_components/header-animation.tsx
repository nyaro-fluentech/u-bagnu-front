"use client"

import { useEffect, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const TABLET_BREAKPOINT = 768
const MOBILE_SCROLL_THRESHOLD = 50

const HeaderAnimation = () => {
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < TABLET_BREAKPOINT)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Mobile scroll effect - full width and no radius after scroll
  useEffect(() => {
    if (!isMobile) return

    const header = document.querySelector("#header-container")
    const headerWrapper = document.querySelector("#header-wrapper")
    if (!header || !headerWrapper) return

    let isScrolled = false

    const handleScroll = () => {
      const scrollY = window.scrollY

      if (scrollY > MOBILE_SCROLL_THRESHOLD && !isScrolled) {
        isScrolled = true
        gsap.to(header, {
          borderRadius: 0,
          duration: 0.3,
          ease: "power2.out",
        })
        gsap.to(headerWrapper, {
          paddingLeft: 0,
          paddingRight: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      } else if (scrollY <= MOBILE_SCROLL_THRESHOLD && isScrolled) {
        isScrolled = false
        gsap.to(header, {
          borderRadius: "0 0 24px 24px",
          duration: 0.3,
          ease: "power2.out",
        })
        gsap.to(headerWrapper, {
          paddingLeft: 16,
          paddingRight: 16,
          duration: 0.3,
          ease: "power2.out",
        })
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => window.removeEventListener("scroll", handleScroll)
  }, [isMobile])

  // Desktop hide/show effect
  useEffect(() => {
    // Don't apply hide animation on mobile
    if (isMobile) return

    const header = document.querySelector("#header-container")
    if (!header) return

    // Get all sections with data-hide-header attribute, sorted by data-numero
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-hide-header]")
    ).sort((a, b) => {
      const numA = parseInt(a.dataset.numero || "0", 10)
      const numB = parseInt(b.dataset.numero || "0", 10)
      return numA - numB
    })

    if (sections.length === 0) return

    const firstSection = sections[0]
    const lastSection = sections[sections.length - 1]

    const showHeader = () => {
      gsap.set(header, { pointerEvents: "auto" })
      gsap.to(header, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      })
    }

    const hideHeader = () => {
      gsap.to(header, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          gsap.set(header, { pointerEvents: "none" })
        },
      })
    }

    const ctx = gsap.context(() => {
      // Hide header when entering first section
      ScrollTrigger.create({
        trigger: firstSection,
        start: "top 120px",
        onEnter: hideHeader,
        onLeaveBack: showHeader,
      })

      // Show header when leaving last section
      ScrollTrigger.create({
        trigger: lastSection,
        start: "bottom top",
        onEnter: showHeader,
        onLeaveBack: hideHeader,
      })
    })

    return () => ctx.revert()
  }, [isMobile])

  return null
}

export default HeaderAnimation
