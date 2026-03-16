import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Gestion des cookies",
  description: "Politique de gestion des cookies du site U Bagnu.",
}

export default function CookiesPage() {
  return (
    <main className="mx-auto max-w-[800px] px-[24px] pt-[160px] pb-[80px] md:px-[48px]">
      <h1 className="font-bricolage-grotesque mb-[32px] text-[32px] font-medium text-[#2E2E2E] md:text-[40px]">
        Gestion des cookies
      </h1>

      <div className="font-inter flex flex-col gap-[24px] text-[15px] leading-[1.7] text-[#2E2E2E]/80">
        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Qu&apos;est-ce qu&apos;un cookie ?
          </h2>
          <p>
            Un cookie est un petit fichier texte déposé sur votre terminal
            (ordinateur, tablette, smartphone) lors de la visite d&apos;un site
            internet. Il permet au site de mémoriser des informations sur votre
            visite.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Cookies utilisés sur ce site
          </h2>
          <p>Le site U Bagnu peut utiliser les types de cookies suivants :</p>
          <ul className="mt-2 list-inside list-disc">
            <li>
              <strong>Cookies essentiels :</strong> nécessaires au bon
              fonctionnement du site
            </li>
            <li>
              <strong>Cookies analytiques :</strong> pour mesurer
              l&apos;audience et améliorer le site
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Gestion de vos préférences
          </h2>
          <p>
            Vous pouvez à tout moment modifier vos préférences en matière de
            cookies via les paramètres de votre navigateur. La désactivation de
            certains cookies peut affecter votre expérience de navigation.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            En savoir plus
          </h2>
          <p>
            Pour toute question relative à notre politique de cookies, vous
            pouvez nous contacter à{" "}
            <a
              href="mailto:ubagnu.corsica@gmail.com"
              className="text-primary underline hover:no-underline"
            >
              ubagnu.corsica@gmail.com
            </a>
          </p>
        </section>
      </div>
    </main>
  )
}
