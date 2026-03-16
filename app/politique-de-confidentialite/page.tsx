import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité du site U Bagnu.",
}

export default function PolitiqueConfidentialitePage() {
  return (
    <main className="mx-auto max-w-[800px] px-[24px] pt-[160px] pb-[80px] md:px-[48px]">
      <h1 className="font-bricolage-grotesque mb-[32px] text-[32px] font-medium text-[#2E2E2E] md:text-[40px]">
        Politique de confidentialité
      </h1>

      <div className="font-inter flex flex-col gap-[24px] text-[15px] leading-[1.7] text-[#2E2E2E]/80">
        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Collecte des données personnelles
          </h2>
          <p>
            Les données personnelles collectées sur ce site (nom, email,
            téléphone) le sont uniquement dans le cadre du traitement de vos
            demandes de contact ou de réservation. Ces données ne sont jamais
            cédées à des tiers.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Finalité du traitement
          </h2>
          <p>
            Les données collectées via nos formulaires sont utilisées pour :
          </p>
          <ul className="mt-2 list-inside list-disc">
            <li>Répondre à vos demandes de contact</li>
            <li>Gérer vos réservations de séances</li>
            <li>Vous envoyer notre brochure par email</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Durée de conservation
          </h2>
          <p>
            Vos données personnelles sont conservées pour la durée nécessaire au
            traitement de votre demande et pendant une durée maximale de 3 ans à
            compter du dernier contact.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Vos droits
          </h2>
          <p>
            Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de
            rectification, de suppression et de portabilité de vos données. Vous
            pouvez exercer ces droits en nous contactant à l&apos;adresse :{" "}
            <a
              href="mailto:ubagnu.corsica@gmail.com"
              className="text-primary underline hover:no-underline"
            >
              ubagnu.corsica@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Cookies
          </h2>
          <p>
            Ce site peut utiliser des cookies à des fins de mesure
            d&apos;audience et d&apos;amélioration de l&apos;expérience
            utilisateur. Pour en savoir plus, consultez notre page{" "}
            <a
              href="/cookies"
              className="text-primary underline hover:no-underline"
            >
              Gestion des cookies
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  )
}
