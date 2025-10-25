import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import { toast } from '@/components/ui/use-toast';
import { AppLayout } from '@/components/layout/AppLayout';
import HeroSection from '@/components/sections/HeroSection';
import OfferBanner from '@/components/sections/OfferBanner';
import ProductOverview from '@/components/sections/ProductOverview';
import FeaturesSection from '@/components/sections/FeaturesSection';
import PricingSection from '@/components/sections/PricingSection';
import CheckoutSection from '@/components/sections/CheckoutSection';
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
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Helmet>
        <title>UNIT ONE Pro - The Ultimate Enclosed Home Gym | Unit Strength</title>
        <meta name="description" content="Transform your home with the UNIT ONE Pro - the ultimate enclosed home gym. Premium fitness equipment designed for maximum results in minimal space." />
      </Helmet>
      
      <AppLayout scrollToSection={scrollToSection} handleFeatureClick={handleFeatureClick}>
        <HeroSection handleFeatureClick={handleFeatureClick} />
        <OfferBanner />
        <ProductOverview />
        <PricingSection handleFeatureClick={handleFeatureClick} setSelectedPackage={setSelectedPackage} />
        <CheckoutSection handleFeatureClick={handleFeatureClick} selectedPackage={selectedPackage} />
        <FeaturesSection />
        <AboutSection handleFeatureClick={handleFeatureClick} />
        <Footer />
      </AppLayout>
      
      <Toaster />
    </>
  );
}

export default App;