import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

/**
 * ExpressionOfInterestSection Component
 * 
 * Sheet.best Setup Instructions:
 * 1. Create a Google Sheet with columns: name, email, phone, suburb, heard about us, comments, timestamp
 * 2. Go to https://sheet.best and connect your Google Sheet
 * 3. Copy the API endpoint URL they provide
 * 4. Add to .env: VITE_SHEET_BEST_URL=your_endpoint_here
 * 5. Form will POST data directly to the sheet
 */

const ExpressionOfInterestSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    suburb: '',
    heardAboutUs: '',
    comments: ''
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

  const isFormValid = formData.name && formData.email && formData.phone && formData.suburb;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid) {
      toast({
        title: "Please fill in all required fields",
        description: "Name, email, phone, and suburb are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Add timestamp
      const submissionData = {
        ...formData,
        timestamp: new Date().toISOString()
      };

      // Get the Sheet.best endpoint from environment variable
      const sheetEndpoint = import.meta.env.VITE_SHEET_BEST_URL;
      
      if (!sheetEndpoint) {
        console.warn('VITE_SHEET_BEST_URL not configured. Form data:', submissionData);
        
        // Development mode - just show success
        toast({
          title: "Development Mode",
          description: "Form submission logged to console. Configure VITE_SHEET_BEST_URL in .env to enable real submissions.",
        });
        setIsSuccess(true);
        return;
      }

      // POST to Sheet.best API
      // Note: Sheet.best expects data as individual row fields
      const rowData = {
        name: submissionData.name,
        email: submissionData.email,
        phone: submissionData.phone,
        suburb: submissionData.suburb,
        "heard about us": submissionData.heardAboutUs,
        comments: submissionData.comments,
        timestamp: submissionData.timestamp
      };

      const response = await fetch(sheetEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(rowData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSuccess(true);
      // Preserve current scroll position to keep confirmation in view
      // by cancelling any potential browser auto-scroll
      if (typeof window !== 'undefined') {
        const currentY = window.scrollY;
        setTimeout(() => {
          window.scrollTo({ top: currentY, behavior: 'auto' });
        }, 0);
      }
      
      toast({
        title: "Thanks! We'll be in touch within 24 hours 🎉",
        description: "We've received your expression of interest and will contact you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        suburb: '',
        heardAboutUs: '',
        comments: ''
      });

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your form. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <section id="expression-of-interest" className="py-20 bg-brand-secondary">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-brand-primary">Thank you for your interest!</h2>
            <p className="text-lg text-brand-tertiary mb-6">
              We've received your expression of interest and will be in touch within 24 hours.
            </p>
            <p className="text-brand-tertiary mb-6">
              Next batch of UNITs ready <strong>January 2026</strong>. We'll keep you updated on availability and the special offer.
            </p>
            <div className="border-t pt-6 mt-6">
              <p className="text-sm text-brand-tertiary mb-2">Questions? Contact us:</p>
              <p className="text-brand-tertiary">0492 923 571</p>
              <p className="text-brand-tertiary">carl@unitstrength.com.au</p>
            </div>
            <Button 
              onClick={() => {
                setIsSuccess(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="mt-6 btn-primary text-white hover:!bg-[#1b998b]"
            >
              Submit Another
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="expression-of-interest" className="py-20 bg-brand-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-brand-primary">Expression of Interest</h2>
          <div className="max-w-3xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="text-2xl text-gray-400 line-through">$2,900</span>
                <span className="text-3xl font-bold text-brand-accent1">$1,900</span>
              </div>
              <p className="text-lg text-brand-tertiary mb-2 font-semibold text-brand-accent2">
                New product offer - $1,000 off plus free installation!
              </p>
              <p className="text-sm text-brand-tertiary">Toowoomba residents only</p>
            </div>
            
            <p className="text-lg text-brand-tertiary mb-6">
              The next batch of UNITs will be ready <strong>January 2026</strong>. Interested in getting in before the new product offer runs out? Fill out the form below.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
            <div className="space-y-6">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input 
                  id="name" 
                  type="text" 
                  placeholder="John Doe" 
                  value={formData.name} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="email">Email addy *</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  value={formData.email} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="phone">Phone number *</Label>
                <Input 
                  id="phone" 
                  type="tel" 
                  placeholder="0400 123 456" 
                  value={formData.phone} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="suburb">Suburb *</Label>
                <Input 
                  id="suburb" 
                  type="text" 
                  placeholder="Toowoomba" 
                  value={formData.suburb} 
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="heardAboutUs">How did you hear about us?</Label>
                <Input 
                  id="heardAboutUs" 
                  type="text" 
                  placeholder="Friend, social media, wise sage, etc." 
                  value={formData.heardAboutUs} 
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="comments">Any other comments?</Label>
                <textarea
                  id="comments"
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Anything at all"
                  value={formData.comments}
                  onChange={handleChange}
                  rows="4"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full mt-8 btn-primary text-white hover:!bg-[#1b998b]" 
              size="lg"
              disabled={isSubmitting || !isFormValid}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Submitting...
                </>
              ) : (
                'Submit Expression of Interest'
              )}
            </Button>
            
            <p className="text-xs text-brand-tertiary/60 mt-4 text-center">
              We'll be in touch within 24 hours
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ExpressionOfInterestSection;

