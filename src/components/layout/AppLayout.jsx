import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, ShoppingCart, X } from 'lucide-react';

export function AppLayout({ children, scrollToSection, handleFeatureClick }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (sectionId, e) => {
    if (e) {
      e.preventDefault();
      if (e.currentTarget && typeof e.currentTarget.blur === 'function') {
        e.currentTarget.blur();
      }
    }
    setIsMobileMenuOpen(false);
    // Small additional delay to ensure menu closes before scrollToSection delay
    setTimeout(() => {
      scrollToSection(sectionId);
    }, 50);
  };

  const handleLogoHoverEnter = () => {
    // Only enable hover effect on non-touch devices (desktop)
    if (window.innerWidth >= 768) {
      setIsLogoHovered(true);
    }
  };

  const handleLogoHoverLeave = () => {
    if (window.innerWidth >= 768) {
      setIsLogoHovered(false);
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                onMouseEnter={handleLogoHoverEnter}
                onMouseLeave={handleLogoHoverLeave}
                className="flex items-center space-x-2 transition-opacity cursor-pointer h-full max-h-full"
              >
                <img 
                  src={isLogoHovered ? "/UNIT Strength logo teal.png" : "/UNIT Strength logo 2.png"}
                  alt="UNIT" 
                  className="h-8 w-auto md:h-12"
                />

              </button>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('features')}
                className="text-brand-tertiary hover:!text-[#1b998b] transition-colors"
              >
                Features
              </button>
              
              <button 
                onClick={() => scrollToSection('about')}
                className="text-brand-tertiary hover:!text-[#1b998b] transition-colors"
              >
                About
              </button>
              <Button onClick={(e) => { scrollToSection('expression-of-interest'); if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') { e.currentTarget.blur(); } }} onPointerUp={(e)=>{ if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') { e.currentTarget.blur(); } }} onTouchEnd={(e)=>{ if (e && e.currentTarget && typeof e.currentTarget.blur === 'function') { e.currentTarget.blur(); } setTimeout(()=>{ if (document && document.activeElement instanceof HTMLElement) { document.activeElement.blur(); } },0); }} className="btn-primary no-press-mobile text-white transition-none md:transition-all md:hover:!bg-[#1b998b] active:!bg-[#001f47] focus:!bg-[#001f47] focus-visible:!ring-0 focus:!ring-0 focus:!ring-offset-0">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Express Interest
              </Button>
            </div>
            
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={handleMobileMenuToggle}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Tray */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <div className="px-4 py-6 space-y-4">
            <button 
              onClick={(e) => handleMobileNavClick('features', e)}
              className="block w-full text-left text-lg font-medium text-brand-tertiary hover:!text-[#1b998b] transition-colors py-2"
            >
              Features
            </button>
            
            <button 
              onClick={(e) => handleMobileNavClick('about', e)}
              className="block w-full text-left text-lg font-medium text-brand-tertiary hover:!text-[#1b998b] transition-colors py-2"
            >
              About
            </button>
            <div className="pt-4 border-t border-gray-200">
              <Button 
                onClick={(e) => handleMobileNavClick('expression-of-interest', e)} 
                className="w-full btn-primary text-white hover:!bg-[#1b998b]"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Express Interest
              </Button>
            </div>
          </div>
        </div>
      )}

      <main>{children}</main>
    </div>
  );
}