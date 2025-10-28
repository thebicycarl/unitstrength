import React from 'react';
import { CheckCircle } from 'lucide-react';

const ProductOverview = () => {
  const overviewPoints = [
    { title: "Store all your equipment in one tidy unit", description: "Keep your workout space organized and clutter-free" },
    { title: "Perfect for your spare room, garage or anywhere in the home", description: "Compact design fits seamlessly into any space" },
    { title: "Ready to workout in seconds", description: "Quick setup means more time for your fitness goals" },
    { title: "Built tough to handle your hardest workouts", description: "Premium construction for years of reliable performance" },
  ];

  return (
    <section id="product-overview" className="py-12 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-brand-primary">UNIT ONE Pro</h2>
          <p className="text-lg md:text-xl text-brand-tertiary">Transform your home and unleash your fitness potential</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div>
            <img  
              className="w-full rounded-2xl shadow-xl"
              alt="UNIT ONE Pro detailed view"
             src="/hinges.jpg" />
          </div>
          
          <div className="space-y-4 md:space-y-5">
            {overviewPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-7 h-7 bg-[#1b998b] rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold mb-1 text-brand-primary">{point.title}</h3>
                  <p className="text-sm md:text-base text-brand-tertiary">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductOverview;