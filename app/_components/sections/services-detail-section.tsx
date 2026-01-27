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
      className="bg-background relative my-[160px] h-auto snap-normal px-[122px] xl:h-[300dvh]"
      data-hide-header
      data-numero="2"
    >
      <ServicesDetailAnimation />
      <div className="sticky top-0 flex h-auto w-full items-center justify-center py-[160px] xl:h-dvh">
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
            <div className="service-blocks-container relative overflow-hidden max-xl:flex max-xl:h-auto max-xl:flex-col max-xl:gap-[40px]">
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
