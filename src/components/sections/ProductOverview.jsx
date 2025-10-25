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
    <section className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <p className="text-lg text-brand-tertiary mb-2">Introducing the ultimate enclosed home gym:</p>
          <h2 className="text-4xl font-bold mb-4 text-brand-primary">UNIT ONE Pro</h2>
          <p className="text-xl text-brand-tertiary">Transform your home and unleash your fitness potential with the UNIT ONE Pro</p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img  
              className="w-full rounded-2xl shadow-xl"
              alt="UNIT ONE Pro detailed view"
             src="/60 by 60.jpg" />
          </div>
          
          <div className="space-y-8">
            {overviewPoints.map((point, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-brand-accent1 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 text-brand-primary">{point.title}</h3>
                  <p className="text-brand-tertiary">{point.description}</p>
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