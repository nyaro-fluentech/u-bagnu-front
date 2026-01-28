"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const SCROLL_THRESHOLD = 50
const TABLET_BREAKPOINT = 768

const HeaderAnimation = () => {
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)
  const isMobileRef = useRef(false)

  useEffect(() => {
    const header = document.querySelector("#header-container")
    const headerWrapper = document.querySelector("#header-wrapper")
    if (!header) return

    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < TABLET_BREAKPOINT
    }
    checkMobile()

    const showHeader = () => {
      if (!isHidden.current) return
      isHidden.current = false
      gsap.to(header, {
        yPercent: 0,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const hideHeader = () => {
      if (isHidden.current) return
      isHidden.current = true
      gsap.to(header, {
        yPercent: -100,
        duration: 0.3,
        ease: "power2.out",
      })
    }

    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Always show header when near top
      if (currentScrollY <= SCROLL_THRESHOLD) {
        showHeader()
        // Reset mobile styles when at top
        if (isMobileRef.current && headerWrapper) {
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
        lastScrollY.current = currentScrollY
        return
      }

      // Apply mobile styles when scrolled (mobile only)
      if (isMobileRef.current && headerWrapper) {
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
      }

      const scrollDelta = currentScrollY - lastScrollY.current

      // Scrolling down
      if (scrollDelta > 0) {
        hideHeader()
      }
      // Scrolling up
      else if (scrollDelta < 0) {
        showHeader()
      }

      lastScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  return null
}

export default HeaderAnimation
