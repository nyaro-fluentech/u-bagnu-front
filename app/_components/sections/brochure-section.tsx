import BrochureForm from "./brochure-form"
import BrochureAnimation from "./brochure-animation"

const BrochureSection = () => {
  return (
    <section
      id="brochure"
      aria-labelledby="brochure-heading"
      className="flex flex-col items-center justify-center bg-[#FFE8C2] px-[122px] py-[160px]"
      data-hide-header
      data-numero="7"
    >
      <BrochureAnimation />

      {/* Main heading */}
      <div className="flex max-w-[1196px] flex-col gap-[64px]">
        <h2
          id="brochure-heading"
          className="font-outfit text-[64px] leading-[80px] font-medium"
        >
          <span data-animate-line className="text-primary">
            Vous êtes unique.
          </span>
          <br />
          <span data-animate-line className="text-[#2E2E2E]">
            Votre emploi du temps, vos contraintes, vos objectifs aussi.
          </span>{" "}
          <span data-animate-line className="text-[#A2A2A2]">
            c&apos;est pourquoi nous avons pensé à un service adapté à vos
            besoins.
          </span>
        </h2>

        {/* Form section */}
        <div className="flex flex-col gap-[9px]">
          <p className="font-outfit ml-[41px] text-[24px] font-medium text-[#000000]">
            Recevez notre brochure gratuitement afin de voir l&apos;offre qui
            vous convient
          </p>

          <BrochureForm />
        </div>
      </div>
    </section>
  )
}

export default BrochureSection
