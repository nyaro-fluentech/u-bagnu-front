import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "CGV / Conditions d'utilisation",
  description:
    "Conditions générales de vente et d'utilisation du site U Bagnu.",
}

export default function CGVPage() {
  return (
    <main className="mx-auto max-w-[800px] px-[24px] pt-[160px] pb-[80px] md:px-[48px]">
      <h1 className="font-bricolage-grotesque mb-[32px] text-[32px] font-medium text-[#2E2E2E] md:text-[40px]">
        CGV / Conditions d&apos;utilisation
      </h1>

      <div className="font-inter flex flex-col gap-[24px] text-[15px] leading-[1.7] text-[#2E2E2E]/80">
        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Objet
          </h2>
          <p>
            Les présentes conditions générales de vente régissent les relations
            entre U Bagnu et ses clients dans le cadre de la fourniture de
            services de récupération sportive (bains froids, sauna infrarouge,
            pressothérapie).
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Tarifs
          </h2>
          <p>
            Les tarifs des prestations sont indiqués en euros TTC. U Bagnu se
            réserve le droit de modifier ses tarifs à tout moment. Les
            prestations sont facturées sur la base des tarifs en vigueur au
            moment de la réservation.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Réservation et annulation
          </h2>
          <p>
            [Conditions de réservation et politique d&apos;annulation à
            compléter]
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Paiement
          </h2>
          <p>[Modalités de paiement à compléter]</p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Responsabilité
          </h2>
          <p>
            U Bagnu met tout en œuvre pour assurer la sécurité et le bon
            déroulement de ses prestations. Le client s&apos;engage à signaler
            toute contre-indication médicale avant le début de la séance.
          </p>
        </section>

        <section>
          <h2 className="mb-2 text-[20px] font-semibold text-[#2E2E2E]">
            Droit applicable
          </h2>
          <p>
            Les présentes conditions sont soumises au droit français. En cas de
            litige, les tribunaux compétents seront ceux du ressort du siège
            social de U Bagnu.
          </p>
        </section>
      </div>
    </main>
  )
}
