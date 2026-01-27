import { Button } from "@/components/ui/button"

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="hero-section relative min-h-screen px-[122px] py-[64px]"
    >
      <div className="hero-mask" />
      <div className="relative z-2 flex flex-col gap-[45px] pt-[160px]">
        <div className="flex flex-col gap-[45px] text-white">
          <h1 className="text-[96px] leading-[99px] font-medium">
            Bains immersifs,
            <br /> Pressothérapie
            <br /> & Sauna
          </h1>
          <div className="font-bricolage-grotesque flex flex-col gap-[16px]">
            <h2 className="text-[32px] leading-[100%] uppercase">
              La récupération sportive,
              <br /> là où vos performances l&apos;exigent
            </h2>
            <ul className="list-inside list-disc px-2">
              <li>Récupération musculaire accélérée</li>
              <li>Prévention des blessures</li>
              <li>Amélioration de la performance</li>
              <li>Bien-être global et relaxation</li>
            </ul>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-row gap-[16px]">
            <Button variant="secondary">Contact</Button>
            <Button variant="outline">Réserver votre séance</Button>
          </div>
          <Button variant="ghost">
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
      </div>
    </section>
  )
}

export default HeroSection
