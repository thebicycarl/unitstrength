import React, { Suspense, lazy, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { AppLayout } from '@/components/layout/AppLayout';
import TopVideoHeroSection from '@/components/sections/TopVideoHeroSection';
import HeroSection from '@/components/sections/HeroSection';
import OfferBanner from '@/components/sections/OfferBanner';
// TEMP: Hidden for EOI phase - can be restored later
// import PricingSection from '@/components/sections/PricingSection';
// import CheckoutSection from '@/components/sections/CheckoutSection';

const BelowTheFold = lazy(() => import('@/components/sections/BelowTheFold'));

function App() {
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleFeatureClick = () => {
    toast({
      title: "🚧 This feature isn't implemented yet—but don't worry! You can request it in your next prompt! 🚀"
    });
  };

  const scrollToSection = (sectionId) => {
    // Wait a moment to ensure DOM is ready (especially important for mobile menu transitions)
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const navbar = document.querySelector('nav');
      const navbarHeight = navbar ? navbar.offsetHeight : 64;
      // Fixed visual buffer so the section heading isn't clipped,
      // while ensuring content above (like the offer banner) is out of view
      const buffer = -20;

      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const targetY = Math.max(0, absoluteTop - navbarHeight - buffer);

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <Helmet>
        <title>UNIT ONE Pro - The Ultimate Enclosed Home Gym | Unit Strength</title>
        <meta name="description" content="Transform your home with the UNIT ONE Pro - the ultimate enclosed home gym. Premium fitness equipment designed for maximum results in minimal space." />
      </Helmet>
      
      <AppLayout scrollToSection={scrollToSection} handleFeatureClick={handleFeatureClick}>
        <TopVideoHeroSection />
        <HeroSection handleFeatureClick={handleFeatureClick} scrollToSection={scrollToSection} />
        <OfferBanner />
        <Suspense
          fallback={
            <div
              className="min-h-[48vh] bg-brand-secondary/40"
              aria-hidden
            />
          }
        >
          <BelowTheFold handleFeatureClick={handleFeatureClick} scrollToSection={scrollToSection} />
        </Suspense>
      </AppLayout>
      
      <Toaster />
      <Analytics />
    </>
  );
}

export default App;
