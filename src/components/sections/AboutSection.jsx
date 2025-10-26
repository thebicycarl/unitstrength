import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Phone, Mail, MapPin } from 'lucide-react';

const AboutSection = ({ handleFeatureClick }) => {
  return (
    <section id="about" className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="p-8 bg-white rounded-2xl shadow-xl">
            <img 
              className="w-full" 
              alt="Unit Strength company and manufacturing" 
              src="/logo-unit.png"
            />
          </div>
          
          <div>
            <h2 className="text-4xl font-bold mb-6 text-brand-primary">About us</h2>
            <p className="text-lg text-brand-tertiary mb-6">
              UNIT Strength was founded out of passion for fitness and innovation. We are proud to design and craft the UNIT One Pro right here in Toowoomba, Queensland. Our precision engineering and local craftsmanship ensures that every UNIT One Pro meets the highest standards of quality and durability, while supporting your workouts and our stylish as your home.
            </p>
            
            <Button 
              onClick={() => {
                const el = document.getElementById('pricing');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                }
              }} 
              className="btn-primary text-white mb-8 hover:!bg-[#1b998b]"
            >
              Shop UNIT ONE Pro
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            
            <div className="border-t pt-8">
              <h3 className="text-2xl font-bold mb-4 text-brand-primary">Contact us</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-brand-accent2" />
                  <span className="text-brand-tertiary">Questions? Call or text Carl on +61 432 923 571 (Whatsapp preferred)</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-brand-accent2" />
                  <span className="text-brand-tertiary">carl@unitstrength.com.au</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-brand-accent2" />
                  <span className="text-brand-tertiary">Toowoomba, Queensland, Australia</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;