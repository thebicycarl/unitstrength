import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Phone, Mail } from 'lucide-react';

const PricingCard = ({ title, description, imageSrc, alt, features, price, oldPrice, popular = false, handleFeatureClick }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`pricing-card p-8 rounded-2xl text-center relative ${popular ? 'featured text-white' : ''}`}
  >
    {popular && (
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-accent2 text-white px-4 py-1 rounded-full text-sm font-semibold">
        Recommended
      </div>
    )}
    
    <h3 className="text-2xl font-bold mb-4">{title}</h3>
    <p className={popular ? "text-gray-300 mb-6" : "text-gray-600 mb-6"}>{description}</p>
    
    <img  className="w-full h-48 object-cover rounded-lg mb-6" alt={alt} src="/60 by 60.jpg" />
    
    <div className={`mb-6 text-sm space-y-1 ${!popular && 'text-gray-600'}`}>{features.map((feature, index) => <p key={index}>{feature}</p>)}</div>
    
    <div className="mb-6">
      {oldPrice && <span className="text-xl text-gray-400 line-through mr-2">${oldPrice.toLocaleString()}</span>}
      <span className="text-3xl font-bold">${price.toLocaleString()}</span>
      <p className={`text-sm ${popular ? 'text-gray-300' : 'text-gray-500'}`}>New product offer: $1000 off, free installation</p>
    </div>
    
    <Button onClick={handleFeatureClick} className={`w-full ${popular ? 'bg-brand-accent1 hover:!bg-[#1b998b] text-white' : 'btn-primary text-white hover:!bg-[#1b998b]'}`}>Buy now</Button>
  </motion.div>
);

const PricingSection = ({ handleFeatureClick, setSelectedPackage }) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Start with Core Package (index 1)
  const scrollContainerRef = useRef(null);
  const cardRefs = useRef([]);

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
      imageSrc: "/core package.jpg",
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
      // Total items: packages + 1 customization card
      const totalItems = packages.length + 1;
      const cardWidth = scrollContainerRef.current.scrollWidth / totalItems;
      scrollContainerRef.current.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = (e) => {
    if (scrollContainerRef.current) {
      const scrollLeft = e.target.scrollLeft;
      const totalItems = packages.length + 1;
      const cardWidth = e.target.scrollWidth / totalItems;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setSelectedIndex(newIndex);
    }
  };

  // Scroll to middle card on initial load
  useEffect(() => {
    if (scrollContainerRef.current) {
      const totalItems = packages.length + 1;
      const cardWidth = scrollContainerRef.current.scrollWidth / totalItems;
      scrollContainerRef.current.scrollTo({
        left: selectedIndex * cardWidth,
        behavior: 'auto'
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBuyNow = (pkg, index) => {
    if (setSelectedPackage) {
      setSelectedPackage(pkg);
    }
    
    // On desktop, scroll to center the pricing section
    if (window.innerWidth >= 768) {
      const pricingSection = document.getElementById('pricing');
      
      if (pricingSection) {
        const sectionTop = pricingSection.offsetTop;
        const sectionHeight = pricingSection.offsetHeight;
        const viewportHeight = window.innerHeight;
        
        // Calculate position to show "Choose your unit" at top and contact details at bottom
        const scrollPosition = sectionTop - ((viewportHeight - sectionHeight) / 2);
        
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    } else {
      // On mobile, scroll to checkout section
      const el = document.getElementById('checkout');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="pricing" className="py-10 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3 md:mb-4 text-brand-primary">Choose your UNIT</h2>
          <p className="text-base sm:text-lg md:text-xl text-brand-tertiary">New product offer: $1000 off, free installation</p>
          <p className="text-sm sm:text-base md:text-lg text-brand-tertiary/70 mt-1 sm:mt-2">Eligible for Toowoomba residents only. while stocks last</p>
        </div>
        
        {/* Desktop Grid */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center">
          {packages.map((pkg, index) => (
            <div key={index} ref={el => cardRefs.current[index] = el} className="flex flex-col h-full max-w-[300px] mx-auto">
              <div 
                className={`p-4 md:p-3 pt-6 md:pt-5 rounded-2xl text-center relative flex flex-col h-full pricing-card featured text-white`}
                style={{ 
                  border: pkg.popular ? '4px solid #1b998b' : '4px solid white'
                }}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-accent2 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Recommended
                  </div>
                )}
                
                <div className="flex-1 flex flex-col">
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base md:text-lg font-bold mb-2 md:mb-2">{pkg.title}</h3>
                    <div className="h-10 md:h-10 mb-3 md:mb-3">
                      <p className="text-xs md:text-sm text-gray-300">{pkg.description}</p>
                    </div>
                    
                    <div className="flex-1 flex items-center justify-center mb-3 md:mb-3">
                      <img className={`w-full h-28 md:h-28 object-cover rounded-lg ${index === 1 ? 'object-top' : ''}`} alt={pkg.alt} src={pkg.imageSrc || "https://images.unsplash.com/photo-1599472696777-95cab5e0f891"} />
                    </div>
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div className="mb-3 md:mb-3 text-xs space-y-0.5 md:space-y-0.5 text-white">
                      {pkg.features.map((feature, idx) => <p key={idx}>{feature}</p>)}
                    </div>
                    
                    <div className="mb-3 md:mb-3">
                      {pkg.oldPrice && <span className="text-base md:text-lg text-gray-400 line-through mr-2">${pkg.oldPrice.toLocaleString()}</span>}
                      <span className="text-xl md:text-2xl font-bold">${pkg.price.toLocaleString()}</span>
                      <p className="text-xs mt-1 text-gray-300">New product offer: $1000 off, free installation</p>
                    </div>
                  </div>
                </div>
                
                <Button onClick={() => handleBuyNow(pkg, index)} className={`w-full text-sm md:py-1.5 py-2 mt-auto ${pkg.popular ? 'bg-brand-accent1 hover:!bg-[#1b998b] text-white' : 'bg-brand-accent1 hover:!bg-[#1b998b] text-white'}`}>
                  Buy now
                </Button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Desktop Customization Section */}
        <div className="hidden md:block mt-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-3 text-brand-primary">
              Want a different cabinetry color or other customisation?
            </h3>
            <p className="text-base mb-4 text-brand-tertiary">We can design and fitout a UNIT to suit your exact needs</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-brand-accent2" />
                <span className="text-base text-brand-tertiary">+61 432 923 571 (Whatsapp preferred)</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-brand-accent2" />
                <span className="text-base text-brand-tertiary">carl@unitstrength.com.au</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Carousel */}
        <div className="md:hidden -mx-4">
          <div className="flex items-center justify-center space-x-3 mb-4 px-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToPackage(Math.max(0, selectedIndex - 1))}
              disabled={selectedIndex === 0 || selectedIndex === packages.length}
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
                    index === selectedIndex ? 'bg-brand-accent2' : 'bg-gray-300'
                  }`}
                />
              ))}
              <button
                onClick={() => scrollToPackage(packages.length)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  selectedIndex === packages.length ? 'bg-brand-accent2' : 'bg-gray-300'
                }`}
              />
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={() => scrollToPackage(Math.min(packages.length, selectedIndex + 1))}
              disabled={selectedIndex === packages.length}
              className="w-10 h-10 rounded-full border border-gray-300"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
          
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex space-x-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pt-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {packages.map((pkg, index) => (
              <div key={index} className="flex-shrink-0 w-[280px] snap-center">
                <div 
                  className={`p-6 pt-8 rounded-2xl text-center relative flex flex-col h-full pricing-card featured text-white`}
                  style={{ 
                    border: pkg.popular ? '8px solid #1b998b' : '8px solid white'
                  }}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-accent2 text-white px-4 py-1 rounded-full text-sm font-semibold">
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
                        <img className={`w-full h-32 object-cover rounded-lg ${index === 1 ? 'object-top' : ''}`} alt={pkg.alt} src={pkg.imageSrc || "https://images.unsplash.com/photo-1599472696777-95cab5e0f891"} />
                      </div>
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="mb-4 text-xs space-y-1 text-white">
                        {pkg.features.map((feature, idx) => <p key={idx}>{feature}</p>)}
                      </div>
                      
                      <div className="mb-4">
                        {pkg.oldPrice && <span className="text-lg text-gray-400 line-through mr-2">${pkg.oldPrice.toLocaleString()}</span>}
                        <span className="text-2xl font-bold">${pkg.price.toLocaleString()}</span>
                        <p className="text-xs mt-1 text-gray-300">New product offer: $1000 off, free installation</p>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={() => handleBuyNow(pkg, index)} className={`w-full text-sm py-2 mt-auto ${pkg.popular ? 'bg-brand-accent1 hover:!bg-[#1b998b] text-white' : 'bg-brand-accent1 hover:!bg-[#1b998b] text-white'}`}>
                    Buy now
                  </Button>
                </div>
              </div>
            ))}
            
            {/* Customization Card */}
            <div className="flex-shrink-0 w-[280px] snap-center">
              <div 
                className="p-6 pt-8 rounded-2xl text-center relative flex flex-col h-full pricing-card featured text-white"
                style={{ 
                  border: '8px solid white'
                }}
              >
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-4">Customisation</h3>
                  <p className="text-sm text-brand-accent2 mb-4">
                    Want a different cabinetry color or other customisation?
                  </p>
                  <p className="text-xs text-white mb-6">
                    We can design and fitout a UNIT to suit your exact needs
                  </p>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex flex-col items-center space-y-2">
                      <Phone className="w-5 h-5 text-brand-accent2" />
                      <span className="text-sm text-white">+61 432 923 571 (Whatsapp preferred)</span>
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <Mail className="w-5 h-5 text-brand-accent2" />
                      <span className="text-sm text-white">carl@unitstrength.com.au</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;