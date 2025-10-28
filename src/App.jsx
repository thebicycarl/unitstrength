import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { AppLayout } from '@/components/layout/AppLayout';
import HeroSection from '@/components/sections/HeroSection';
import OfferBanner from '@/components/sections/OfferBanner';
import ProductOverview from '@/components/sections/ProductOverview';
import FeaturesSection from '@/components/sections/FeaturesSection';
// TEMP: Hidden for EOI phase - can be restored later
// import PricingSection from '@/components/sections/PricingSection';
// import CheckoutSection from '@/components/sections/CheckoutSection';
import ExpressionOfInterestSection from '@/components/sections/ExpressionOfInterestSection';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';

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
        <HeroSection handleFeatureClick={handleFeatureClick} scrollToSection={scrollToSection} />
        <OfferBanner />
        <ProductOverview />
        {/* TEMP: Hidden for EOI phase - can be restored later */}
        {/* <PricingSection handleFeatureClick={handleFeatureClick} setSelectedPackage={setSelectedPackage} /> */}
        {/* <CheckoutSection handleFeatureClick={handleFeatureClick} selectedPackage={selectedPackage} /> */}
        <ExpressionOfInterestSection />
        <FeaturesSection />
        {/* CTA below Features: mirrors About section's Express Interest button */}
        <section className="py-10 bg-brand-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <button
                onClick={() => scrollToSection('expression-of-interest')}
                className="btn-primary text-white px-6 py-3 rounded-md hover:!bg-[#1b998b]"
              >
                Express Your Interest
              </button>
            </div>
          </div>
        </section>
        <AboutSection handleFeatureClick={handleFeatureClick} />
        <Footer />
      </AppLayout>
      
      <Toaster />
    </>
  );
}

export default App;