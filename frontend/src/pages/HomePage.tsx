import { Hero } from '../components/home/Hero';
import { ServicesSection } from '../components/home/ServicesSection';
import { HowItWorks } from '../components/home/HowItWorks';
import { PricingSection } from '../components/home/PricingSection';
import { Testimonials } from '../components/home/Testimonials';
import { UploadSection } from '../components/home/UploadSection';

export function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <HowItWorks />
      <PricingSection />
      <Testimonials />
      <UploadSection />
    </>
  );
}