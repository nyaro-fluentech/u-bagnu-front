"use client"

import React, { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const menuItems = [
  { label: "Services", href: "#services" },
  { label: "Offres", href: "#offers" },
  { label: "À propos", href: "#about" },
  { label: "Galerie", href: "#gallery" },
  { label: "Témoignages", href: "#testimonials" },
]

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted] = useState(() => {
    // Check if we're on the client side
    if (typeof window !== "undefined") {
      return true
    }
    return false
  })

  const toggleMenu = () => {
    if (isOpen) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsAnimating(false)
      }, 400)
    } else {
      setIsOpen(true)
    }
  }

  const closeMenu = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimating(false)
    }, 400)
  }

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  // Store button position for portal rendering
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Update button position when menu opens
  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setButtonPosition({
        top: rect.top,
        right: window.innerWidth - rect.right,
      })
    }
  }, [isOpen])

  const BurgerButton = (
    <button
      ref={!isOpen ? buttonRef : undefined}
      onClick={toggleMenu}
      className={`flex h-[40px] w-[40px] flex-col items-center justify-center gap-[6px] lg:hidden ${isOpen ? "fixed z-101 -translate-x-[32px] translate-y-[32px]" : "text-primary relative z-101"}`}
      style={
        isOpen
          ? { top: buttonPosition.top, right: buttonPosition.right }
          : undefined
      }
      aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      aria-expanded={isOpen}
    >
      <span
        className={`block h-[3px] w-[28px] rounded-full transition-all duration-300 ease-out ${isOpen ? "translate-y-[9px] rotate-45 bg-white" : "bg-primary"}`}
      />
      <span
        className={`block h-[3px] w-[28px] rounded-full transition-all duration-300 ease-out ${isOpen ? "scale-0 bg-white opacity-0" : "bg-primary"}`}
      />
      <span
        className={`block h-[3px] w-[28px] rounded-full transition-all duration-300 ease-out ${isOpen ? "-translate-y-[9px] -rotate-45 bg-white" : "bg-primary"}`}
      />
    </button>
  )

  return (
    <>
      {/* Burger button - when closed, render in place; when open, render via portal */}
      {!isOpen && BurgerButton}
      {mounted && isOpen && createPortal(BurgerButton, document.body)}

      {/* Mobile menu overlay - rendered via portal to bypass header's backdrop-blur containing block */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-100 flex h-screen w-screen flex-col lg:hidden ${isAnimating ? "animate-menu-out" : "animate-menu-in"}`}
            role="dialog"
            aria-modal="true"
          >
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-[#2954A4] via-[#1e4080] to-[#152d5c]" />

            {/* Decorative circles */}
            <div className="absolute -top-[100px] -right-[100px] h-[300px] w-[300px] rounded-full bg-white/5" />
            <div className="absolute -bottom-[150px] -left-[150px] h-[400px] w-[400px] rounded-full bg-white/5" />
            <div className="absolute top-1/2 right-[10%] h-[200px] w-[200px] rounded-full bg-[#FFE8C2]/10" />

            {/* Content */}
            <div className="relative z-10 flex flex-1 flex-col px-[32px] pt-[120px] pb-[48px]">
              {/* Navigation */}
              <nav className="flex-1">
                <ul className="flex flex-col gap-[8px]">
                  {menuItems.map((item, index) => (
                    <li
                      key={item.href}
                      className={`overflow-hidden ${isAnimating ? "animate-item-out" : "animate-item-in"}`}
                      style={{
                        animationDelay: isAnimating
                          ? `${(menuItems.length - 1 - index) * 50}ms`
                          : `${index * 80 + 200}ms`,
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={closeMenu}
                        className="font-bricolage-grotesque group flex items-center gap-[16px] py-[12px] text-[32px] font-medium text-white transition-all duration-300 hover:translate-x-[8px] md:text-[40px]"
                      >
                        <span className="h-[2px] w-0 bg-[#FFE8C2] transition-all duration-300 group-hover:w-[24px]" />
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Bottom section */}
              <div
                className={`flex flex-col gap-[24px] ${isAnimating ? "animate-fade-out" : "animate-fade-in"}`}
                style={{ animationDelay: isAnimating ? "0ms" : "500ms" }}
              >
                {/* Contact button */}
                <Button
                  variant="secondary"
                  className="w-full rounded-full bg-[#FFE8C2] py-[20px] text-[18px] font-semibold text-[#2954A4] transition-all duration-300 hover:scale-[1.02] hover:bg-white"
                  onClick={closeMenu}
                >
                  Contactez-nous
                </Button>

                {/* Social links */}
                <div className="flex items-center justify-center gap-[24px]">
                  <Link
                    href="https://instagram.com/ubagnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="text-white/70 transition-colors duration-300 hover:text-[#FFE8C2]"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="https://facebook.com/ubagnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="text-white/70 transition-colors duration-300 hover:text-[#FFE8C2]"
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden="true"
                    >
                      <path
                        d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
                        fill="currentColor"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Footer text */}
                <p className="font-inter text-center text-[12px] text-white/50">
                  Récupération & bien-être en Corse
                </p>
              </div>
            </div>

            {/* CSS Animations */}
            <style jsx>{`
              @keyframes menuIn {
                from {
                  opacity: 0;
                  transform: translateY(-20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes menuOut {
                from {
                  opacity: 1;
                  transform: translateY(0);
                }
                to {
                  opacity: 0;
                  transform: translateY(-20px);
                }
              }

              @keyframes itemIn {
                from {
                  opacity: 0;
                  transform: translateX(-30px);
                }
                to {
                  opacity: 1;
                  transform: translateX(0);
                }
              }

              @keyframes itemOut {
                from {
                  opacity: 1;
                  transform: translateX(0);
                }
                to {
                  opacity: 0;
                  transform: translateX(-30px);
                }
              }

              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              @keyframes fadeOut {
                from {
                  opacity: 1;
                  transform: translateY(0);
                }
                to {
                  opacity: 0;
                  transform: translateY(20px);
                }
              }

              .animate-menu-in {
                animation: menuIn 0.4s ease-out forwards;
              }

              .animate-menu-out {
                animation: menuOut 0.4s ease-in forwards;
              }

              .animate-item-in {
                opacity: 0;
                animation: itemIn 0.5s ease-out forwards;
              }

              .animate-item-out {
                animation: itemOut 0.3s ease-in forwards;
              }

              .animate-fade-in {
                opacity: 0;
                animation: fadeIn 0.5s ease-out forwards;
              }

              .animate-fade-out {
                animation: fadeOut 0.3s ease-in forwards;
              }
            `}</style>
          </div>,
          document.body
        )}
    </>
  )
}

export default MobileMenu
