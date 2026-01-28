import { Button } from "@/components/ui/button"
import Image from "next/image"
import HeroAnimation from "./hero-animation"

const backgrounds = [
  "/img/background/background-1.png",
  "/img/background/background-2.png",
  "/img/background/background-3.png",
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
            Bains froids,
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
          <Button variant="secondary" className="w-full lg:w-auto">
            Contact
          </Button>
          <Button
            variant="outline"
            className="w-full max-sm:backdrop-blur-lg lg:w-auto"
          >
            Réserver votre séance
          </Button>
        </div>
        {/* Découvrir button - hidden on mobile/tablet */}
        <Button variant="ghost" className="hidden lg:flex">
          Découvrir
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M9.17116 12.052L7.75716 13.466L12.0002 17.71L16.2432 13.467L14.8282 12.053L13.0002 13.88V6.34302H11.0002V13.88L9.17116 12.052Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.222 19.778C8.518 24.074 15.482 24.074 19.778 19.778C24.074 15.482 24.074 8.518 19.778 4.222C15.482 -0.0739994 8.518 -0.0739994 4.222 4.222C-0.0739994 8.518 -0.0739994 15.482 4.222 19.778ZM5.636 18.364C7.32384 20.0518 9.61304 21.0001 12 21.0001C14.387 21.0001 16.6762 20.0518 18.364 18.364C20.0518 16.6762 21.0001 14.387 21.0001 12C21.0001 9.61304 20.0518 7.32384 18.364 5.636C16.6762 3.94816 14.387 2.99994 12 2.99994C9.61304 2.99994 7.32384 3.94816 5.636 5.636C3.94816 7.32384 2.99994 9.61304 2.99994 12C2.99994 14.387 3.94816 16.6762 5.636 18.364Z"
              fill="white"
            />
          </svg>
        </Button>
      </div>
    </section>
  )
}

export default HeroSection
