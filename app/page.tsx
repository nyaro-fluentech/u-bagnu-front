import HeroSection from "./_components/sections/hero-section"
import AudiencesSection from "./_components/sections/audiences-section"
import ServicesSection from "./_components/sections/services-section"
import ServicesDetailSection from "./_components/sections/services-detail-section"
import ServicesNeedsSection from "./_components/sections/services-needs-section"
import AboutSection from "./_components/sections/about-section"
import GallerySection from "./_components/sections/gallery-section"
import TestimonialsSection from "./_components/sections/testimonials-section"
import BrochureSection from "./_components/sections/brochure-section"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AudiencesSection />
      <ServicesSection />
      <ServicesDetailSection />
      <ServicesNeedsSection />
      <AboutSection />
      <GallerySection />
      <TestimonialsSection />
      <BrochureSection />
    </main>
  )
}
