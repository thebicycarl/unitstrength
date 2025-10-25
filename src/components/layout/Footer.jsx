import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo-unit.png" 
                alt="UNIT" 
                className="h-6 w-auto"
              />
              <span className="text-2xl font-bold gradient-text">Strength</span>
            </div>
            <p className="text-brand-secondary/80 mt-4">
              Transforming homes with premium fitness solutions designed and built in Queensland.
            </p>
          </div>
          
          <div>
            <span className="text-lg font-semibold">Products</span>
            <div className="mt-4 space-y-2">
              <p className="text-brand-secondary/80">UNIT ONE Pro</p>
              <p className="text-brand-secondary/80">Accessories</p>
              <p className="text-brand-secondary/80">Installation</p>
            </div>
          </div>
          
          <div>
            <span className="text-lg font-semibold">Support</span>
            <div className="mt-4 space-y-2">
              <p className="text-brand-secondary/80">Contact Us</p>
              <p className="text-brand-secondary/80">Warranty</p>
              <p className="text-brand-secondary/80">Delivery Info</p>
            </div>
          </div>
          
          <div>
            <span className="text-lg font-semibold">Contact</span>
            <div className="mt-4 space-y-2">
              <p className="text-brand-secondary/80">0432 923 571</p>
              <p className="text-brand-secondary/80">info@unitstrength.com.au</p>
              <p className="text-brand-secondary/80">Toowoomba, QLD</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-tertiary/30 mt-12 pt-8 text-center">
          <p className="text-brand-secondary/80">
            © 2025 Unit Strength. All rights reserved. Proudly designed and built in Toowoomba, Queensland.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;