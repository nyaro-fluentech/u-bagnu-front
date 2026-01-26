"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const HeaderAnimation = () => {
  useEffect(() => {
    const header = document.querySelector("#header-container")
    const section = document.querySelector("#services")

    if (!header || !section) return

    const ctx = gsap.context(() => {
      // Fade out when entering services section
      ScrollTrigger.create({
        trigger: section,
        start: "top 120px",
        end: "top 0px",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(header, {
            opacity: 1 - self.progress,
            pointerEvents: self.progress > 0.5 ? "none" : "auto",
          })
        },
      })

      // Fade back in when leaving services section
      ScrollTrigger.create({
        trigger: section,
        start: "bottom bottom",
        end: "bottom top+=120px",
        scrub: true,
        onUpdate: (self) => {
          gsap.set(header, {
            opacity: self.progress,
            pointerEvents: self.progress > 0.5 ? "auto" : "none",
          })
        },
      })
    })

    return () => ctx.revert()
  }, [])

  return null
}

export default HeaderAnimation
