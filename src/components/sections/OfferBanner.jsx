import React from 'react';

const OfferBanner = () => {
  return (
    <section id="offer-banner" className="bg-gradient-to-r from-brand-primary to-brand-tertiary text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-lg font-semibold">
            New product offer for Toowoomba region: $1000 off plus free delivery & install!
          </p>
          <p className="text-sm opacity-90">Only available on first 10 units sold</p>
        </div>
      </div>
    </section>
  );
};

export default OfferBanner;