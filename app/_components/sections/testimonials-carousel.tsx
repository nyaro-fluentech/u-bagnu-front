"use client"

import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import { useCallback, useEffect, useState } from "react"

interface Testimonial {
  id: number
  name: string
  title: string
  quote: string
  image: string
}

interface TestimonialsCarouselProps {
  testimonials: Testimonial[]
}

const AUTOPLAY_INTERVAL = 5000 // 5 seconds

const TestimonialsCarousel = ({ testimonials }: TestimonialsCarouselProps) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
  const [isPaused, setIsPaused] = useState(false)
  const [isEnabled, setIsEnabled] = useState(true)

  // Auto-switch functionality
  useEffect(() => {
    if (!emblaApi || !isEnabled) return

    let intervalId: ReturnType<typeof setInterval> | null = null

    const startAutoplay = () => {
      if (intervalId) clearInterval(intervalId)
      intervalId = setInterval(() => {
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext()
        }
      }, AUTOPLAY_INTERVAL)
    }

    const stopAutoplay = () => {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
    }

    // Start autoplay if enabled and not paused
    if (!isPaused) {
      startAutoplay()
    }

    return () => stopAutoplay()
  }, [emblaApi, isEnabled, isPaused])

  // Pause on hover
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false)
  }, [])

  // Pause on focus within
  const handleFocusIn = useCallback(() => {
    setIsPaused(true)
  }, [])

  const handleFocusOut = useCallback((e: React.FocusEvent) => {
    // Only unpause if focus moves outside the carousel
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsPaused(false)
    }
  }, [])

  // Pause when tab is not visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPaused(true)
      } else {
        setIsPaused(false)
      }
    }

    document.addEventListener("visibilitychange", handleVisibilityChange)
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange)
    }
  }, [])

  // Respect reduced motion preference - disable autoplay entirely
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsEnabled(!e.matches)
    }

    handleChange(mediaQuery)
    mediaQuery.addEventListener("change", handleChange)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
    }
  }, [])

  return (
    <div
      className="relative z-10 h-full"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocusIn}
      onBlur={handleFocusOut}
    >
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="max-auto flex min-w-0 flex-[0_0_100%] justify-center"
            >
              {/* Mobile/Tablet Layout */}
              <div className="relative flex px-[24px] sm:items-end md:min-h-[500px] md:px-[48px] lg:hidden">
                {/* Image - absolute positioned */}
                <div className="relative w-[50%] md:h-[480px]">
                  <Image
                    src={testimonial.image}
                    alt={`Portrait de ${testimonial.name}`}
                    fill
                    className="object-contain object-bottom"
                  />
                </div>

                {/* Testimonial Content - positioned to the right */}
                <div className="ml-auto flex flex-1 flex-col justify-end gap-[8px] py-[16px] md:justify-center md:gap-[12px] md:py-[24px] md:pb-[64px]">
                  <div className="flex flex-col gap-[2px] md:gap-[4px]">
                    <h3 className="font-inter text-[18px] font-bold md:text-[24px]">
                      {testimonial.name}
                    </h3>
                    <p className="font-inter text-[11px] italic md:text-[14px]">
                      {testimonial.title}
                    </p>
                  </div>

                  <blockquote className="font-inter text-[12px] leading-[150%] md:text-[15px]">
                    &laquo; {testimonial.quote} &raquo;
                  </blockquote>
                </div>
              </div>

              {/* Desktop Layout */}
              <div className="hidden h-full items-center justify-center px-[122px] lg:flex">
                {/* Content wrapper */}
                <div className="flex w-full max-w-[1196px] items-start justify-center gap-[37px]">
                  {/* Image */}
                  <div className="relative h-[700px] w-[500px] shrink-0">
                    <Image
                      src={testimonial.image}
                      alt={`Portrait de ${testimonial.name}`}
                      fill
                      className="object-contain object-bottom"
                      sizes="500px"
                    />
                  </div>

                  {/* Testimonial Content */}
                  <div className="flex max-w-[446px] flex-1 flex-col gap-[24px] pb-[120px]">
                    {/* Header with name and quote icon */}
                    <div className="flex items-start justify-between">
                      <div className="flex flex-col gap-[4px]">
                        <h3 className="font-inter text-[32px] font-bold">
                          {testimonial.name}
                        </h3>
                        <p className="font-inter text-[16px] italic">
                          {testimonial.title}
                        </p>
                      </div>

                      {/* Quote icon */}
                      <svg
                        width="58"
                        height="50"
                        viewBox="0 0 58 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                      >
                        <path
                          d="M31.9089 2.13646C31.5984 2.64267 31.3888 3.20623 31.292 3.79498C31.1953 4.38372 31.2133 4.98612 31.345 5.56778C31.4768 6.14943 31.7197 6.69895 32.0599 7.18497C32.4 7.67098 32.8309 8.08396 33.3277 8.40034C38.7578 11.8464 43.0717 16.8454 45.7308 22.7736C43.0454 22.5448 40.3548 23.1472 38.011 24.5019C35.6672 25.8566 33.7793 27.9006 32.5943 30.3664C31.4094 32.8322 30.9825 35.605 31.3696 38.3221C31.7567 41.0391 32.9397 43.5738 34.7639 45.5946C36.5881 47.6154 38.9685 49.0281 41.5936 49.6479C44.2188 50.2678 46.9664 50.0658 49.4771 49.0686C51.9878 48.0713 54.1445 46.3252 55.6652 44.0586C57.1858 41.792 57.9996 39.1106 58 36.3651V36.2423C57.9951 35.8904 57.9803 35.5388 57.9554 35.1878C57.9152 34.5059 57.8349 33.5513 57.6788 32.3786C57.3665 30.0466 56.7552 26.8329 55.5194 23.2237C53.0566 15.9961 48.0686 7.06393 38.0569 0.690948C37.5601 0.374568 37.0069 0.160992 36.4291 0.0624119C35.8512 -0.0361679 35.26 -0.0178199 34.6891 0.116408C34.1182 0.250636 33.5788 0.498116 33.1018 0.844717C32.6248 1.19132 32.2195 1.63025 31.9089 2.13646ZM0.678169 2.13646C0.367641 2.64267 0.158016 3.20623 0.0612602 3.79498C-0.0354958 4.38372 -0.0174866 4.98612 0.114258 5.56778C0.246002 6.14943 0.488903 6.69895 0.829094 7.18497C1.16928 7.67098 1.6001 8.08396 2.09694 8.40034C7.52708 11.8464 11.8409 16.8454 14.5 22.7736C11.8147 22.5448 9.12408 23.1472 6.78025 24.5019C4.43643 25.8566 2.54853 27.9006 1.36356 30.3664C0.178593 32.8322 -0.248264 35.605 0.138836 38.3221C0.52594 41.0391 1.70898 43.5738 3.53316 45.5946C5.35735 47.6154 7.73773 49.0281 10.3629 49.6479C12.988 50.2678 15.7357 50.0658 18.2463 49.0686C20.757 48.0713 22.9137 46.3252 24.4344 44.0586C25.9551 41.792 26.7688 39.1106 26.7692 36.3651V36.2423C26.7644 35.8904 26.7495 35.5388 26.7246 35.1878C26.6845 34.5059 26.6042 33.5513 26.448 32.3786C26.1357 30.0466 25.5245 26.8329 24.2886 23.2237C21.8259 15.9961 16.8379 7.06393 6.82616 0.690948C6.32932 0.374568 5.77618 0.160992 5.19833 0.0624119C4.62048 -0.0361679 4.02922 -0.0178199 3.45833 0.116408C2.88744 0.250636 2.34808 0.498116 1.87106 0.844717C1.39404 1.19132 0.988693 1.63025 0.678169 2.13646Z"
                          fill="black"
                        />
                      </svg>
                    </div>

                    {/* Quote text */}
                    <blockquote className="font-inter text-[24px] leading-[100%]">
                      &laquo; {testimonial.quote} &raquo;
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TestimonialsCarousel
