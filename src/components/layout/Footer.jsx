import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-brand-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/UNIT Strength logo light grey.png" 
                alt="UNIT" 
                className="h-12 w-auto"
              />
              <span className="text-2xl font-bold gradient-text">Strength</span>
            </div>
            <p className="text-brand-secondary/80">
              Transforming homes with premium fitness solutions designed and built in Queensland.
            </p>
          </div>
          
          <div>
            <span className="text-lg font-semibold mb-4 block">Products</span>
            <div className="space-y-2">
              <p className="text-brand-secondary/80">UNIT ONE Pro</p>
            </div>
          </div>
          
          <div>
            <span className="text-lg font-semibold mb-4 block">Contact</span>
            <div className="space-y-2">
              <p className="text-brand-secondary/80">+61 432 923 571 (Whatsapp preferred)</p>
              <p className="text-brand-secondary/80">carl@unitstrength.com.au</p>
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