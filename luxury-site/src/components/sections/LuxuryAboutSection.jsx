import React from 'react';
import { motion } from 'framer-motion';

const LuxuryAboutSection = () => {
  return (
    <section id="about" className="luxury-section bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white p-12 shadow-xl">
              <img 
                className="w-full" 
                alt="Unit Strength company and manufacturing" 
                src="/logo-unit.png"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2"
          >
            <h2 className="luxury-heading text-brand-primary mb-6">Our Story</h2>
            <div className="space-y-6 luxury-text">
              <p>
                UNIT Strength was born from a passion for fitness and an uncompromising commitment to excellence. 
                We believe that your home gym should be more than just functional—it should be a reflection of 
                your values and a testament to quality craftsmanship.
              </p>
              <p>
                Every UNIT ONE Pro is designed and crafted with precision in Toowoomba, Queensland. Our local 
                manufacturing ensures that each piece meets the highest standards of quality and durability, 
                while supporting Australian craftsmanship and your fitness journey.
              </p>
              <p className="font-medium text-brand-primary">
                When you invest in UNIT ONE Pro, you're not just buying equipment—you're investing in a piece 
                of art that will serve you for years to come.
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-gray-300">
              <h3 className="text-2xl font-semibold mb-6 text-brand-primary">Contact Us</h3>
              <div className="space-y-4 luxury-text">
                <p className="text-gray-700">
                  <span className="font-medium">Phone:</span> 0492 923 571
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Email:</span> carl@unitstrength.com.au
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Location:</span> Toowoomba, Queensland, Australia
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LuxuryAboutSection;

