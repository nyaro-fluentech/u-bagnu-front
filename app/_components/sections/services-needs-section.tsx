import { Button } from "@/components/ui/button"
import Image from "next/image"

const services = [
  {
    id: "bains",
    label: "BAINS IMMERSIFS",
    price: "À partir de 15 €* / séance",
    description:
      "Favorise la récupération musculaire diminue les inflammations et prépare le corps à l'enchaînement des efforts.",
    buttonText: "Réserver une séance",
    variant: "beige" as const,
  },
  {
    id: "sauna",
    label: "SAUNA INFRAROUGE",
    price: "À partir de 15 €* / séance",
    description:
      "Relaxation profonde, récupération nerveuse et musculaire, idéal en complément des soins sportifs.",
    buttonText: "Réserver une séance",
    variant: "blue" as const,
  },
  {
    id: "pressotherapie",
    label: "PRESSOTHÉRAPIE",
    price: "À partir de 20 €* / séance",
    description:
      "Améliore la circulation sanguine, réduit les courbatures et accélère la récupération musculaire après l'effort.",
    buttonText: "Réserver une séance",
    variant: "white" as const,
  },
]

const variantStyles = {
  beige: "bg-[#FFE8C2BF] hover:bg-[#FFE8C2]",
  blue: "bg-[#2954A4BF] hover:bg-[#2954A4]",
  white: "bg-[#D9D9D9BF] hover:bg-[#D9D9D9]",
}

const textStyles = {
  beige: "text-[#3D3D3D]",
  blue: "text-white",
  white: "text-[#3D3D3D]",
}

const ServicesNeedsSection = () => {
  return (
    <section
      id="services-needs"
      className="relative flex items-center justify-center overflow-hidden px-[80px] pt-[192px] pb-[64px]"
    >
      {/* Background Image */}
      <Image
        src="/img/services/needs-background.jpg"
        alt=""
        width={1200}
        height={600}
        className="absolute object-contain object-bottom"
        style={{ width: "100%", height: "auto" }}
      />

      {/* Content */}
      <div className="relative z-10 container flex w-full max-w-[1200px] flex-col gap-[60px]">
        {/* Title */}
        <h2 className="font-outfit text-[56px] leading-[110%] font-medium text-white">
          Selon vos besoins,
          <br />
          notre service s&apos;y adapte
        </h2>

        {/* Cards */}
        <div className="flex flex-row gap-[20px]">
          {services.map((service) => (
            <div
              key={service.id}
              className={`group relative h-[517px] flex-1 cursor-pointer overflow-hidden rounded-[8px] transition-colors duration-500 ease-out ${variantStyles[service.variant]}`}
            >
              {/* Content wrapper - label at bottom, moves up on hover to reveal content */}
              <div className="absolute right-0 bottom-[80px] left-0 flex translate-y-[250px] flex-col gap-[56px] px-[48px] transition-transform duration-500 ease-out group-hover:translate-y-[30px]">
                <div>
                  {/* Label */}
                  <h3
                    className={`font-bricolage-grotesque text-[32px] font-bold ${textStyles[service.variant]}`}
                  >
                    {service.label}
                  </h3>
                  {/* Price */}
                  <span
                    className={`font-outfit text-[24px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100 ${textStyles[service.variant]}`}
                  >
                    {service.price}
                  </span>
                </div>

                {/* Hidden content - revealed on hover */}
                <div className="flex flex-col gap-[32px] pt-[16px] opacity-0 transition-opacity duration-500 ease-out group-hover:opacity-100">
                  {/* Description */}
                  <p
                    className={`font-inter text-[15px] leading-[150%] ${textStyles[service.variant]}`}
                  >
                    {service.description}
                  </p>

                  {/* Button */}
                  <Button variant="secondary" className="w-fit">
                    {service.buttonText}
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

export default ServicesNeedsSection
