import BrochureForm from "./brochure-form"
import BrochureAnimation from "./brochure-animation"

const BrochureSection = () => {
  return (
    <section
      id="brochure"
      aria-labelledby="brochure-heading"
      className="flex flex-col items-center justify-center bg-[#FFE8C2] px-[24px] py-[48px] md:px-[48px] md:py-[80px] lg:px-[122px] lg:py-[160px]"
      data-hide-header
      data-numero="7"
    >
      <BrochureAnimation />

      {/* Main heading */}
      <div className="flex max-w-[1196px] flex-col gap-[32px] md:gap-[48px] lg:gap-[64px]">
        <h2
          id="brochure-heading"
          className="font-outfit text-[28px] leading-[120%] font-medium md:text-[40px] lg:text-[64px] lg:leading-[80px]"
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
          <p className="font-outfit text-[16px] font-medium text-[#000000] md:text-[18px] lg:ml-[41px] lg:text-[24px]">
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
