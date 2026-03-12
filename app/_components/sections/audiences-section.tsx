import Image from "next/image"
import { Button } from "@/components/ui/button"
import AudiencesAnimation from "./audiences-animation"

const audiences = [
  {
    title: "ATHLÈTES",
    subtitle: "Performance individuelle ou collective",
    description:
      "Optimisez votre récupération après l'effort et restez performant plus longtemps.",
    image: "/img/audiences/athletes.jpg",
  },
  {
    title: "ÉVÉNEMENTS & CLUBS",
    title2: "Dans nos locaux\nou sur notre site",
    subtitle: "La performance collective",
    description:
      "Offrez à vos athlètes une solution de récupération professionnelle",
    image: "/img/audiences/events.jpg",
    gradient:
      "linear-gradient(180deg, rgba(41, 84, 164, 0.75) 0%, rgba(41, 84, 164, 0) 100%)",
  },
  {
    title: "BIEN-ÊTRE ET MENTAL",
    subtitle: "Retrouvez l'équilibre",
    description:
      "Réduisez le stress, améliorez la récupération globale et le bien-être corporel.",
    image: "/img/audiences/wellbeing.jpg",
  },
]

const AudiencesSection = () => {
  return (
    <section
      id="audiences"
      className="bg-[#E8E8E8] px-[24px] py-[48px] md:px-[48px] md:py-[64px] lg:px-[122px]"
    >
      <AudiencesAnimation />
      <div className="mx-auto flex w-full flex-col items-center gap-[32px] md:gap-[45px] lg:w-fit">
        <div className="split-container w-full">
          <h2 className="split w-full text-[32px] leading-[110%] font-medium text-[#2E2E2E] md:text-[56px] lg:text-[72px] lg:leading-[100%]">
            Une récupération adaptée
            <br />à chaque pratique
          </h2>
        </div>
        <div className="relative flex w-full flex-col items-start justify-center md:gap-[20px] lg:grid lg:w-fit lg:grid-cols-2 lg:flex-row xl:flex">
          {audiences.map((audience, index) => (
            <div
              key={audience.title}
              data-audience-card={index}
              className={`group relative h-[400px] w-full cursor-pointer overflow-hidden rounded-[8px] md:h-[450px] lg:h-[517px] lg:min-w-[387px] lg:flex-1 ${index > 0 ? "-mt-[16px] md:mt-0" : ""} ${index === 2 ? "lg:col-span-2 lg:mx-auto xl:max-w-none" : ""}`}
            >
              {/* Image with mobile grayscale effect (controlled by JS) and tablet/desktop scale (controlled by JS) */}
              <Image
                src={audience.image}
                alt={audience.title}
                fill
                data-audience-image
                className="object-cover brightness-75 grayscale transition-all duration-300 md:brightness-100 md:grayscale-0"
              />

              {/* Dark overlay for mobile default state (controlled by JS) */}
              <div
                data-audience-overlay
                className="absolute inset-0 bg-black/30 opacity-100 transition-opacity duration-300 md:hidden"
              />

              {/* Blue overlay for mobile active state (controlled by JS) */}
              <div
                data-audience-blue-overlay
                className="absolute inset-0 bg-[#2954A4A6] opacity-0 transition-opacity duration-300 md:hidden"
              />

              {/* Background gradient mask (tablet/desktop only) */}
              {audience.gradient && (
                <div
                  className="absolute inset-0 hidden md:block"
                  style={{ background: audience.gradient }}
                />
              )}

              {/* Blue overlay (tablet/desktop only) - controlled by JS */}
              <div
                data-audience-desktop-overlay
                className={`absolute inset-0 hidden bg-[#2954A4A6] transition-opacity duration-300 md:block ${index === 0 ? "opacity-100" : "opacity-0"}`}
              />

              {/* Mobile default content - title only (controlled by JS) */}
              <div
                data-audience-content-default
                className="absolute inset-0 flex flex-col p-[32px] opacity-100 transition-opacity duration-300 md:hidden"
              >
                <div className="flex flex-col gap-0 text-white">
                  <h3 className="font-bricolage-grotesque text-[24px] uppercase">
                    {audience.title}
                  </h3>
                  <p className="font-bricolage-grotesque mt-0 pt-0 text-[18px] whitespace-break-spaces">
                    {audience.title2}
                  </p>
                </div>
              </div>

              {/* Mobile active content - with description (controlled by JS) */}
              <div
                data-audience-content-active
                className="absolute inset-0 flex flex-col justify-between p-[32px] opacity-0 transition-opacity duration-300 md:hidden"
              >
                <div className="flex flex-col gap-0 text-white">
                  <h3 className="font-bricolage-grotesque text-[24px] uppercase">
                    {audience.title}
                  </h3>
                  <p className="font-bricolage-grotesque mt-0 pt-0 text-[18px] whitespace-break-spaces">
                    {audience.title2}
                  </p>
                </div>
                <div className="flex flex-col gap-[12px]">
                  <p className="text-[14px] text-white/80">
                    {audience.subtitle}
                  </p>
                  <p className="font-inter text-[15px] font-bold text-white">
                    {audience.description}
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-[8px] w-fit rounded-full bg-white px-[20px] py-[10px] text-[14px] text-[#3B5998] hover:bg-white/90"
                  >
                    Contact
                  </Button>
                </div>
              </div>

              {/* Tablet/Desktop default state content - controlled by JS */}
              <div
                data-audience-desktop-default
                className={`absolute inset-0 hidden flex-col p-[32px] transition-opacity duration-300 md:flex lg:p-[56px] lg:px-[32px] ${index === 0 ? "opacity-0" : "opacity-100"}`}
              >
                <div className="flex flex-col gap-0 text-white">
                  <h3 className="font-bricolage-grotesque text-[24px] uppercase lg:text-[32px]">
                    {audience.title}
                  </h3>
                  <p className="font-bricolage-grotesque mt-0 pt-0 text-[18px] whitespace-break-spaces lg:text-[24px]">
                    {audience.title2}
                  </p>
                </div>
              </div>

              {/* Tablet/Desktop active state content - controlled by JS */}
              <div
                data-audience-desktop-active
                className={`absolute inset-0 hidden flex-col justify-between p-[32px] transition-opacity duration-300 md:flex lg:p-[56px] lg:px-[32px] ${index === 0 ? "opacity-100" : "opacity-0"}`}
              >
                <div className="flex flex-col gap-0 text-white">
                  <h3 className="font-bricolage-grotesque text-[24px] uppercase lg:text-[32px]">
                    {audience.title}
                  </h3>
                  <p className="font-bricolage-grotesque mt-0 pt-0 text-[18px] whitespace-break-spaces lg:text-[24px]">
                    {audience.title2}
                  </p>
                </div>
                <div className="flex flex-col gap-[12px] lg:gap-[16px]">
                  <p className="text-[14px] text-white/80 lg:text-[16px]">
                    {audience.subtitle}
                  </p>
                  <p className="font-inter text-[15px] font-bold text-white lg:text-[17.8px]">
                    {audience.description}
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-[8px] w-fit rounded-full bg-white px-[20px] py-[10px] text-[14px] text-[#3B5998] hover:bg-white/90 lg:px-[24px] lg:py-[12px]"
                  >
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AudiencesSection
