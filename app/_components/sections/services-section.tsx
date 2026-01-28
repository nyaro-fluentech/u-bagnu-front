import ServicesScrollAnimation from "./services-scroll-animation"
import ServicesCarousel from "./services-carousel"

const services = [
  {
    id: 1,
    tag: "Avantage",
    tagIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M13 3L4 14H12L11 21L20 10H12L13 3Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    bigNumber: "3",
    bigNumberLabel: (
      <>
        STRATÉGIES DE
        <br />
        RÉCUPÉRATION
      </>
    ),
    services: ["BAIN FROID", "SAUNA", "PRESSOTHÉRAPIE"],
    footer: "Z.I Erbajolo - Furiani 20600",
    bgColor: "#A3BEF2",
    textColor: "#2E2E2E",
  },
  {
    id: 2,
    tag: "Dans nos locaux ou sur votre site",
    tagIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z"
          fill="currentColor"
        />
      </svg>
    ),
    title: "MOBILITÉ POSSIBLE",
    subtitle: "Pour votre Bain et/ou pressothérapie",
    footer: "Installation rapide sur site - Service mobile",
    bgColor: "#FFE8C2",
    textColor: "#2E2E2E",
  },
  {
    id: 3,
    tag: "Objectif",
    tagIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2" />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
    ),
    title: "PERFORMEZ",
    subtitle:
      "Avant votre compétition pour être à 100% de vos capacités ou après pour récupérez plus vite",
    footer: "Récupération musculaire accélérée",
    bgColor: "#E7E7E7",
    textColor: "#2E2E2E",
  },
  {
    id: 4,
    tag: "Quand?",
    tagIcon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="3"
          y="4"
          width="18"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="2"
        />
        <path d="M3 10H21" stroke="currentColor" strokeWidth="2" />
        <path
          d="M8 2V6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 2V6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    ),
    title: "OUVERT 7/7",
    subtitle: "Jour de semaine 10h-19h30 non-stop et week-end libre services",
    footer: "Planification optimisée",
    bgColor: "#FFFFFF",
    textColor: "#2E2E2E",
  },
]

const ServiceCard = ({ service }: { service: (typeof services)[0] }) => {
  return (
    <div
      className="flex h-[500px] w-[300px] shrink-0 flex-col justify-between rounded-[9px] p-[24px] md:h-[550px] md:w-[calc(50vw-60px)] md:p-[32px] xl:h-[665px] xl:w-[500px] xl:p-[40px]"
      style={{ backgroundColor: service.bgColor, color: service.textColor }}
    >
      {/* Tag */}
      <div className="flex items-center gap-[8px] text-[14px] md:text-[15px] xl:text-[16px]">
        {service.tagIcon}
        <span>{service.tag}</span>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center">
        {service.bigNumber ? (
          <div className="flex items-end gap-[12px] md:gap-[14px] xl:gap-[16px]">
            <span
              className="text-[120px] leading-[0.8] font-medium md:text-[140px] xl:text-[180px]"
              style={{ color: "#2E2E2E" }}
            >
              {service.bigNumber}
            </span>
            <span className="pb-[12px] text-[16px] leading-[1.2] font-medium md:pb-[16px] md:text-[20px] xl:pb-[20px] xl:text-[24px]">
              {service.bigNumberLabel}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-[12px] md:gap-[14px] xl:gap-[16px]">
            <h3 className="text-[36px] leading-none font-bold md:text-[44px] xl:text-[56px]">
              {service.title}
            </h3>
            <p className="text-[16px] font-semibold md:text-[18px] xl:text-[20px]">
              {service.subtitle}
            </p>
          </div>
        )}

        {/* Services list */}
        {service.services && (
          <div className="mt-[24px] flex flex-col gap-[6px] md:mt-[32px] md:gap-[6px] xl:mt-[40px] xl:gap-[8px]">
            {service.services.map((s) => (
              <span
                key={s}
                className="text-[18px] font-bold md:text-[20px] xl:text-[24px]"
              >
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-[12px] md:text-[13px] xl:text-[14px]">
        {service.footer}
      </div>
    </div>
  )
}

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="flex flex-col gap-[32px] overflow-x-clip bg-[#2954A4] pt-[48px] pb-[48px] md:gap-[48px] xl:gap-[64px] xl:pt-[64px] xl:pb-0"
    >
      {/* Client-side animation handler */}
      <ServicesScrollAnimation cardCount={services.length} />

      {/* Header */}
      <div className="px-[24px] pt-[40px] md:px-[48px] md:pt-[60px] xl:px-[122px] xl:pt-[80px]">
        <div className="split-container">
          <h2 className="split text-[32px] leading-[110%] font-medium text-white md:text-[56px] xl:text-[72px] xl:leading-[100%]">
            Nos prestations
            <br />
            sont UNIQUES
          </h2>
        </div>
      </div>

      {/* Cards container - Embla on mobile/tablet, GSAP on desktop */}
      <ServicesCarousel />
      <div
        id="services-cards-container"
        className="flex items-center px-[24px] md:px-[48px] xl:px-0"
      >
        <div
          id="services-cards"
          className="flex gap-[16px] md:gap-[20px] xl:gap-[24px] xl:px-[122px]"
        >
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
