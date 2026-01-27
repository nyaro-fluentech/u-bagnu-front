import HeroSection from "./_components/sections/hero-section"
import AudiencesSection from "./_components/sections/audiences-section"
import ServicesSection from "./_components/sections/services-section"
import ServicesDetailSection from "./_components/sections/services-detail-section"
import ServicesNeedsSection from "./_components/sections/services-needs-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AudiencesSection />
      <ServicesSection />
      <ServicesDetailSection />
      <ServicesNeedsSection />
    </main>
  )
}
