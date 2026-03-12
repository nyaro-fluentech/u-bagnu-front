"use client"

import { useEffect, useRef } from "react"

const SectionHashTracker = () => {
  const currentHashRef = useRef<string>("")

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("section[id]")
    if (sections.length === 0) return

    const updateHash = (hash: string) => {
      if (currentHashRef.current === hash) return
      currentHashRef.current = hash

      const newUrl = hash ? `#${hash}` : window.location.pathname
      window.history.replaceState(null, "", newUrl)
    }

    const findMostVisibleSection = () => {
      const viewportHeight = window.innerHeight
      const viewportCenter = viewportHeight / 2
      let mostVisibleSection: string | null = null
      let closestDistance = Infinity

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()

        if (rect.bottom > 0 && rect.top < viewportHeight) {
          const sectionCenter = rect.top + rect.height / 2
          const distance = Math.abs(sectionCenter - viewportCenter)

          if (distance < closestDistance) {
            closestDistance = distance
            mostVisibleSection = section.id
          }
        }
      })

      return mostVisibleSection
    }

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const visibleSection = findMostVisibleSection()
          if (visibleSection) {
            updateHash(visibleSection)
          }
          ticking = false
        })
        ticking = true
      }
    }

    handleScroll()

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return null
}

export default SectionHashTracker
