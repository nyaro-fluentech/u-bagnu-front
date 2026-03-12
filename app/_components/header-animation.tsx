"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"

const SCROLL_THRESHOLD = 50
const TABLET_BREAKPOINT = 768

const HeaderAnimation = () => {
  const lastScrollY = useRef(0)
  const isHidden = useRef(false)
  const isMobileRef = useRef(false)
  const isContactOpen = useRef(false)
  const collapsedHeaderH = useRef(0)
  const collapsedWrapperH = useRef(0)
  const btnOriginalSize = useRef({ width: 0, height: 0 })
  const savedScrollY = useRef(0)

  useEffect(() => {
    const header = document.querySelector<HTMLElement>("#header-container")
    const headerWrapper = document.querySelector<HTMLElement>("#header-wrapper")
    const contactBtn = document.querySelector<HTMLElement>("#contact-btn")
    if (!header || !headerWrapper) return

    // --- Initial states ---
    gsap.set("#contact-content", { display: "none", autoAlpha: 0, y: 24 })
    gsap.set("#contact-btn-icon", { autoAlpha: 0 })

    // --- Helpers ---
    const checkMobile = () => {
      isMobileRef.current = window.innerWidth < TABLET_BREAKPOINT
    }
    checkMobile()

    const showHeader = () => {
      if (!isHidden.current) return
      isHidden.current = false
      gsap.to(header, { yPercent: 0, duration: 0.5, ease: "power2.out" })
    }

    const hideHeader = () => {
      if (isHidden.current) return
      isHidden.current = true
      gsap.to(header, { yPercent: -100, duration: 0.5, ease: "power2.out" })
    }

    // --- Scroll handler ---
    const handleScroll = () => {
      if (isContactOpen.current) return
      const currentScrollY = window.scrollY

      if (currentScrollY <= SCROLL_THRESHOLD) {
        showHeader()
        if (isMobileRef.current) {
          gsap.to(header, { borderRadius: "0 0 24px 24px", duration: 0.3, ease: "power2.out" })
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

      if (isMobileRef.current) {
        gsap.to(header, { borderRadius: 0, duration: 0.3, ease: "power2.out" })
        gsap.to(headerWrapper, {
          paddingLeft: 0,
          paddingRight: 0,
          duration: 0.3,
          ease: "power2.out",
        })
      }

      const scrollDelta = currentScrollY - lastScrollY.current
      if (scrollDelta > 0) hideHeader()
      else if (scrollDelta < 0) showHeader()
      lastScrollY.current = currentScrollY
    }

    // --- Contact open ---
    const openContact = () => {
      if (isContactOpen.current) return
      isContactOpen.current = true
      savedScrollY.current = window.scrollY
      document.body.style.position = "fixed"
      document.body.style.top = `-${savedScrollY.current}px`
      document.body.style.width = "100%"

      collapsedHeaderH.current = header.offsetHeight
      collapsedWrapperH.current = headerWrapper.offsetHeight

      // Lock button dimensions before morphing
      if (!isMobileRef.current && contactBtn) {
        btnOriginalSize.current = {
          width: contactBtn.offsetWidth,
          height: contactBtn.offsetHeight,
        }
        gsap.set("#contact-btn", {
          overflow: "hidden",
          width: btnOriginalSize.current.width,
          height: btnOriginalSize.current.height,
        })
      }

      const tl = gsap.timeline()

      tl
        // Phase 0 — nav links fade, button text fades, button morphs to circle
        .to("#header-nav-links", { autoAlpha: 0, duration: 0.2, ease: "power2.in" })
        .to("#mobile-menu-wrapper", { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, "<")
        .to("#contact-btn-text", { autoAlpha: 0, duration: 0.15, ease: "power2.in" }, "<")
        .to(
          "#contact-btn",
          { width: 52, height: 52, borderRadius: "50%", padding: 0, duration: 0.4, ease: "power3.inOut" },
          "<0.05"
        )
        .to("#contact-btn-icon", { autoAlpha: 1, duration: 0.2, ease: "power2.out" }, ">-0.15")

        // Phase 1 — width to full + background becomes opaque
        .to(
          headerWrapper,
          { paddingLeft: 0, paddingRight: 0, duration: 0.55, ease: "expo.out" },
          ">-0.05"
        )
        .to(
          header,
          { borderRadius: 0, maxWidth: "100%", backgroundColor: "#FBE9C6", duration: 0.55, ease: "expo.out" },
          "<"
        )

        // Phase 2 — height to full
        .to(headerWrapper, { height: "100dvh", duration: 0.65, ease: "expo.out" })
        .to(header, { height: "100%", overflowY: "auto", duration: 0.65, ease: "expo.out" }, "<")

        // Phase 3 — content fade in
        .set("#contact-content", { display: "block" })
        .to("#contact-content", { autoAlpha: 1, y: 0, duration: 0.45, ease: "power2.out" })
    }

    // --- Contact close ---
    const closeContact = () => {
      if (!isContactOpen.current) return
      isContactOpen.current = false
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
      window.scrollTo(0, savedScrollY.current)

      const paddingH = isMobileRef.current ? 16 : 31
      const radius = isMobileRef.current ? "0 0 24px 24px" : "0 0 40px 40px"

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(header, { clearProps: "maxWidth,height,borderRadius,backgroundColor,overflowY" })
          gsap.set(headerWrapper, { clearProps: "paddingLeft,paddingRight,height" })
          gsap.set("#contact-content", { display: "none", autoAlpha: 0, y: 24 })
          gsap.set("#contact-btn", { clearProps: "width,height,borderRadius,padding,overflow" })
          gsap.set("#contact-btn-icon", { autoAlpha: 0 })
          gsap.set("#contact-btn-text", { autoAlpha: 1 })
        },
      })

      tl
        // Fade out content
        .to("#contact-content", { autoAlpha: 0, y: 12, duration: 0.3, ease: "power2.in" })

        // Shrink height — disable scroll first so it doesn't interfere
        .set(header, { overflowY: "hidden" })
        .to(headerWrapper, { height: collapsedWrapperH.current, duration: 0.65, ease: "power3.inOut" })
        .to(header, { height: collapsedHeaderH.current, duration: 0.65, ease: "power3.inOut" }, "<")

        // Shrink width
        .to(headerWrapper, {
          paddingLeft: paddingH,
          paddingRight: paddingH,
          duration: 0.65,
          ease: "power3.inOut",
        })
        .to(
          header,
          {
            borderRadius: radius,
            maxWidth: "1001px",
            backgroundColor: "rgba(251, 233, 198, 0.698)",
            duration: 0.65,
            ease: "power3.inOut",
          },
          "<"
        )

        // Button morphs back to pill during width shrink
        .to("#contact-btn-icon", { autoAlpha: 0, duration: 0.2, ease: "power2.in" }, "<0.05")
        .to(
          "#contact-btn",
          {
            width: btnOriginalSize.current.width,
            height: btnOriginalSize.current.height,
            borderRadius: "72px",
            padding: "18px 32px",
            duration: 0.55,
            ease: "power3.inOut",
          },
          "<0.1"
        )
        .to("#contact-btn-text", { autoAlpha: 1, duration: 0.2, ease: "power2.out" }, ">-0.15")
        .to("#header-nav-links", { autoAlpha: 1, duration: 0.25, ease: "power2.out" }, "<0.08")
        .to("#mobile-menu-wrapper", { autoAlpha: 1, duration: 0.25, ease: "power2.out" }, "<")
    }

    const handleContactClick = () => {
      if (isContactOpen.current) closeContact()
      else openContact()
    }

    const handleWheel = (e: WheelEvent) => {
      if (!isContactOpen.current) return
      e.preventDefault()
      const delta = e.deltaMode === 1 ? e.deltaY * 20 : e.deltaY
      header.scrollBy({ top: delta })
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("wheel", handleWheel, { passive: false })
    window.addEventListener("resize", checkMobile)
    contactBtn?.addEventListener("click", handleContactClick)

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("wheel", handleWheel)
      window.removeEventListener("resize", checkMobile)
      contactBtn?.removeEventListener("click", handleContactClick)
      document.body.style.position = ""
      document.body.style.top = ""
      document.body.style.width = ""
    }
  }, [])

  return null
}

export default HeaderAnimation
