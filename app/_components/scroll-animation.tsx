"use client"

import Lenis from "lenis"
import React from "react"

const ScrollAnimation = () => {
  React.useEffect(() => {
    new Lenis({
      autoRaf: true,
    })
  }, [])

  return null
}

export default ScrollAnimation
