import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import Link from "next/link"
import { X } from "lucide-react"
import HeaderAnimation from "./header-animation"
import MobileMenu from "./mobile-menu"

const demandes = [
  { label: "Réservation", value: "reservation", defaultChecked: true },
  { label: "Devis", value: "devis" },
  { label: "Demande d'informations", value: "infos" },
  { label: "Autre", value: "autre" },
]

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

            <div className="mt-10 grid grid-cols-1 gap-12 pb-12 pl-16 lg:grid-cols-2">
              {/* Left — intro */}
              <div className="flex flex-col justify-center gap-6 lg:pr-8">
                <h2 className="font-bricolage-grotesque text-[2rem] leading-tight font-medium text-[#2E2E2E]">
                  Parlons de votre besoin
                </h2>
                <p className="w-3/4 text-[1.25rem] leading-relaxed text-[#2E2E2E]/80">
                  Parce que chaque pratique sportive a ses contraintes, U Bagnu
                  ajuste ses interventions aux besoins du terrain. La mobilité
                  des soins permet une récupération continue, en phase avec
                  l&apos;intensité et la fréquence des efforts.
                </p>
                <p className="text-[1.25rem] leading-relaxed text-[#2E2E2E]/80">
                  Chaque demande est traitée personnellement. Nous vous
                  recontacterons rapidement pour vous proposer la solution la
                  plus adaptée à votre besoin.
                </p>
              </div>

              {/* Right — form */}
              <div className="flex flex-col gap-5 pr-16">
                <div>
                  <h3 className="font-bricolage-grotesque text-[2rem] font-medium text-[#2E2E2E]">
                    Envoyez-nous un message
                  </h3>
                  <p className="mt-1 text-[1.25rem] leading-relaxed text-[#2E2E2E]/60">
                    Nous vous recontacterons rapidement pour vous proposer la
                    solution la plus adaptée à votre besoin.
                  </p>
                </div>

                <form className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
                      Nom et prénom
                    </label>
                    <input
                      type="text"
                      placeholder="Jean Doe"
                      className="border-primary/10 focus:border-primary/40 rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
                        Votre email
                      </label>
                      <input
                        type="email"
                        placeholder="jean@exemple.fr"
                        className="border-primary/10 focus:border-primary/40 rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
                        Numéro de téléphone
                      </label>
                      <input
                        type="tel"
                        placeholder="+33 06 xxx xx xxx"
                        className="border-primary/10 focus:border-primary/40 rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="ml-1 text-sm font-medium text-[#2E2E2E]">
                      Type de demande
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {demandes.map(({ label, value, defaultChecked }) => (
                        <label key={value} className="cursor-pointer">
                          <input
                            type="radio"
                            name="type-demande"
                            value={value}
                            defaultChecked={defaultChecked}
                            className="peer sr-only"
                          />
                          <span className="border-primary/30 text-primary peer-checked:border-primary peer-checked:bg-primary/10 inline-block rounded-full border px-4 py-2 text-sm transition-colors">
                            {label}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="ml-1 text-sm font-medium text-[#2E2E2E]">
                      Votre message
                    </label>
                    <textarea
                      placeholder="Décrivez votre besoin, nous vous contacterons avec la solution la plus adaptée"
                      rows={5}
                      className="border-primary/10 focus:border-primary/40 resize-none rounded-md border bg-white/80 px-4 py-3 text-sm transition-colors outline-none placeholder:text-gray-400"
                    />
                  </div>

                  <Button type="submit" className="mt-2 w-fit">
                    Envoyez mon message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </header>
      </div>
    </>
  )
}

export default Header
