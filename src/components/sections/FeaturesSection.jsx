import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ imageSrc, alt, title }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="feature-card p-6 rounded-2xl card-hover"
  >
    <img  className="w-full h-48 object-cover rounded-lg mb-4" alt={alt} src={imageSrc} />
    <h3 className="text-lg font-semibold mb-2 text-brand-primary">{title}</h3>
  </motion.div>
);

const FeaturesSection = () => {
  const features = [
    { title: "Standard 60mm x 60mm bar sizing takes wide variety of attachments", alt: "Standard 60mm x 60mm bar sizing", imageSrc: "/60 by 60.jpg" },
    { title: "Locally designed and built in Toowoomba, Queensland*", alt: "Locally designed and built in Toowoomba", imageSrc: "/Australian made.png" },
    { title: "Mount to your wall (recommended) or leave free-standing with removable supports", alt: "Mount to wall or free-standing", imageSrc: "/removable supports.jpg" },
    { title: "(Limited time offer) buy a UNIT and receive a complementary 30min coaching session from one of our friendly team", alt: "Coaching session offer", imageSrc: "/coaching session.jpg" },
    { title: "Adjust the pullup bar height to suit you and your ceilings", alt: "Adjustable pullup bar height", imageSrc: "/pullup bar.jpg" },
    { title: "Made with 3mm commercial grade steel, the UNIT ONE Pro is built to last", alt: "Commercial grade steel construction", imageSrc: "/Commercial grade steel.jpg" },
    { title: "Easily store over 180kg of bumper plates on the internal weight horns", alt: "Weight storage capacity", imageSrc: "/Store bumper plates.jpg" },
    { title: "Heavy duty double-hinge doors fold open smooth as butter", alt: "Double-hinge doors", imageSrc: "/hinges.jpg" },
  ];

  return (
    <section id="features" className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4 text-brand-primary">FEATURES</h2>
          <p className="text-xl text-brand-tertiary">Everything you need for a complete workout experience</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;