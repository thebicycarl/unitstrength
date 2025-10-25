import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PricingCard = ({ title, description, imageSrc, alt, features, price, oldPrice, popular = false, handleFeatureClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`pricing-card p-8 rounded-2xl text-center relative ${popular ? 'featured text-white' : ''}`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-accent1 text-white px-4 py-1 rounded-full text-sm font-semibold">
        Recommended
      </div>
    )}
    
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className={popular ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>{description}</p>
    
    <img  className="w-full h-48 object-cover rounded-lg mb-6" alt={alt} src="https://images.unsplash.com/photo-1599472696777-95cab5e0f891" />
    
    <div className={`mb-6 text-sm space-y-1 ${!popular && 'text-gray-600'}`}>{features.map((feature, index) => <p key={index}>{feature}</p>)}</div>
    
    <div className="mb-6">
      {oldPrice && <span className="text-xl text-gray-400 line-through mr-2">${oldPrice.toLocaleString()}</span>}
      <span className="text-3xl font-bold">${price.toLocaleString()}</span>
      <p className={`text-sm ${popular ? 'text-gray-300' : 'text-gray-500'}`}>New product offer: $1000 off, free installation for first 10 units sold</p>
    </div>
    
    <Button onClick={handleFeatureClick} className={`w-full ${popular ? 'bg-brand-accent1 hover:bg-brand-accent1/90 text-white' : 'btn-primary text-white'}`}>Buy now</Button>
  </motion.div>
);

const PricingSection = ({ handleFeatureClick, setSelectedPackage }) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Start with Core Package (index 1)
  const scrollContainerRef = useRef(null);

  const packages = [
    {
      title: "UNIT One",
      description: "Kit your unit out yourself",
      alt: "UNIT One Pro",
      features: [
        "UNIT One Pro",
        "J-Hooks & Safety bars"
      ],
      oldPrice: 2900,
      price: 1900,
    },
    {
      title: "UNIT One Core Package",
      description: "Everything you need to get started, and beyond!",
      alt: "UNIT One Core Package",
      features: [
        "UNIT One Pro",
        "J-Hooks & Safety bars",
        "Meteor 20kg Olympic bar",
        "Revolution pro 70kg bumper set",
        "2 x 2.5kg plates",
        "(total 95kg set)",
        "UNIT flat bench"
      ],
      oldPrice: 3500,
      price: 2500,
      popular: true,
    },
    {
      title: "UNIT One Fully Loaded",
      description: "Fully unleash your home workouts",
      alt: "UNIT One Fully Loaded",
      features: [
        "Everything in the Core Package plus:",
        "Extra pair 20kg bumper plates",
        "(total 135kg set)",
        "Dip bar attachment",
        "Crash pads",
        "Mirror & Whiteboard"
      ],
      oldPrice: 4900,
      price: 3900,
    }
  ];

  const scrollToPackage = (index) => {
    setSelectedIndex(index);
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.scrollWidth / packages.length;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (e) => {
    if (scrollContainerRef.current) {
      const scrollLeft = e.target.scrollLeft;
      const cardWidth = e.target.scrollWidth / packages.length;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setSelectedIndex(newIndex);
    }
  };

  const handleBuyNow = (pkg) => {
    if (setSelectedPackage) {
      setSelectedPackage(pkg);
    }
    // Scroll to checkout section
    const el = document.getElementById('checkout');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-brand-primary">Choose your UNIT</h2>
          <p className="text-xl text-brand-tertiary">New product offer: $1000 off, free installation for first 10 units sold!</p>
          <p className="text-lg text-brand-tertiary/70 mt-2">Eligible for Toowoomba residents only<br/>First shipment arrival estimated July 2025</p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {packages.map((pkg, index) => (
            <div key={index} className="flex flex-col h-full max-w-[340px] mx-auto">
              <div 
                className={`p-6 pt-8 rounded-2xl text-center relative flex flex-col h-full pricing-card featured text-white`}
                style={{ 
                  border: pkg.popular ? '4px solid #ec4e20' : '4px solid #d1d5db'
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-accent1 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                )}
                
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-lg font-bold mb-3">{pkg.title}</h3>
                    <div className="h-12 mb-4">
                      <p className="text-sm text-gray-300">{pkg.description}</p>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center mb-4">
                      <img className="w-full h-32 object-cover rounded-lg" alt={pkg.alt} src="https://images.unsplash.com/photo-1599472696777-95cab5e0f891" />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-4 text-xs space-y-1 text-white">
                      {pkg.features.map((feature, idx) => <p key={idx}>{feature}</p>)}
                    </div>
                    
                    <div className="mb-4">
                      {pkg.oldPrice && <span className="text-lg text-gray-400 line-through mr-2">${pkg.oldPrice.toLocaleString()}</span>}
                      <span className="text-2xl font-bold">${pkg.price.toLocaleString()}</span>
                      <p className="text-xs mt-1 text-gray-300">New product offer: $1000 off, free installation for first 10 units sold</p>
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => handleBuyNow(pkg)} className={`w-full text-sm py-2 mt-auto ${pkg.popular ? 'bg-brand-accent1 hover:bg-brand-accent1/90 text-white' : 'bg-brand-accent1 hover:bg-brand-accent1/90 text-white'}`}>
                  Buy now
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToPackage(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0}
              className="w-10 h-10 rounded-full border border-gray-300"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            
            <div className="flex space-x-2">
              {packages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollToPackage(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === selectedIndex ? 'bg-brand-accent1' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToPackage(Math.min(packages.length - 1, selectedIndex + 1))}
              disabled={selectedIndex === packages.length - 1}
              className="w-10 h-10 rounded-full border border-gray-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-8 pt-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {packages.map((pkg, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] snap-center">
                <div 
                  className={`p-6 pt-8 rounded-2xl text-center relative flex flex-col h-full pricing-card featured text-white`}
                  style={{ 
                    border: pkg.popular ? '8px solid #ec4e20' : '8px solid #d1d5db'
                  }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-accent1 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Recommended
                    </div>
                  )}
                  
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 flex flex-col">
                      <h3 className="text-lg font-bold mb-3">{pkg.title}</h3>
                      <div className="h-12 mb-4">
                        <p className="text-sm text-gray-300">{pkg.description}</p>
                      </div>
                      
                      <div className="flex-1 flex items-center justify-center mb-4">
                        <img className="w-full h-32 object-cover rounded-lg" alt={pkg.alt} src="https://images.unsplash.com/photo-1599472696777-95cab5e0f891" />
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="mb-4 text-xs space-y-1 text-white">
                        {pkg.features.map((feature, idx) => <p key={idx}>{feature}</p>)}
                      </div>
                      
                      <div className="mb-4">
                        {pkg.oldPrice && <span className="text-lg text-gray-400 line-through mr-2">${pkg.oldPrice.toLocaleString()}</span>}
                        <span className="text-2xl font-bold">${pkg.price.toLocaleString()}</span>
                        <p className="text-xs mt-1 text-gray-300">New product offer: $1000 off, free installation for first 10 units sold</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleBuyNow(pkg)} className={`w-full text-sm py-2 mt-auto ${pkg.popular ? 'bg-brand-accent1 hover:bg-brand-accent1/90 text-white' : 'bg-brand-accent1 hover:bg-brand-accent1/90 text-white'}`}>
                    Buy now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;