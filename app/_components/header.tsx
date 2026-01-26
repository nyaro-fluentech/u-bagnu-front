import { Button } from "@/components/ui/button"
import Logo from "@/components/ui/logo"
import Link from "next/link"
import HeaderAnimation from "./header-animation"

const Header = () => {
  return (
    <>
      {/* Client-side animation handler */}
      <HeaderAnimation />

      <div className="fixed top-0 z-99 flex w-full justify-center px-[31px]">
        <header
          className="bg-secondary flex w-full max-w-[1001px] justify-between rounded-b-[40px] px-[28px] py-[24px] backdrop-blur-[15px]"
          id="header-container"
        >
          <Logo />
          <div className="flex items-center gap-[82px]">
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
        </header>
      </div>
    </>
  )
}

export default Header
