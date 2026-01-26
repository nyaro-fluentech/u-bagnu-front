import ServicesScrollAnimation from "./services-scroll-animation"

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
      className="flex h-[665px] w-[500px] shrink-0 flex-col justify-between rounded-[9px] p-[40px]"
      style={{ backgroundColor: service.bgColor, color: service.textColor }}
    >
      {/* Tag */}
      <div className="flex items-center gap-[8px] text-[16px]">
        {service.tagIcon}
        <span>{service.tag}</span>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col justify-center">
        {service.bigNumber ? (
          <div className="flex items-end gap-[16px]">
            <span
              className="text-[180px] leading-[0.8] font-medium"
              style={{ color: "#2E2E2E" }}
            >
              {service.bigNumber}
            </span>
            <span className="pb-[20px] text-[24px] leading-[1.2] font-medium">
              {service.bigNumberLabel}
            </span>
          </div>
        ) : (
          <div className="flex flex-col gap-[16px]">
            <h3 className="text-[56px] leading-none font-bold">
              {service.title}
            </h3>
            <p className="text-[20px] font-semibold">{service.subtitle}</p>
          </div>
        )}

        {/* Services list */}
        {service.services && (
          <div className="mt-[40px] flex flex-col gap-[8px]">
            {service.services.map((s) => (
              <span key={s} className="text-[24px] font-bold">
                {s}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-[14px]">{service.footer}</div>
    </div>
  )
}

const ServicesSection = () => {
  return (
    <section
      id="services"
      className="flex flex-col gap-[64px] overflow-x-clip bg-[#2954A4] pt-[64px]"
    >
      {/* Client-side animation handler */}
      <ServicesScrollAnimation cardCount={services.length} />

      {/* Header */}
      <div className="px-[122px] pt-[80px]">
        <h2 className="text-[72px] leading-[100%] font-medium text-white">
          Nos prestations
          <br />
          sont UNIQUES
        </h2>
      </div>

      {/* Cards container */}
      <div id="services-cards-container" className="flex items-center">
        <div id="services-cards" className="flex gap-[24px] px-[122px]">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
