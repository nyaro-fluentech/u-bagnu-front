"use client"

import Lenis from "lenis"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

gsap.registerPlugin(ScrollTrigger, SplitText)

const ScrollAnimation = () => {
  const splitInstancesRef = useRef<SplitText[]>([])
  const triggersRef = useRef<ScrollTrigger[]>([])

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    })

    return () => {
      lenis.destroy()
    }
  }, [])

  // SplitText animation
  useEffect(() => {
    const initSplitText = () => {
      // Clear previous instances
      splitInstancesRef.current.forEach((instance) => instance.revert())
      triggersRef.current.forEach((trigger) => trigger.kill())
      splitInstancesRef.current = []
      triggersRef.current = []

      const containers = gsap.utils.toArray<HTMLElement>(".split-container")

      containers.forEach((container) => {
        const text = container.querySelector(".split")
        if (!text) return

        gsap.set(text, { opacity: 1 })

        SplitText.create(text, {
          type: "words,lines",
          mask: "lines",
          linesClass: "line",
          autoSplit: true,
          onSplit: (instance: SplitText) => {
            splitInstancesRef.current.push(instance)

            const tween = gsap.from(instance.lines, {
              yPercent: 120,
              stagger: 0.1,
              scrollTrigger: {
                trigger: container,
                scrub: false,
                start: "center-=100 bottom",
              },
            })

            if (tween.scrollTrigger) {
              triggersRef.current.push(tween.scrollTrigger)
            }
          },
        })
      })
    }

    // Wait for fonts to load before splitting text
    document.fonts.ready.then(initSplitText)

    return () => {
      splitInstancesRef.current.forEach((instance) => instance.revert())
      triggersRef.current.forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}

export default ScrollAnimation
