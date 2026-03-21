import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Home, Wrench, Award, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Sparkles,
    title: 'Bespoke Design',
    description: 'Every UNIT ONE Pro is tailored to your space and aesthetic preferences, ensuring a seamless integration with your home.',
  },
  {
    icon: Home,
    title: 'Space-Saving Excellence',
    description: 'A complete strength + conditioning setup that fits into a 1.2m x 0.6m footprint. Maximize your workout potential in minimal space without compromising on functionality or style.',
  },
  {
    icon: Wrench,
    title: 'White-Glove Installation',
    description: 'Professional installation by our expert team. We handle every detail, from delivery to final setup, ensuring perfection.',
  },
  {
    icon: Award,
    title: 'Premium Craftsmanship',
    description: 'Handcrafted in Toowoomba, Queensland, using commercial-grade steel and precision engineering for lasting quality.',
  },
  {
    icon: Shield,
    title: 'Designed for Discerning Clients',
    description: 'Built for those who value both form and function. A statement piece that elevates your home while serving your fitness goals.',
  },
];

const LuxuryBenefitsSection = () => {
  return (
    <section id="benefits" className="luxury-section bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="luxury-heading text-brand-primary mb-4">Why Choose UNIT ONE Pro</h2>
          <p className="luxury-text max-w-3xl mx-auto text-gray-600 mb-8">
            Experience the perfect fusion of luxury, functionality, and design. A complete strength + conditioning setup that fits into a 2–3 m² footprint.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-lg font-medium text-brand-primary">
            <span>Train hard.</span>
            <span className="hidden sm:block text-gray-300">•</span>
            <span>Stay organised.</span>
            <span className="hidden sm:block text-gray-300">•</span>
            <span>Save space.</span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <div className="h-full p-8 border border-gray-200 hover:border-brand-primary transition-all duration-300 bg-white hover:shadow-lg">
                  <div className="mb-6">
                    <div className="w-14 h-14 bg-brand-primary/10 rounded-full flex items-center justify-center group-hover:bg-brand-primary transition-colors duration-300">
                      <Icon className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 text-brand-primary">
                    {benefit.title}
                  </h3>
                  <p className="luxury-text text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default LuxuryBenefitsSection;

