import type { Metadata } from "next"
import { Outfit, Bricolage_Grotesque } from "next/font/google"
import "./globals.css"
import Header from "./_components/header"
import Footer from "./_components/footer"

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
    "Corse",
    "bien-être",
    "relaxation",
    "sport",
    "athlètes",
    "récupération musculaire",
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
  "@type": "LocalBusiness",
  name: "U Bagnu",
  description:
    "Récupération sportive mobile en Corse. Bains froids, sauna infrarouge, pressothérapie pour sportifs et particuliers.",
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
  telephone: "+33634523558",
  email: "ubagnu.corsica@gmail.com",
  areaServed: {
    "@type": "Place",
    name: "Corse, France",
  },
  serviceType: [
    "Bains immersifs",
    "Bain froid",
    "Bain contrasté",
    "Sauna infrarouge",
    "Pressothérapie",
    "Récupération sportive",
  ],
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
        {children}
        <Footer />
      </body>
    </html>
  )
}
