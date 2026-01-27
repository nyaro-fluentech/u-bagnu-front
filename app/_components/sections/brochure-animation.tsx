"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

const BrochureAnimation = () => {
  const hasAnimated = useRef(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    // Wait for DOM to be ready
    const initTimeout = setTimeout(() => {
      const heading = document.querySelector("#brochure-heading")
      if (!heading || hasAnimated.current) return

      // Get all text nodes and wrap words in spans
      const lines = heading.querySelectorAll("[data-animate-line]")

      lines.forEach((line) => {
        const text = line.textContent || ""
        const words = text.split(/\s+/).filter((word) => word.length > 0)

        line.innerHTML = words
          .map(
            (word) =>
              `<span class="inline-block overflow-hidden"><span class="animate-word inline-block translate-y-full opacity-0">${word}</span></span>`
          )
          .join(" ")
      })

      const wordElements = heading.querySelectorAll(".animate-word")

      // Animate words on scroll
      gsap.to(wordElements, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.03,
        ease: "power3.out",
        scrollTrigger: {
          trigger: "#brochure",
          start: "top 80%",
          once: true,
        },
      })

      hasAnimated.current = true
    }, 100)

    return () => {
      clearTimeout(initTimeout)
    }
  }, [])

  return null
}

export default BrochureAnimation
