import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import Link from "next/link"
import HeaderAnimation from "./header-animation"
import MobileMenu from "./mobile-menu"

const Header = () => {
  return (
    <>
      {/* Client-side animation handler */}
      <HeaderAnimation />

      <div
        id="header-wrapper"
        className="fixed top-0 z-99 flex w-full justify-center px-[16px] md:px-[31px]"
      >
        <header
          className="bg-secondary relative flex w-full max-w-[1001px] items-center justify-between rounded-b-[24px] px-[28px] py-[24px] backdrop-blur-[15px] md:rounded-b-[40px]"
          id="header-container"
        >
          <div className="md:hidden">
            <Logo variant="col" />
          </div>
          <div className="hidden md:block">
            <Logo variant="row" />
          </div>

          {/* Desktop nav - hidden on mobile */}
          <div className="hidden items-center gap-[82px] lg:flex">
            <nav>
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
            <Button>Contact</Button>
          </div>

          {/* Mobile menu - visible only on mobile */}
          <MobileMenu />
        </header>
      </div>
    </>
  )
}

export default Header
