import { Button } from "@/components/ui/button"
import Image from "next/image"
import ServicesNeedsCarousel from "./services-needs-carousel"
import ServicesNeedsAnimation from "./services-needs-animation"

const services = [
  {
    id: "bains",
    label: "BAINS IMMERSIFS",
    price: "À partir de 15 €* / séance",
    description:
      "Favorise la récupération musculaire diminue les inflammations et prépare le corps à l'enchaînement des efforts.",
    buttonText: "Contact",
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

// Desktop uses JS-controlled active class instead of hover
const desktopVariantStyles = {
  beige: "bg-[#FFE8C2BF] [&.active]:bg-[#FFE8C2]",
  blue: "bg-[#2954A4BF] [&.active]:bg-[#2954A4]",
  white: "bg-[#D9D9D9BF] [&.active]:bg-[#D9D9D9]",
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
      className="relative flex items-center justify-center overflow-hidden px-0 pt-[120px] pb-[48px] md:pt-[160px] md:pb-[64px] xl:pt-[192px]"
    >
      {/* Background Image */}
      <Image
        src="/img/services/needs-background.jpg"
        alt=""
        width={1200}
        height={600}
        className="absolute h-full w-auto object-cover object-bottom lg:h-auto lg:w-full"
      />

      <ServicesNeedsAnimation />

      {/* Content */}
      <div className="relative z-10 container flex w-full max-w-[1200px] flex-col gap-[32px] md:gap-[48px] xl:gap-[60px]">
        {/* Title */}
        <h2 className="font-outfit px-[24px] text-[32px] leading-[110%] font-medium text-white md:px-[48px] md:text-[48px] xl:px-0 xl:text-[56px]">
          Selon vos besoins,
          <br />
          notre service s&apos;y adapte
        </h2>

        {/* Mobile/Tablet Cards - Embla carousel */}
        <div className="xl:hidden">
          <ServicesNeedsCarousel />
          <div
            id="services-needs-cards-container"
            className="flex items-center px-[24px] md:px-[48px]"
          >
            <div
              id="services-needs-cards"
              className="flex flex-row gap-[16px] md:gap-[20px]"
            >
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`relative h-[500px] w-[300px] shrink-0 overflow-hidden rounded-[8px] transition-colors duration-500 ease-out md:h-[450px] md:w-[calc(50vw-68px)] ${variantStyles[service.variant]}`}
                >
                  {/* Always visible content */}
                  <div className="flex h-full flex-col justify-between p-[24px] md:p-[32px]">
                    <div className="flex flex-col gap-[8px]">
                      {/* Label */}
                      <h3
                        className={`font-bricolage-grotesque text-[24px] font-bold md:text-[28px] ${textStyles[service.variant]}`}
                      >
                        {service.label}
                      </h3>
                      {/* Price */}
                      <span
                        className={`font-outfit text-[18px] md:text-[20px] ${textStyles[service.variant]}`}
                      >
                        {service.price}
                      </span>
                    </div>

                    <div className="flex flex-col gap-[24px]">
                      {/* Description */}
                      <p
                        className={`font-inter text-[14px] leading-[150%] md:text-[15px] ${textStyles[service.variant]}`}
                      >
                        {service.description}
                      </p>

                      {/* Button */}
                      <Button variant="secondary">{service.buttonText}</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop Cards - JS-controlled active state */}
        <div className="hidden flex-row gap-[20px] xl:flex">
          {services.map((service, index) => (
            <div
              key={service.id}
              data-services-needs-card={index}
              className={`relative h-[517px] flex-1 cursor-pointer overflow-hidden rounded-[8px] transition-colors duration-500 ease-out ${desktopVariantStyles[service.variant]} ${index === 0 ? "active" : ""}`}
            >
              {/* Content wrapper - label at bottom, moves up when active */}
              <div
                data-services-needs-content
                className={`absolute right-0 bottom-[80px] left-0 flex flex-col gap-[56px] px-[48px] transition-transform duration-500 ease-out ${index === 0 ? "translate-y-[30px]" : "translate-y-[250px]"}`}
              >
                <div>
                  {/* Label */}
                  <h3
                    className={`font-bricolage-grotesque text-[32px] font-bold ${textStyles[service.variant]}`}
                  >
                    {service.label}
                  </h3>
                  {/* Price */}
                  <span
                    data-services-needs-price
                    className={`font-outfit text-[24px] transition-opacity duration-500 ease-out ${textStyles[service.variant]} ${index === 0 ? "opacity-100" : "opacity-0"}`}
                  >
                    {service.price}
                  </span>
                </div>

                {/* Hidden content - revealed when active */}
                <div
                  data-services-needs-details
                  className={`flex flex-col gap-[32px] pt-[16px] transition-opacity duration-500 ease-out ${index === 0 ? "opacity-100" : "opacity-0"}`}
                >
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
