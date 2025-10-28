import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ imageSrc, alt, title, subtitle, index }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="feature-card p-3 sm:p-6 rounded-2xl card-hover"
  >
    <img  className={`w-full aspect-square object-cover rounded-lg mb-2 sm:mb-4 ${index === 3 ? 'md:object-[center_bottom] object-[center_top]' : ''}`} alt={alt} src={imageSrc} />
    {alt === 'UNIT ONE Pro dimensions' ? (
      <h3 className="text-sm sm:text-lg font-semibold mb-2 text-brand-primary">
        <div className="grid grid-cols-[auto,auto] gap-x-0.4">
          <span>Width:</span>
          <span>1.2m closed</span>
          <span></span>
          <span>2.5m open</span>
          <span>Depth:</span>
          <span>0.55m</span>
          <span>Height:</span>
          <span>2.25m</span>
        </div>
      </h3>
    ) : (
      <h3 className="text-sm sm:text-lg font-semibold mb-2 text-brand-primary whitespace-pre-line">{title}</h3>
    )}
    {subtitle && <p className="text-xs sm:text-sm italic text-brand-tertiary">{subtitle}</p>}
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    { title: "Standard 60mm x 60mm bar sizing takes wide variety of attachments", alt: "Standard 60mm x 60mm bar sizing", imageSrc: "/hinges.jpg" },
    { title: "Store over 180kg of bumper plates on the internal weight horns", alt: "Weight storage capacity", imageSrc: "/Store bumper plates.jpg" },
    { title: "Adjust the pullup bar height to suit you and your ceilings", alt: "Adjustable pullup bar height", imageSrc: "/pullup bar.jpg" },
    { title: "Dimensions", alt: "UNIT ONE Pro dimensions", imageSrc: "/closed.jpeg" },
    { title: "Made with 3mm commercial grade steel, the UNIT ONE Pro is built to last", alt: "Commercial grade steel construction", imageSrc: "/Commercial grade steel.jpg" },
    { title: "Mount to your wall (recommended) or leave free-standing with removable supports", alt: "Mount to wall or free-standing", imageSrc: "/removable supports.jpg" },
    { title: "New to strength training? Buy a UNIT and receive a complementary 30min coaching session", alt: "Coaching session offer", imageSrc: "/coaching session.jpg" },
    { title: "Locally designed and built in Toowoomba, Queensland", alt: "Locally designed and built in Toowoomba", imageSrc: "/Australian made.png", subtitle: "Some components globally sourced" },
  ];

  return (
    <section id="features" className="py-10 sm:py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4 text-brand-primary">FEATURES</h2>
          <p className="text-base sm:text-xl text-brand-tertiary">Everything you need for a complete workout experience</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;