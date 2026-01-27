import TestimonialsCarousel from "./testimonials-carousel"

const testimonials = [
  {
    id: 1,
    name: "Théo Caron",
    title: "Ailier Droite – Club de Bastia",
    quote:
      "U Bagnu m'aide à rester constant dans ma performance. Après chaque match, leurs soins ciblés soulagent mes tensions et accélèrent ma récupération. Leur approche mobile et méthodique me permet de m'entraîner sereinement, de prévenir les blessures et d'aborder chaque tournoi avec confiance et énergie.",
    image: "/img/testimonials/theo.png",
  },
  {
    id: 2,
    name: "Leo Caron",
    title: "Ailier Droite – Club de Bastia",
    quote:
      "U Bagnu m'aide à rester constant dans ma performance. Après chaque match, leurs soins ciblés soulagent mes tensions et accélèrent ma récupération. Leur approche mobile et méthodique me permet de m'entraîner sereinement, de prévenir les blessures et d'aborder chaque tournoi avec confiance et énergie.",
    image: "/img/testimonials/leo.png",
  },
  {
    id: 3,
    name: "Thomas Ferracci",
    title: "Croff fit Coach – Région bastiaise",
    quote:
      "U Bagnu m'aide à rester constant dans ma performance. Après chaque match, leurs soins ciblés soulagent mes tensions et accélèrent ma récupération. Leur approche mobile et méthodique me permet de m'entraîner sereinement, de prévenir les blessures et d'aborder chaque tournoi avec confiance et énergie.",
    image: "/img/testimonials/thomas.png",
  },
]

const TestimonialsSection = () => {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="bg-background relative overflow-hidden pt-[32px] md:pt-[48px] lg:pt-[64px]"
    >
      <h2 id="testimonials-heading" className="sr-only">
        Témoignages clients
      </h2>

      {/* Mobile/Tablet Background Text - ILS EN PARLENT (relative) */}
      <div className="pointer-events-none px-[24px] select-none md:px-[48px] lg:hidden">
        <span className="font-outfit text-primary text-[64px] leading-[0.95] font-medium md:text-[96px]">
          ILS EN
          <br />
          PARLENT
        </span>
      </div>

      {/* Desktop Background Text - ILS EN PARLENT (absolute) */}
      <div className="pointer-events-none absolute inset-0 bottom-0 hidden -translate-x-[30px] translate-y-[10px] items-center justify-start select-none lg:flex">
        <span className="font-outfit text-primary text-[295px] leading-[269px] font-medium">
          ILS
          <br />
          <span className="ml-[30%]">EN</span>
          <br />
          <span className="ml-[10%]">PARLENT</span>
        </span>
      </div>

      {/* Carousel - Client Component */}
      <TestimonialsCarousel testimonials={testimonials} />
    </section>
  )
}

export default TestimonialsSection
