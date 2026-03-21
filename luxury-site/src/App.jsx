import React from 'react';
import { Helmet } from 'react-helmet-async';
import LuxuryTopVideoSection from './components/sections/LuxuryTopVideoSection';
import LuxuryHeroSection from './components/sections/LuxuryHeroSection';
import LuxuryBenefitsSection from './components/sections/LuxuryBenefitsSection';
import LuxuryAboutSection from './components/sections/LuxuryAboutSection';
import LuxuryConsultationSection from './components/sections/LuxuryConsultationSection';

function App() {
  const scrollToSection = (sectionId) => {
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (!element) return;

      const navbarHeight = 0; // No navbar in luxury version
      const buffer = 20;

      const rect = element.getBoundingClientRect();
      const absoluteTop = rect.top + window.pageYOffset;
      const targetY = Math.max(0, absoluteTop - navbarHeight - buffer);

      window.scrollTo({ top: targetY, behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <Helmet>
        <title>UNIT ONE Pro - Luxury Bespoke Home Gym | Unit Strength</title>
        <meta name="description" content="Bespoke luxury home gym solutions. Transform your space with UNIT ONE Pro - premium fitness equipment designed for discerning clients." />
      </Helmet>
      
      <div className="min-h-screen overflow-x-hidden">
        <LuxuryTopVideoSection scrollToSection={scrollToSection} />
        <LuxuryHeroSection scrollToSection={scrollToSection} />
        <LuxuryBenefitsSection />
        <LuxuryAboutSection />
        <LuxuryConsultationSection />
      </div>
    </>
  );
}

export default App;

