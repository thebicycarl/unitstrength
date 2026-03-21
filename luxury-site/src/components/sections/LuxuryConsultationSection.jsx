import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';

const LuxuryConsultationSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const isFormValid = formData.name && formData.email && formData.phone;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      return;
    }

    setIsSubmitting(true);

    // Simulate form submission (frontend only for now)
    setTimeout(() => {
      setIsSuccess(true);
      setIsSubmitting(false);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        message: ''
      });
    }, 1500);
  };

  if (isSuccess) {
    return (
      <section id="consultation" className="luxury-section bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-12 rounded-lg shadow-xl text-center border border-gray-200"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
            <h2 className="text-3xl font-semibold mb-4 text-brand-primary">Thank You</h2>
            <p className="luxury-text text-gray-600 mb-6">
              We've received your consultation request and will be in touch within 24 hours to discuss 
              how we can create the perfect home gym solution for you.
            </p>
            <Button 
              onClick={() => setIsSuccess(false)}
              className="btn-primary text-white hover:!bg-[#1b998b]"
            >
              Submit Another Request
            </Button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="consultation" className="luxury-section bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="luxury-heading text-brand-primary">Request a Consultation</h2>
          <p className="luxury-text max-w-2xl mx-auto text-gray-600">
            Let's discuss how we can transform your space into a bespoke home gym that reflects your style and meets your fitness goals.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="bg-brand-secondary p-10 rounded-lg shadow-lg border border-gray-200">
            <div className="space-y-6">
              <div>
                <Label htmlFor="name" className="text-brand-primary font-medium">
                  Full Name *
                </Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange}
                  required
                  className="mt-2 bg-white"
                />
              </div>
              
              <div>
                <Label htmlFor="email" className="text-brand-primary font-medium">
                  Email Address *
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={formData.email} 
                  onChange={handleChange}
                  required
                  className="mt-2 bg-white"
                />
              </div>
              
              <div>
                <Label htmlFor="phone" className="text-brand-primary font-medium">
                  Phone Number *
                </Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="0400 123 456" 
                  value={formData.phone} 
                  onChange={handleChange}
                  required
                  className="mt-2 bg-white"
                />
              </div>
              
              <div>
                <Label htmlFor="location" className="text-brand-primary font-medium">
                  Location
                </Label>
                <Input 
                  id="location" 
                  type="text" 
                  placeholder="City, State" 
                  value={formData.location} 
                  onChange={handleChange}
                  className="mt-2 bg-white"
                />
              </div>
              
              <div>
                <Label htmlFor="message" className="text-brand-primary font-medium">
                  Tell Us About Your Vision
                </Label>
                <textarea
                  id="message"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                  placeholder="Share your space requirements, design preferences, or any questions you have..."
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-8 btn-primary text-white hover:!bg-[#1b998b] rounded-none py-6 text-lg" 
              size="lg"
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Request Consultation'
              )}
            </Button>
            
            <p className="text-sm text-gray-500 mt-4 text-center">
              We'll respond within 24 hours to schedule your consultation
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default LuxuryConsultationSection;

