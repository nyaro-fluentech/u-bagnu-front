import type { Metadata } from "next"
import { Outfit, Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import Header from "./_components/header"
import Footer from "./_components/footer"
import ScrollAnimation from "./_components/scroll-animation"
import SectionHashTracker from "./_components/section-hash-tracker"

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
})

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "U Bagnu | Récupération sportive en Corse",
    template: "%s | U Bagnu",
  },
  description:
    "U Bagnu accompagne les sportifs dans la récupération et la régénération de leur corps. Bains froids, sauna infrarouge, pressothérapie - des solutions mobiles adaptées à vos besoins en Corse.",
  keywords: [
    "récupération sportive",
    "bain froid",
    "bain contrasté",
    "sauna infrarouge",
    "pressothérapie",
    "cryothérapie",
    "drainage lymphatique",
    "massage sportif",
    "récupération musculaire",
    "Corse",
    "Bastia",
    "Ajaccio",
    "Furiani",
    "Haute-Corse",
    "sport Corse",
    "bien-être",
    "relaxation",
    "athlètes",
    "performance sportive",
    "prévention blessures",
  ],
  authors: [{ name: "U Bagnu" }],
  creator: "U Bagnu",
  publisher: "U Bagnu",
  metadataBase: new URL("https://u-bagnu.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://u-bagnu.com",
    siteName: "U Bagnu",
    title: "U Bagnu | Récupération sportive en Corse",
    description:
      "U Bagnu accompagne les sportifs dans la récupération et la régénération de leur corps. Bains froids, sauna infrarouge, pressothérapie.",
    images: [
      {
        url: "/img/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "U Bagnu - Récupération sportive",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "U Bagnu | Récupération sportive en Corse",
    description:
      "U Bagnu accompagne les sportifs dans la récupération et la régénération de leur corps.",
    images: ["/img/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HealthAndBeautyBusiness",
  name: "U Bagnu",
  description:
    "Récupération sportive mobile en Corse. Bains froids, sauna infrarouge, pressothérapie pour sportifs et particuliers à Bastia, Furiani et toute la Corse.",
  url: "https://u-bagnu.com",
  logo: "https://u-bagnu.com/img/logo/logo-type.svg",
  image: "https://u-bagnu.com/img/og-image.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Z.I Erbajolo Lotissement Restituta",
    addressLocality: "Furiani",
    postalCode: "20600",
    addressRegion: "Corse",
    addressCountry: "FR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.6581,
    longitude: 9.4264,
  },
  telephone: "+33634523558",
  email: "ubagnu.corsica@gmail.com",
  sameAs: [
    "https://instagram.com/ubagnu",
    "https://facebook.com/ubagnu",
  ],
  areaServed: [
    { "@type": "City", name: "Bastia" },
    { "@type": "City", name: "Furiani" },
    { "@type": "City", name: "Ajaccio" },
    { "@type": "AdministrativeArea", name: "Corse" },
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Services de récupération sportive",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Bains froids",
          description:
            "Favorise la récupération musculaire, diminue les inflammations et prépare le corps à l'enchaînement des efforts.",
        },
        price: "16",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Sauna infrarouge",
          description:
            "Relaxation profonde, récupération nerveuse et musculaire, idéal en complément des soins sportifs.",
        },
        price: "16",
        priceCurrency: "EUR",
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pressothérapie",
          description:
            "Améliore la circulation sanguine, réduit les courbatures et accélère la récupération musculaire après l'effort.",
        },
        price: "20",
        priceCurrency: "EUR",
      },
    ],
  },
  priceRange: "€€",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${outfit.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <Header />
        <ScrollAnimation />
        <SectionHashTracker />
        {children}
        <Footer />
      </body>
    </html>
  )
}
