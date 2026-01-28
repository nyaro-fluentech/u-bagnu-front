"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const backgrounds = [
  "/img/background/background-1.png",
  "/img/background/background-2.png",
  "/img/background/background-3.png",
]

const HeroAnimation = () => {
  const currentIndexRef = useRef(0)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    let isMounted = true

    const switchBackground = () => {
      if (!isMounted) return

      const currentIndex = currentIndexRef.current
      const nextIndex = (currentIndex + 1) % backgrounds.length

      const currentEl = document.querySelector(`.hero-bg-${currentIndex}`)
      const nextEl = document.querySelector(`.hero-bg-${nextIndex}`)

      if (!currentEl || !nextEl) return

      currentIndexRef.current = nextIndex

      gsap.to(currentEl, {
        opacity: 0,
        duration: 0.8,
        ease: "power2.inOut",
      })

      gsap.to(nextEl, {
        opacity: 1,
        duration: 0.2,
        ease: "power2.inOut",
      })
    }

    intervalRef.current = setInterval(switchBackground, 5000)

    return () => {
      isMounted = false
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return null
}

export default HeroAnimation
