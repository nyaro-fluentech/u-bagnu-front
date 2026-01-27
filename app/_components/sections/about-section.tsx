import Image from "next/image"

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-background relative flex items-center justify-center overflow-hidden px-[24px] py-[48px] md:px-[48px] md:py-[64px] lg:px-[122px]"
    >
      {/* Mobile/Tablet Layout */}
      <div className="flex flex-col gap-[24px] md:gap-[32px] lg:hidden">
        {/* Title */}
        <h2 className="font-outfit text-[32px] leading-[110%] font-medium md:text-[48px]">
          Qui sommes-nous?
        </h2>

        {/* First paragraph */}
        <p className="font-inter text-[16px] leading-[150%] md:text-[18px]">
          U Bagnu accompagne les sportifs dans la récupération et la
          régénération de leur corps, quels que soient leur niveau et leurs
          objectifs. Né en Corse, le projet est issu d&apos;un constat vécu sur
          le terrain : en tant que sportifs et actifs amateurs, nous cherchions
          des solutions de récupération efficaces, adaptées à nos contraintes
          réelles. Elles n&apos;existaient pas.
        </p>

        {/* Image with U BAGNU text overlay */}
        <div className="relative">
          <div className="relative aspect-3/4 w-full lg:aspect-4/3">
            <Image
              src="/img/about/founders.jpg"
              alt="Les fondateurs de U Bagnu"
              fill
              className="object-cover"
            />
          </div>
          {/* U BAGNU text overlapping bottom of image */}
          <div className="pointer-events-none absolute right-0 -bottom-[40px] left-0 select-none md:-bottom-[60px]">
            <span className="font-outfit text-primary block text-end text-[80px] leading-[0.9] font-medium md:text-[120px]">
              U
              <br />
              BAGNU
            </span>
          </div>
        </div>

        {/* Remaining paragraphs */}
        <div className="mt-[40px] flex flex-col gap-[24px] md:mt-[60px]">
          <p className="font-inter text-[16px] leading-[150%] md:text-[18px]">
            Notre leitmotiv : amener la récupération directement là où
            l&apos;effort a lieu, en cabinet ou en déplacement, au sein des
            clubs, structures sportives et événements.
          </p>

          <p className="font-inter text-[16px] leading-[150%] md:text-[18px]">
            Issue de la préparation physique, notre approche repose sur des
            solutions simples et reconnues — bain froid, bain contrasté, sauna,
            pressothérapie — utilisées avec méthode. Accessible et mobile, U
            Bagnu s&apos;adresse aux sportifs individuels comme aux équipes,
            avec une conviction forte : la récupération doit suivre le
            mouvement, pas l&apos;inverse.
          </p>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="max-auto relative hidden max-w-[1200px] flex-col gap-[25px] pt-[80px] pb-[160px] lg:flex">
        {/* Title */}
        <h2 className="font-outfit text-[72px] leading-[99px] font-medium">
          Qui sommes-nous?
        </h2>

        {/* Content row */}
        <div className="flex flex-row items-start gap-[73px]">
          {/* Left - Image */}
          <div className="relative h-[622px] w-[431px] shrink-0">
            <Image
              src="/img/about/founders.jpg"
              alt="Les fondateurs de U Bagnu"
              fill
              className="object-cover"
            />
          </div>

          {/* Right - Text content */}
          <div className="flex max-w-[550px] flex-col gap-[24px] pt-[20px]">
            <p className="font-inter text-[20px] leading-[125%]">
              U Bagnu accompagne les sportifs dans la récupération et la
              régénération de leur corps, quels que soient leur niveau et leurs
              objectifs. Né en Corse, le projet est issu d&apos;un constat vécu
              sur le terrain : en tant que sportifs et actifs amateurs, nous
              cherchions des solutions de récupération efficaces, adaptées à nos
              contraintes réelles. Elles n&apos;existaient pas.
            </p>

            <p className="font-inter text-[20px] leading-[125%]">
              Notre leitmotiv : amener la récupération directement là où
              l&apos;effort a lieu, en cabinet ou en déplacement, au sein des
              clubs, structures sportives et événements.
            </p>

            <p className="font-inter text-[20px] leading-[125%]">
              Issue de la préparation physique, notre approche repose sur des
              solutions simples et reconnues — bain froid, bain contrasté,
              sauna, pressothérapie — utilisées avec méthode. Accessible et
              mobile, U Bagnu s&apos;adresse aux sportifs individuels comme aux
              équipes, avec une conviction forte : la récupération doit suivre
              le mouvement, pas l&apos;inverse.
            </p>
          </div>
        </div>
      </div>

      {/* U BAGNU large text - absolute positioned (desktop only) */}
      <div className="pointer-events-none absolute right-[14px] bottom-[19px] hidden select-none lg:block">
        <span className="font-outfit text-primary block text-end text-[295px] leading-[269px] font-medium">
          U
          <br />
          BAGNU
        </span>
      </div>
    </section>
  )
}

export default AboutSection
