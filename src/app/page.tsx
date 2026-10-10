import { Hero } from "@/components/Hero";
import { ServicesSection } from "@/components/ServicesSection";
import { DailyWorkFeed } from "@/components/DailyWorkFeed";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { BeforeAfterSlider } from "@/components/BeforeAfterSlider";
import { Testimonials } from "@/components/Testimonials";
import { ContactSection } from "@/components/ContactSection";

// Seamless natural transition: Ultra-soft feathered ambient light that creates organic visual breathing room without looking like an artificial divider.
const SeamlessTransition = () => (
  <div aria-hidden="true" className="relative w-full overflow-hidden pointer-events-none select-none h-px">
    <div className="w-full max-w-4xl mx-auto h-[1px] bg-gradient-to-r from-transparent via-amber-500/[0.08] to-transparent" />
  </div>
);

export default function Home() {
  return (
    <>
      {/* 1. Home / Hero Showcase */}
      <Hero />

      <SeamlessTransition />

      {/* 2. Services: Modular Kitchens, Wardrobes, Temples, Beds, Doors & Polish */}
      <ServicesSection />

      <SeamlessTransition />

      {/* 3. Daily Work: Photos & Videos Feed */}
      <DailyWorkFeed limit={6} showFilters={true} />

      <SeamlessTransition />

      {/* 4. 30 Yrs Legacy: Craftsmanship Philosophy, Before/After Slider & Customer Reviews */}
      <WhyChooseUs />
      <BeforeAfterSlider />
      <Testimonials />

      <SeamlessTransition />

      {/* 5. Contact: Direct Calls, WhatsApp & Free Site Visit Booking */}
      <ContactSection />
    </>
  );
}
