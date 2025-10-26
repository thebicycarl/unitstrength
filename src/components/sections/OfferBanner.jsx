import React from 'react';

const OfferBanner = () => {
  return (
    <section id="offer-banner" className="bg-brand-primary text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold">
            New product offer: $1000 off plus free install!
          </p>
          <p className="text-sm opacity-90">Only available for Toowoomba region, while stocks last.</p>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;