import { Hero } from "@/components/Hero";
import { DailyWorkFeed } from "@/components/DailyWorkFeed";
import { ServicesSection } from "@/components/ServicesSection";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { CostCalculator } from "@/components/CostCalculator";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <>
      {/* Hero with 30 Years Experience Badge & Direct WhatsApp/Call CTAs */}
      <Hero />

      {/* Daily Work Feed with Live Photos and Videos */}
      <DailyWorkFeed limit={6} showFilters={true} />

      {/* Detailed Services with specs and materials */}
      <ServicesSection />

      {/* Interactive Before & After Restoration Slider */}
      <BeforeAfterSlider />

      {/* Interactive Mobile-Friendly Budget Estimator */}
      <CostCalculator />

      {/* Trust Factors - Why Choose Father with 30 Years Experience */}
      <WhyChooseUs />

      {/* Customer Reviews and Testimonials */}
      <Testimonials />

      {/* Free Site Measurement & Inspection Booking */}
      <ContactSection />
    </>
  );
}
