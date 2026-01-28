import Image from "next/image"
import ServicesDetailAnimation from "./services-detail-animation"

const services = [
  {
    image: "/img/services/image-1.png",
    category: "Performance et régénération",
    title: "Récupération sportive",
    description:
      "Des protocoles de récupération professionnels: Cryothérapie, bains contrastés. Tout pour optimiser votre récupération musculaire.",
  },
  {
    image: "/img/services/image-2.png",
    category: "Détente et bien-être",
    title: "Spa et relaxation",
    description:
      "Un espace dédié à votre détente: massages, sauna, hammam. Libérez les tensions et retrouvez votre sérénité intérieure.",
  },
  {
    image: "/img/services/image-3.png",
    category: "Santé et vitalité",
    title: "Soins thérapeutiques",
    description:
      "Des soins personnalisés pour votre bien-être global: ostéopathie, kinésithérapie, nutrition. Une approche holistique de votre santé.",
  },
]

const ServicesDetailSection = () => {
  return (
    <section
      id="services-detail"
      className="bg-background relative my-[48px] h-auto px-[24px] lg:my-[160px] lg:px-[122px] xl:h-[300dvh]"
    >
      <ServicesDetailAnimation />

      {/* Mobile Layout - Vertical cards with text overlay */}
      <div className="flex flex-col gap-[24px] xl:hidden">
        {/* Header */}
        <div className="flex flex-col gap-[12px]">
          <h2 className="font-outfit text-[32px] leading-[110%] font-medium md:text-[48px]">
            Des services
            <br />
            pensés pour vous
          </h2>
          <p className="font-inter text-[14px] md:text-[16px]">
            Chaque parcours mérite une attention unique et personnalisée.
          </p>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-[16px]">
          {services.map((service, i) => (
            <div
              key={i}
              className="relative h-[450px] w-full overflow-hidden rounded-[16px] md:h-[500px]"
            >
              <Image
                src={service.image}
                alt={service.title}
                fill
                className="object-cover"
              />
              {/* Gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-[24px] text-white">
                <span className="font-inter mb-[8px] text-[12px] opacity-80">
                  {service.category}
                </span>
                <h3 className="font-bricolage-grotesque mb-[12px] text-[28px] leading-[110%] font-medium md:text-[32px]">
                  {service.title}
                </h3>
                <p className="font-inter text-[14px] leading-[150%] opacity-90 md:text-[15px]">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Desktop Layout - Horizontal scroll animation */}
      <div className="sticky top-0 hidden h-dvh w-full items-center justify-center py-[160px] xl:flex">
        <div className="mx-auto flex w-fit flex-row items-start gap-[83px]">
          {/* Left - Image */}
          <div className="relative h-[600px] w-[468px] shrink-0 overflow-hidden rounded-[24px]">
            {services.map((service, i) => (
              <Image
                key={i}
                src={service.image}
                alt={service.title}
                fill
                className={`service-image-${i + 1} object-cover ${i === 0 ? "opacity-100" : "opacity-0"}`}
              />
            ))}
          </div>

          {/* Right - Content */}
          <div className="flex flex-col gap-[50px]">
            {/* Main heading */}
            <div className="flex flex-col gap-[20px]">
              <h2 className="font-outfit text-[72px] leading-[100%] font-medium">
                Des services
                <br />
                pensés pour vous
              </h2>
              <p className="font-inter text-[16px]">
                Chaque parcours mérite une attention unique et personnalisée.
              </p>
            </div>

            {/* Service detail blocks */}
            <div className="service-blocks-container relative overflow-hidden">
              {services.map((service, i) => (
                <div
                  key={i}
                  className={`service-block-${i + 1} flex flex-col gap-[24px] py-[27px] xl:absolute xl:inset-0 ${i === 0 ? "xl:opacity-100" : "xl:opacity-0"}`}
                >
                  <span className="font-inter text-[13px]">
                    {service.category}
                  </span>
                  <h3 className="font-bricolage-grotesque text-[35px] leading-[100%] font-medium">
                    {service.title}
                  </h3>
                  <p className="font-inter max-w-[500px] text-[17px] leading-[160%]">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ServicesDetailSection
