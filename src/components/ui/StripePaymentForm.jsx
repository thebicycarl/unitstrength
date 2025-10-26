import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { CreditCard, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { createPaymentIntent } from '@/lib/paymentApi';

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 'pk_test_your_publishable_key_here');

// Payment Form Component
const PaymentForm = ({ 
  amount, 
  customerData, 
  onSuccess, 
  onError,
  isProcessing,
  setIsProcessing 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isComplete, setIsComplete] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setMessage(null);

    try {
      // Create payment intent using our API helper
      const { clientSecret, error: backendError } = await createPaymentIntent(
        amount,
        'aud',
        customerData
      );

      if (backendError) {
        throw new Error(backendError.message);
      }

      // Confirm the payment
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success`,
        },
        redirect: 'if_required',
      });

      if (error) {
        if (error.type === 'card_error' || error.type === 'validation_error') {
          setMessage(error.message);
        } else {
          setMessage('An unexpected error occurred.');
        }
        onError && onError(error);
      } else if (paymentIntent.status === 'succeeded') {
        setMessage('Payment succeeded!');
        setIsComplete(true);
        onSuccess && onSuccess(paymentIntent);
        
        toast({
          title: "Payment Successful! 🎉",
          description: "Your order has been processed successfully.",
        });
      }
    } catch (err) {
      setMessage(err.message);
      onError && onError(err);
      
      toast({
        title: "Payment Failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold mb-4 text-gray-900">Payment Details</h3>
        <PaymentElement 
          options={{
            layout: 'tabs',
            fields: {
              billingDetails: {
                name: 'auto',
                email: 'auto',
                phone: 'auto',
                address: {
                  country: 'auto',
                  line1: 'auto',
                  city: 'auto',
                  state: 'auto',
                  postalCode: 'auto',
                },
              },
            },
          }}
          onChange={(event) => {
            setIsComplete(event.complete);
          }}
        />
      </div>

      {message && (
        <div className={`p-4 rounded-lg flex items-center ${
          message.includes('succeeded') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message.includes('succeeded') ? (
            <CheckCircle className="w-5 h-5 mr-2" />
          ) : (
            <AlertCircle className="w-5 h-5 mr-2" />
          )}
          <span className="text-sm font-medium">{message}</span>
        </div>
      )}

      <Button 
        type="submit" 
        disabled={!stripe || !elements || !isComplete || isProcessing}
        className="w-full btn-primary text-white hover:!bg-[#1b998b]"
        size="lg"
      >
        {isProcessing ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Processing Payment...
          </>
        ) : (
          <>
            <CreditCard className="w-5 h-5 mr-2" />
            Pay ${amount.toLocaleString()}
          </>
        )}
      </Button>

      <div className="text-xs text-gray-500 text-center">
        <p>🔒 Your payment information is secure and encrypted</p>
        <p>Powered by Stripe • SSL Protected</p>
      </div>
    </form>
  );
};

// Main Stripe Payment Component
const StripePaymentForm = ({ 
  amount, 
  customerData, 
  onSuccess, 
  onError 
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  // For demo purposes, we'll use a mock client secret
  // In production, you'll get this from your backend
  const options = {
    clientSecret: 'pi_mock_client_secret_for_demo', // Replace with actual client secret from backend
    appearance: {
      theme: 'stripe',
      variables: {
        colorPrimary: '#3B82F6',
        colorBackground: '#ffffff',
        colorText: '#1F2937',
        colorDanger: '#EF4444',
        fontFamily: 'Inter, system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '8px',
      },
      rules: {
        '.Input': {
          border: '1px solid #D1D5DB',
          borderRadius: '8px',
          padding: '12px',
        },
        '.Input:focus': {
          border: '1px solid #3B82F6',
          boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
        },
        '.Label': {
          fontWeight: '500',
          color: '#374151',
          marginBottom: '6px',
        },
      },
    },
  };

  return (
    <div className="stripe-payment-container">
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm 
          amount={amount}
          customerData={customerData}
          onSuccess={onSuccess}
          onError={onError}
          isProcessing={isProcessing}
          setIsProcessing={setIsProcessing}
        />
      </Elements>
    </div>
  );
};

export default StripePaymentForm;
