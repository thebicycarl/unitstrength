import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ handleFeatureClick }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => setIsVideoLoaded(true);
      const handleLoadedData = () => setIsVideoLoaded(true);
      
      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('loadeddata', handleLoadedData);
      
      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, []);

  return (
    <section className="pt-16 min-h-[446px] md:min-h-[90vh] flex items-center justify-center relative overflow-hidden bg-[#959288] md:bg-[#969694]">
      {/* Video placeholder/loading state */}
      {!isVideoLoaded && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#969694] to-[#959288]" />
      )}
      
      <video 
        ref={videoRef}
        autoPlay 
        loop 
        muted 
        playsInline
        preload="auto"
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover scale-[0.4] md:scale-[0.8] rotate-[0.5deg] translate-x-5 md:translate-x-10 -translate-y-[15px] md:translate-y-0 transition-opacity duration-500"
        style={{ opacity: isVideoLoaded ? 1 : 0 }}
      >
        <source src="/Cut clip v2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-5xl md:text-7xl font-black mb-6 -mt-19.8 -translate-x-1">
              <span className="gradient-text [text-shadow:0_3px_8px_rgba(255,255,255,0.5)]">The Ultimate</span>
              <br />
              <span className="text-white [text-shadow:0_3px_8px_rgba(0,0,0,0.6),0_6px_12px_rgba(0,0,0,0.4)]">Enclosed Home Gym</span>
            </h1>
            
            
            
            <Button 
              onClick={() => {
                const el = document.getElementById('pricing');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              size="lg" 
              className="btn-primary text-white text-lg px-8 py-4 rounded-full hover:!bg-[#1b998b]"
            >
              Shop UNIT ONE Pro
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 z-10 hidden md:flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <button 
            onClick={() => {
              const el = document.getElementById('offer-banner');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                // Fallback: scroll down by viewport height
                window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
              }
            }}
            className="w-12 h-12 bg-brand-secondary/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-brand-secondary/30 hover:bg-brand-secondary/30 transition-all duration-300 group"
          >
            <svg 
              className="w-5 h-5 text-brand-secondary group-hover:scale-110 transition-transform duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;