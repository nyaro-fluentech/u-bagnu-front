import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import Link from "next/link"
import { X } from "lucide-react"
import HeaderAnimation from "./header-animation"
import MobileMenu from "./mobile-menu"
import ContactForm from "./contact-form"

const Header = () => {
  return (
    <>
      <HeaderAnimation />

      <div
        id="header-wrapper"
        className="fixed top-0 z-99 flex w-full justify-center px-[16px] md:px-[31px]"
      >
        <header
          className="bg-secondary relative flex w-full max-w-[1001px] flex-col rounded-b-[24px] px-[28px] py-[24px] backdrop-blur-[15px] md:rounded-b-[40px]"
          id="header-container"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between">
            <div className="md:hidden">
              <Logo variant="col" />
            </div>
            <div className="hidden md:block">
              <Logo variant="row" />
            </div>

            {/* Right side */}
            <div className="flex items-center gap-[82px]">
              {/* Desktop nav links */}
              <nav id="header-nav-links" className="hidden lg:block">
                <ul className="font-bricolage-grotesque flex gap-[24px]">
                  <li>
                    <Link href="#services">Services</Link>
                  </li>
                  <li>
                    <Link href="#offers">Offres</Link>
                  </li>
                  <li>
                    <Link href="#about">À propos</Link>
                  </li>
                </ul>
              </nav>

              {/* Contact button — morphs into close on desktop */}
              <Button
                id="contact-btn"
                className="relative hidden overflow-hidden lg:inline-flex"
              >
                {/* Invisible spacer — holds the button's natural size */}
                <span
                  aria-hidden="true"
                  className="invisible whitespace-nowrap"
                >
                  Contact
                </span>
                {/* Text state */}
                <span
                  id="contact-btn-text"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
                >
                  Contact
                </span>
                {/* Icon state */}
                <span
                  id="contact-btn-icon"
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  style={{ opacity: 0 }}
                >
                  <X className="size-[18px]" />
                </span>
              </Button>

              {/* Mobile close contact button — same position as burger */}
              <button
                id="contact-close-mobile"
                className="hidden items-center justify-center lg:!hidden"
                aria-label="Fermer le formulaire de contact"
              >
                <X className="size-[24px] text-[#2E2E2E]" />
              </button>

              {/* Mobile menu */}
              <div id="mobile-menu-wrapper" className="lg:hidden">
                <MobileMenu />
              </div>
            </div>
          </div>

          {/* Contact overlay content */}
          <div
            id="contact-content"
            className="mt-6"
            style={{ display: "none" }}
          >
            <div className="border-primary/20 border-t" />

            <div className="mt-6 grid grid-cols-1 gap-8 pb-8 md:mt-10 md:gap-12 md:pb-12 md:pl-16 lg:grid-cols-2">
              {/* Left — intro */}
              <div className="flex flex-col justify-center gap-4 md:gap-6 lg:pr-8">
                <h2 className="font-bricolage-grotesque text-[1.5rem] leading-tight font-medium text-[#2E2E2E] md:text-[2rem]">
                  Parlons de votre besoin
                </h2>
                <p className="text-base leading-relaxed text-[#2E2E2E]/80 md:w-3/4 md:text-[1.25rem]">
                  Parce que chaque pratique sportive a ses contraintes, U Bagnu
                  ajuste ses interventions aux besoins du terrain. La mobilité
                  des soins permet une récupération continue, en phase avec
                  l&apos;intensité et la fréquence des efforts.
                </p>
                <p className="text-base leading-relaxed text-[#2E2E2E]/80 md:text-[1.25rem]">
                  Chaque demande est traitée personnellement. Nous vous
                  recontacterons rapidement pour vous proposer la solution la
                  plus adaptée à votre besoin.
                </p>
              </div>

              {/* Right — form */}
              <div className="flex flex-col gap-5 md:pr-16">
                <div>
                  <h3 className="font-bricolage-grotesque text-[1.5rem] font-medium text-[#2E2E2E] md:text-[2rem]">
                    Envoyez-nous un message
                  </h3>
                  <p className="mt-1 text-base leading-relaxed text-[#2E2E2E]/60 md:text-[1.25rem]">
                    Nous vous recontacterons rapidement pour vous proposer la
                    solution la plus adaptée à votre besoin.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export default Header
