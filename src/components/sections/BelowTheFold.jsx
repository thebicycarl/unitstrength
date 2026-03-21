import React from 'react';
import ProductOverview from '@/components/sections/ProductOverview';
import FeaturesSection from '@/components/sections/FeaturesSection';
import ExpressionOfInterestSection from '@/components/sections/ExpressionOfInterestSection';
import AboutSection from '@/components/sections/AboutSection';
import Footer from '@/components/layout/Footer';

/**
 * Code-split bundle: everything below OfferBanner loads after first paint.
 */
export default function BelowTheFold({ handleFeatureClick, scrollToSection }) {
  return (
    <>
      <ProductOverview />
      <ExpressionOfInterestSection />
      <FeaturesSection />
      <section className="py-10 bg-brand-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <button
              type="button"
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
    </>
  );
}
