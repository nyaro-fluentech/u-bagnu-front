import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site U Bagnu.",
}

export default function MentionsLegalesPage() {
  return (
    <main className="mx-auto max-w-[800px] px-[24px] pt-[160px] pb-[80px] md:px-[48px]">
      <h1 className="font-bricolage-grotesque mb-[32px] text-[32px] font-medium text-[#2E2E2E] md:text-[40px]">
        Mentions légales
      </h1>

      <div className="font-inter flex flex-col gap-[24px] text-[15px] leading-[1.7] text-[#2E2E2E]/80">
        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Éditeur du site
          </h2>
          <p>
            U Bagnu
            <br />
            Z.I Erbajolo Lotissement Restituta
            <br />
            20600 Furiani
            <br />
            Email : ubagnu.corsica@gmail.com
            <br />
            Téléphone : 06.34.52.35.58
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Directeur de la publication
          </h2>
          <p>[Nom du directeur de la publication]</p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Hébergeur
          </h2>
          <p>
            [Nom de l&apos;hébergeur]
            <br />
            [Adresse de l&apos;hébergeur]
            <br />
            [Téléphone de l&apos;hébergeur]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Conception et développement
          </h2>
          <p>
            Site conçu et développé par Fluentech –{" "}
            <a
              href="https://fluentech-group.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:no-underline"
            >
              fluentech-group.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Propriété intellectuelle
          </h2>
          <p>
            L&apos;ensemble du contenu de ce site (textes, images, logos,
            vidéos, etc.) est protégé par le droit d&apos;auteur. Toute
            reproduction, même partielle, est interdite sans autorisation
            préalable.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Responsabilité
          </h2>
          <p>
            U Bagnu s&apos;efforce de fournir des informations aussi précises
            que possible. Toutefois, il ne pourra être tenu responsable des
            omissions, inexactitudes ou carences dans la mise à jour des
            informations.
          </p>
        </section>
      </div>
    </main>
  )
}
