"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HeaderAnimation = () => {
  useEffect(() => {
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
  }, [])

  return null
}

export default HeaderAnimation
