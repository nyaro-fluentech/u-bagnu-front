"use client"

import { useState, useEffect, useRef } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const menuItems = [
  { label: "Services", href: "#services" },
  { label: "Offres", href: "#offers" },
  { label: "À propos", href: "#about" },
]

const contacts = [
  { name: "Jean-Laurent GERONIMI", phone: "06.34.52.35.58" },
  { name: "Gilles Palmesani", phone: "06.12.27.07.11" },
]

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [buttonPosition, setButtonPosition] = useState({ top: 0, right: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setButtonPosition({
          top: rect.top,
          right: window.innerWidth - rect.right,
        })
      }
    }
    updatePosition()
    window.addEventListener("resize", updatePosition)
    window.addEventListener("scroll", updatePosition)
    return () => {
      window.removeEventListener("resize", updatePosition)
      window.removeEventListener("scroll", updatePosition)
    }
  }, [])

  const toggleMenu = () => {
    if (isOpen) {
      setIsAnimating(true)
      setTimeout(() => {
        setIsOpen(false)
        setIsAnimating(false)
      }, 400)
    } else {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect()
        setButtonPosition({
          top: rect.top,
          right: window.innerWidth - rect.right,
        })
      }
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

  return (
    <>
      {/* Placeholder button */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`flex h-[40px] w-[40px] flex-col items-center justify-center gap-[6px] lg:hidden ${isOpen ? "pointer-events-none opacity-0" : ""}`}
        aria-label="Ouvrir le menu"
        aria-expanded={isOpen}
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
      >
        <span className="bg-primary block h-[3px] w-[28px] rounded-full transition-all duration-300 ease-out" />
        <span className="bg-primary block h-[3px] w-[28px] rounded-full transition-all duration-300 ease-out" />
        <span className="bg-primary block h-[3px] w-[28px] rounded-full transition-all duration-300 ease-out" />
      </button>

      {/* Animated close button via portal */}
      {mounted &&
        createPortal(
          <button
            onClick={toggleMenu}
            className={`fixed z-101 flex h-[40px] w-[40px] flex-col items-center justify-center gap-[6px] transition-all duration-300 ease-in-out lg:hidden ${
              isOpen
                ? "pointer-events-auto scale-100 opacity-100"
                : "pointer-events-none scale-90 opacity-0"
            }`}
            style={{ top: buttonPosition.top, right: buttonPosition.right }}
            aria-label="Fermer le menu"
            aria-expanded={isOpen}
            aria-hidden={!isOpen}
            tabIndex={isOpen ? 0 : -1}
          >
            <span
              className={`block h-[3px] w-[28px] origin-center rounded-full bg-[#2E2E2E] transition-all duration-300 ease-out ${
                isOpen ? "translate-y-[9px] rotate-45" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-[28px] rounded-full bg-[#2E2E2E] transition-all duration-300 ease-out ${
                isOpen ? "scale-0 opacity-0" : ""
              }`}
            />
            <span
              className={`block h-[3px] w-[28px] origin-center rounded-full bg-[#2E2E2E] transition-all duration-300 ease-out ${
                isOpen ? "-translate-y-[9px] -rotate-45" : ""
              }`}
            />
          </button>,
          document.body
        )}

      {/* Menu overlay */}
      {mounted &&
        isOpen &&
        createPortal(
          <div
            className={`fixed inset-0 z-100 flex h-screen w-screen flex-col bg-[#FBE9C6] lg:hidden ${isAnimating ? "animate-menu-out" : "animate-menu-in"}`}
            role="dialog"
            aria-modal="true"
          >
            <div className="flex flex-1 flex-col gap-[54px] overflow-y-auto px-[32px] pt-[120px] pb-[40px]">
              {/* Navigation */}
              <nav>
                <ul className="flex flex-col">
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
                        className="font-bricolage-grotesque block py-[10px] text-[2.5rem] font-medium text-[#2E2E2E] transition-opacity duration-200 hover:opacity-60 md:text-[3rem]"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Bottom section */}
              <div
                className={`flex flex-col gap-[20px] ${isAnimating ? "animate-fade-out" : "animate-fade-in"}`}
                style={{ animationDelay: isAnimating ? "0ms" : "500ms" }}
              >
                {/* Contact info */}
                <div className="flex flex-col gap-[12px]">
                  <p className="text-[1rem] font-bold text-[#2E2E2E]">
                    Contact
                  </p>
                  {contacts.map((c) => (
                    <div key={c.name}>
                      <p className="text-[0.9rem] font-medium text-[#2E2E2E]">
                        {c.name}
                      </p>
                      <a
                        href={`tel:${c.phone.replace(/\./g, "")}`}
                        className="text-[0.9rem] font-bold text-[#2E2E2E]"
                      >
                        {c.phone}
                      </a>
                    </div>
                  ))}
                  <div>
                    <p className="text-[0.9rem] font-medium text-[#2E2E2E]">
                      Email
                    </p>
                    <a
                      href="mailto:ubagnu.corsica@gmail.com"
                      className="text-[0.9rem] font-bold text-[#2E2E2E]"
                    >
                      ubagnu.corsica@gmail.com
                    </a>
                  </div>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-[16px]">
                  <Link
                    href="https://instagram.com/ubagnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#2954a4"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                        fill="#2954a4"
                      />
                    </svg>
                  </Link>
                  <Link
                    href="https://facebook.com/ubagnu"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#2954a4"
                      aria-hidden="true"
                    >
                      <path
                        d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078V12h3.047V9.356c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874V12h3.328l-.532 3.469h-2.796v8.385C19.612 22.954 24 17.99 24 12z"
                        fill="#2954a4"
                      />
                    </svg>
                  </Link>
                </div>

                {/* Buttons */}
                <div className="mt-10 flex flex-col gap-[12px]">
                  <Button
                    onClick={() => {
                      closeMenu()
                      setTimeout(() => {
                        window.dispatchEvent(new CustomEvent("open-contact"))
                      }, 450)
                    }}
                    className="w-full"
                  >
                    Contact
                  </Button>
                  <Button
                    variant="outline"
                    onClick={closeMenu}
                    className="w-full border-[#2E2E2E]/30 text-[#2E2E2E]"
                  >
                    Réserver votre séance
                  </Button>
                </div>
              </div>
            </div>

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
                  transform: translateX(-20px);
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
                  transform: translateX(-20px);
                }
              }
              @keyframes fadeIn {
                from {
                  opacity: 0;
                  transform: translateY(10px);
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
                  transform: translateY(10px);
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
