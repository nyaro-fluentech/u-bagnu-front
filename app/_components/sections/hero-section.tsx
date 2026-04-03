import { Button } from "@/components/ui/button"
import Image from "next/image"
import HeroAnimation from "./hero-animation"

const backgrounds = [
  "/img/background/background-1.webp",
  "/img/background/background-2.webp",
  "/img/background/background-3.webp",
]

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col justify-between gap-[45px] px-[24px] py-[64px] md:px-[48px] lg:px-[122px]"
    >
      <HeroAnimation />
      {/* Background Images with Fade Effect */}
      {backgrounds.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          role="presentation"
          fill
          className={`hero-bg-${index} object-cover object-[75%_50%] lg:object-bottom-right ${
            index === 0 ? "opacity-100" : "opacity-0"
          }`}
          sizes="100vw"
          priority={index === 0}
        />
      ))}

      <div className="hero-mask" />
      <div className="relative z-2 flex flex-col gap-[32px] pt-[80px] md:gap-[40px] md:pt-[120px] lg:gap-[45px] lg:pt-[160px]">
        <div className="flex h-[526px] flex-col justify-between gap-[42px] text-white md:h-auto md:gap-[45px]">
          <h1 className="text-[48px] leading-[110%] font-medium md:text-[72px] lg:text-[96px] lg:leading-[99px]">
            Bains immersifs,
            <br /> Pressothérapie
            <br /> & Sauna
          </h1>
          <div className="font-bricolage-grotesque flex flex-col gap-[12px] md:gap-[14px] lg:gap-[16px]">
            <h2 className="text-[20px] leading-[120%] uppercase md:text-[26px] lg:text-[32px] lg:leading-[100%]">
              La récupération sportive,
              <br /> là où vos performances l&apos;exigent
            </h2>
            <ul className="list-inside list-disc px-2 text-[14px] md:text-[15px] lg:text-base">
              <li>Récupération musculaire accélérée</li>
              <li>Prévention des blessures</li>
              <li>Amélioration de la performance</li>
              <li>Bien-être global et relaxation</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Buttons section */}
      <div className="relative z-2 flex flex-col gap-[16px] lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-[16px] lg:flex-row">
          <Button
            variant="secondary"
            className="w-full lg:w-auto"
            data-open-contact
          >
            Contact
          </Button>
          <Button
            variant="outline"
            className="w-full max-sm:backdrop-blur-lg lg:w-auto"
            asChild
          >
            <a href="https://member-app.deciplus.pro/ubagnu" target="_blank" rel="noopener noreferrer">
              Réserver votre séance
            </a>
          </Button>
        </div>
        {/* Scroll hint - hidden on mobile/tablet */}
        <span className="font-outfit hidden items-center gap-2 text-[14px] text-white/70 lg:flex">
          Scrollez pour découvrir
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M12 5V19M12 19L5 12M12 19L19 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </section>
  )
}

export default HeroSection
