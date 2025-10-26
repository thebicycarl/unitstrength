import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CreditCard, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';
import StripePaymentForm from '@/components/ui/StripePaymentForm';
import { toast } from '@/components/ui/use-toast';

const CheckoutSection = ({ handleFeatureClick, selectedPackage }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    isToowoomba: false
  });
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: type === 'checkbox' ? checked : value
    }));
  };

  const isFormValid = formData.name && formData.email && formData.phone && formData.address && formData.isToowoomba;

  // Default to Core Package if no package is selected
  const selectedPkg = selectedPackage || {
    title: "UNIT One Core Package",
    price: 2500,
    oldPrice: 3500
  };

  const subtotal = selectedPkg.oldPrice || selectedPkg.price;
  const discount = 1000;
  const delivery = 550;
  const total = formData.isToowoomba ? (subtotal + delivery - discount - delivery) : (subtotal + delivery);

  const handleProceedToPayment = () => {
    if (isFormValid) {
      setShowPaymentForm(true);
    } else {
      toast({
        title: "Please fill in all required fields",
        description: "Make sure all form fields are completed before proceeding to payment.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentSuccess = (paymentIntent) => {
    setPaymentSuccess(true);
    toast({
      title: "Order Confirmed! 🎉",
      description: `Your payment of $${total.toLocaleString()} has been processed successfully.`,
    });
  };

  const handlePaymentError = (error) => {
    console.error('Payment error:', error);
    toast({
      title: "Payment Failed",
      description: error.message || "There was an error processing your payment. Please try again.",
      variant: "destructive",
    });
  };

  const handleBackToForm = () => {
    setShowPaymentForm(false);
    setPaymentSuccess(false);
  };

  return (
    <section id="checkout" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-brand-primary">Purchase UNIT ONE Pro</h2>
          <p className="text-xl text-brand-tertiary">Secure your order and take the first step towards a new you.</p>
        </div>

        <div className="bg-brand-secondary p-8 rounded-2xl shadow-lg border border-brand-tertiary/20">
          {!showPaymentForm ? (
            <div className="grid md:grid-cols-2 gap-8">
              {/* Form */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-brand-primary">Your Details</h3>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" type="text" placeholder="John Doe" value={formData.name} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="you@example.com" value={formData.email} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" placeholder="0400 123 456" value={formData.phone} onChange={handleChange} />
                  </div>
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input id="address" type="text" placeholder="123 Fitness St, Toowoomba" value={formData.address} onChange={handleChange} />
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Checkbox id="isToowoomba" checked={formData.isToowoomba} onCheckedChange={(checked) => setFormData(p => ({...p, isToowoomba: checked}))} />
                    <Label htmlFor="isToowoomba" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      My delivery address is in the Toowoomba region.
                    </Label>
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="bg-white p-6 rounded-xl border">
                <h3 className="text-2xl font-semibold mb-6 text-brand-primary">Order Summary</h3>
                
                <div className="space-y-3 text-brand-tertiary">
                   <div className="flex justify-between">
                    <span>Selected Package</span>
                    <span className="font-semibold">{selectedPkg.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery & Installation</span>
                    <span>${delivery.toLocaleString()}</span>
                  </div>
                  <div className={`flex justify-between ${formData.isToowoomba ? 'text-brand-accent2' : 'text-brand-tertiary/60'}`}>
                    <span>First 10 Units Discount</span>
                    <span>- ${discount.toLocaleString()}</span>
                  </div>
                   <div className={`flex justify-between ${formData.isToowoomba ? 'text-brand-accent2' : 'text-brand-tertiary/60'}`}>
                    <span>Free Delivery & Install</span>
                    <span>- ${delivery.toLocaleString()}</span>
                  </div>
                  <div className="border-t my-2"></div>
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toLocaleString()}</span>
                  </div>
                </div>

                {!formData.isToowoomba && (
                  <div className="mt-4 bg-brand-accent1/10 border-l-4 border-brand-accent1 text-brand-accent1 p-3 rounded-md">
                     <div className="flex">
                      <div className="py-1"><AlertTriangle className="h-5 w-5 text-brand-accent1 mr-3" /></div>
                      <div>
                        <p className="font-bold">Toowoomba Region Only</p>
                        <p className="text-sm">The special offer is only available for delivery within the Toowoomba region.</p>
                      </div>
                    </div>
                  </div>
                )}
                
                <Button onClick={handleProceedToPayment} className="w-full mt-6 btn-primary text-white hover:!bg-[#1b998b]" size="lg" disabled={!isFormValid}>
                  <CreditCard className="w-5 h-5 mr-2" />
                  Proceed to Payment
                </Button>
                <p className="text-xs text-brand-tertiary/60 mt-2 text-center flex items-center justify-center">
                  <Lock className="w-3 h-3 mr-1" /> Secure Checkout
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Back Button */}
              <div className="flex items-center">
                <Button 
                  variant="outline" 
                  onClick={handleBackToForm}
                  className="flex items-center"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Details
                </Button>
              </div>

              {/* Payment Success Message */}
              {paymentSuccess ? (
                <div className="text-center py-12">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-8">
                    <div className="text-green-600 text-6xl mb-4">✅</div>
                    <h3 className="text-2xl font-bold text-green-800 mb-2">Payment Successful!</h3>
                    <p className="text-green-700 mb-4">Your order has been confirmed and payment processed.</p>
                    <p className="text-sm text-green-600">Order Total: ${total.toLocaleString()}</p>
                    <p className="text-sm text-green-600 mt-2">You will receive a confirmation email shortly.</p>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Payment Form */}
                  <div>
                    <h3 className="text-2xl font-semibold mb-6 text-brand-primary">Payment Information</h3>
                    <StripePaymentForm
                      amount={total}
                      customerData={formData}
                      onSuccess={handlePaymentSuccess}
                      onError={handlePaymentError}
                    />
                  </div>

                  {/* Order Summary (Payment View) */}
                  <div className="bg-white p-6 rounded-xl border">
                    <h3 className="text-2xl font-semibold mb-6 text-brand-primary">Order Summary</h3>
                    
                    <div className="space-y-3 text-brand-tertiary">
                      <div className="flex justify-between">
                        <span>Selected Package</span>
                        <span className="font-semibold">{selectedPkg.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${subtotal.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery & Installation</span>
                        <span>${delivery.toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between ${formData.isToowoomba ? 'text-brand-accent2' : 'text-brand-tertiary/60'}`}>
                        <span>First 10 Units Discount</span>
                        <span>- ${discount.toLocaleString()}</span>
                      </div>
                      <div className={`flex justify-between ${formData.isToowoomba ? 'text-brand-accent2' : 'text-brand-tertiary/60'}`}>
                        <span>Free Delivery & Install</span>
                        <span>- ${delivery.toLocaleString()}</span>
                      </div>
                      <div className="border-t my-2"></div>
                      <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>
                        <span>${total.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Customer Details */}
                    <div className="mt-6 pt-6 border-t">
                      <h4 className="font-semibold text-brand-primary mb-3">Delivery Details</h4>
                      <div className="space-y-2 text-sm text-brand-tertiary">
                        <p><strong>Name:</strong> {formData.name}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Phone:</strong> {formData.phone}</p>
                        <p><strong>Address:</strong> {formData.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CheckoutSection;