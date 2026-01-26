import Image from "next/image"
import { Button } from "@/components/ui/button"

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
    subtitle: "Retrouvez l’équilibre",
    description:
      "Réduisez le stress, améliorez la récupération globale et le bien-être corporel.",
    image: "/img/audiences/wellbeing.jpg",
  },
]

const AudiencesSection = () => {
  return (
    <section id="audiences" className="bg-[#E8E8E8] px-[122px] py-[64px]">
      <div className="mx-auto flex w-fit flex-col items-center gap-[45px]">
        <h2 className="w-full text-[72px] leading-[100%] font-medium text-[#2E2E2E]">
          Une récupération adaptée
          <br />à chaque pratique
        </h2>
        <div className="relative flex w-fit flex-col items-start justify-center gap-[20px] md:flex-row">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="group relative h-[517px] min-w-[387px] flex-1 cursor-pointer overflow-hidden rounded-[8px]"
            >
              <Image
                src={audience.image}
                alt={audience.title}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Background gradient mask */}
              {audience.gradient && (
                <div
                  className="absolute inset-0"
                  style={{ background: audience.gradient }}
                />
              )}
              {/* Blue overlay on hover */}
              <div className="absolute inset-0 bg-[#2954A4A6] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Default state content */}
              <div className="absolute inset-0 flex flex-col p-[56px] px-[32px] transition-opacity duration-300 group-hover:opacity-0">
                <div className="flex flex-col gap-0 text-white">
                  <h3 className="font-bricolage-grotesque text-[32px] uppercase">
                    {audience.title}
                  </h3>
                  <p className="font-bricolage-grotesque mt-0 pt-0 text-[24px] whitespace-break-spaces">
                    {audience.title2}
                  </p>
                </div>
              </div>

              {/* Hover state content */}
              <div className="absolute inset-0 flex flex-col justify-between p-[56px] px-[32px] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex flex-col gap-0 text-white">
                  <h3 className="font-bricolage-grotesque text-[32px] uppercase">
                    {audience.title}
                  </h3>
                  <p className="font-bricolage-grotesque mt-0 pt-0 text-[24px] whitespace-break-spaces">
                    {audience.title2}
                  </p>
                </div>
                <div className="flex flex-col gap-[16px]">
                  <p className="text-[16px] text-white/80">
                    {audience.subtitle}
                  </p>
                  <p className="font-inter text-[17.8px] font-bold text-white">
                    {audience.description}
                  </p>
                  <Button
                    variant="secondary"
                    className="mt-[8px] w-fit rounded-full bg-white px-[24px] py-[12px] text-[#3B5998] hover:bg-white/90"
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
