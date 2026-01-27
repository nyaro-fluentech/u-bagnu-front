import Image from "next/image"

const AboutSection = () => {
  return (
    <section
      id="about"
      className="bg-background relative flex items-center justify-center overflow-hidden px-[122px] py-[64px]"
    >
      {/* Main content */}
      <div className="max-auto relative flex max-w-[1200px] flex-col gap-[25px] pt-[80px] pb-[160px]">
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

      {/* U BAGNU large text - absolute positioned */}
      <div className="pointer-events-none absolute right-[14px] bottom-[19px] select-none">
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
