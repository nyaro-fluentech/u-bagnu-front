import HeroSection from "./_components/sections/hero-section"
import AudiencesSection from "./_components/sections/audiences-section"
import ServicesSection from "./_components/sections/services-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AudiencesSection />
      <ServicesSection />
      <section className="h-[200dvh]"></section>
    </main>
  )
}
