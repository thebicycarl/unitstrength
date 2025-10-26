import React from 'react';
import { motion } from 'framer-motion';

const OfferBanner = () => {
  return (
    <section id="offer-banner" className="bg-brand-primary text-white py-1.5 md:py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden md:block text-center">
          <p className="text-lg font-semibold">
            New product offer: $1000 off plus free install!
          </p>
          <p className="text-sm opacity-90">Only available for Toowoomba region, while stocks last.</p>
        </div>
        
        {/* Mobile only */}
        <div className="md:hidden">
          <div className="flex items-center justify-center gap-2">
            <p className="text-sm tracking-wide italic">
              New Product offer
            </p>
            <motion.div
              className="-translate-y-0.5"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;