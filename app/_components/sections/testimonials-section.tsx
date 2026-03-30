import TestimonialsCarousel from "./testimonials-carousel"

const testimonials = [
  {
    id: 1,
    name: "Sébastien Giambernardi",
    title: "Traileur",
    quote:
      "En trail, mes jambes sont mises à rude épreuve à chaque sortie, la pressothérapie m'aide vraiment à retrouver des jambes légères. Avec cette routine, je récupère mieux, et surtout, je peux repartir plus vite sur les sentiers avec de bonnes sensations.",
    image: "/img/testimonials/seb.png",
  },
  {
    id: 2,
    name: "Lauriane",
    title: "Coach Sportive",
    quote:
      "Le bain froid est devenu un vrai allié dans ma routine de récupération. Après mes entraînements et compétitions de course à pied ou entre mes coachings, il m'aide à mieux récupérer musculairement et à repartir plus vite !",
    image: "/img/testimonials/lauriane.png",
  },
  {
    id: 3,
    name: "Julien Vadella",
    title: "CrossFiteur",
    quote:
      "Avec le CrossFit, la récupération est essentielle. Le combo bain froid-sauna me permet d'enchaîner les entraînements et d'être plus performant en compétition. Aujourd'hui, c'est indispensable pour moi.",
    image: "/img/testimonials/julien.png",
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
