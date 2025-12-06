import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

interface LocationState {
  vehicleNumber: string;
  vehicleData: any;
  timestamp?: string;
}

export default function VehicleCheckoutPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState | null;

  // Get vehicle data from the form
  const vehicleData = state?.vehicleData || {
    vehicleNo: state?.vehicleNumber || 'N/A',
    Description: state?.vehicleData?.Description || 'Vehicle Description',
    CarModel: 'N/A',
    RegistrationYear: 'N/A',
    FuelType: 'N/A',
    Owner: 'N/A',
  };

  const [contactNumber, setContactNumber] = useState('');
  const [isContactConfirmed, setIsContactConfirmed] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [reportReason, setReportReason] = useState<'buy' | 'sell' | 'insurance' | 'dealer'>('buy');
  const [activeStep, setActiveStep] = useState(1);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const paymentFormRef = useRef<HTMLFormElement>(null);

  const pricing = {
    standard: 199,
    express: 299,
  };

  const gst = (pricing[deliveryType] * 0.18);
  const total = pricing[deliveryType] + gst;

  const handleConfirmContact = () => {
    if (contactNumber.length === 10) {
      setIsContactConfirmed(true);
      setActiveStep(3);
    }
  };

  const handleEdit = () => {
    navigate('/vehicle-history');
  };

  // Send WhatsApp message after successful payment
  const sendWhatsAppNotification = async (paymentData: any) => {
    try {
      const message = `🎉 Payment Successful!\n\nVehicle: ${state?.vehicleNumber}\nAmount: ₹${total.toFixed(0)}\nPayment ID: ${paymentData.razorpay_payment_id}\n\nYour vehicle history report will be delivered to WhatsApp number: ${contactNumber}\n\nThank you for choosing our service!`;
      
      // WhatsApp Business API endpoint - Replace with your actual API
      // This is a placeholder - you'll need to implement your backend API
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: contactNumber,
          message: message,
          vehicleNumber: state?.vehicleNumber,
          amount: total.toFixed(0),
          paymentId: paymentData.razorpay_payment_id
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to send WhatsApp notification');
      }
    } catch (error) {
      console.error('Error sending WhatsApp notification:', error);
    }
  };

  // Load Razorpay script when contact is confirmed
  useEffect(() => {
    if (isContactConfirmed && paymentFormRef.current) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_RoEpmGQSxYpvXD');
      script.async = true;
      
      // Clear any existing scripts in the form
      paymentFormRef.current.innerHTML = '';
      paymentFormRef.current.appendChild(script);
    }
  }, [isContactConfirmed]);

  // Listen for Razorpay payment success
  useEffect(() => {
    const handlePaymentSuccess = (event: any) => {
      if (event.data && event.data.razorpay_payment_id) {
        setPaymentDetails(event.data);
        setPaymentSuccess(true);
        sendWhatsAppNotification(event.data);
      }
    };

    window.addEventListener('message', handlePaymentSuccess);
    
    return () => {
      window.removeEventListener('message', handlePaymentSuccess);
    };
  }, [contactNumber, state?.vehicleNumber, total]);

  // Helper function to get value
  const getValue = (field: any): string => {
    if (!field || field === 'N/A') return 'N/A';
    if (typeof field === 'string') return field;
    return 'N/A';
  };

  const InputField = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
      <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">{label}</p>
      <p className="text-sm font-bold text-gray-900 truncate">{value}</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Payment Success Modal */}
      <AnimatePresence>
        {paymentSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setPaymentSuccess(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
            >
              {/* Success Icon */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-20 h-20 bg-white rounded-full mx-auto flex items-center justify-center mb-4"
                >
                  <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-2">Payment Successful!</h2>
                <p className="text-green-100">Your order has been confirmed</p>
              </div>

              {/* Details */}
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Vehicle Number</span>
                    <span className="font-bold text-gray-900">{state?.vehicleNumber}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Amount Paid</span>
                    <span className="font-bold text-gray-900">₹{total.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                    <span className="text-gray-600 text-sm">Payment ID</span>
                    <span className="font-mono text-xs text-gray-900">{paymentDetails?.razorpay_payment_id?.slice(0, 20)}...</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 text-sm">WhatsApp Number</span>
                    <span className="font-bold text-gray-900">{contactNumber}</span>
                  </div>
                </div>

                {/* WhatsApp Notification */}
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-green-900 mb-1">WhatsApp Notification Sent!</p>
                      <p className="text-sm text-green-700">Your vehicle history report will be delivered to your WhatsApp within 15 minutes.</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={() => {
                      setPaymentSuccess(false);
                      navigate('/');
                    }}
                    className="w-full bg-brand-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={() => setPaymentSuccess(false)}
                    className="w-full border-2 border-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Background */}
      <div className="bg-brand-black text-white py-12 pb-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center gap-2 mb-2 opacity-80">
            <button onClick={() => navigate(-1)} className="hover:text-brand-burgundy transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <span className="text-sm font-medium tracking-wide">BACK TO SEARCH</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Complete your request</h1>
          <p className="text-gray-400 mt-2 max-w-xl">You are just one step away from getting the comprehensive history report for your vehicle.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl -mt-16 pb-20">
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-8">
          {/* Left Column - Form Steps */}
          <div className="space-y-6">
            {/* Step 1: Vehicle Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden"
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-brand-burgundy text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-brand-burgundy/30">
                      1
                    </div>
                    <h2 className="text-xl font-bold text-gray-900">Vehicle Details</h2>
                  </div>
                  <button
                    onClick={handleEdit}
                    className="group flex items-center gap-2 text-sm font-semibold text-brand-burgundy hover:text-red-700 transition-colors bg-red-50 px-4 py-2 rounded-full"
                  >
                    <span>Edit Details</span>
                    <svg className="w-4 h-4 group-hover:bg-red-100 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="col-span-full md:col-span-1 bg-brand-cream/30 p-4 rounded-xl border border-brand-burgundy/10">
                    <p className="text-xs text-brand-burgundy font-bold uppercase tracking-wider mb-1">Registration Number</p>
                    <p className="text-2xl font-bold text-gray-900">{state?.vehicleNumber || 'N/A'}</p>
                    <p className="text-sm text-gray-500 mt-1">{getValue(vehicleData.Description)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Make / Model" value={getValue(vehicleData.CarModel)} />
                    <InputField label="Fuel Type" value={getValue(vehicleData.FuelType)} />
                    <InputField label="Year" value={getValue(vehicleData.RegistrationYear)} />
                    <InputField label="Owner" value={getValue(vehicleData.Owner)} />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 2: Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className={`bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden transition-all duration-300 ${activeStep === 2 ? 'ring-2 ring-brand-burgundy/20' : ''}`}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${isContactConfirmed ? 'bg-green-500 text-white shadow-green-500/30' : 'bg-gray-800 text-white'
                    }`}>
                    {isContactConfirmed ? (
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : '2'}
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
                </div>

                <div className="max-w-md">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number</label>
                  <div className="flex gap-3">
                    <div className="relative flex-1">
                      <input
                        type="tel"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        placeholder="99999 99999"
                        disabled={isContactConfirmed}
                        className={`w-full border rounded-lg pl-4 pr-4 py-3 text-base outline-none transition-all ${isContactConfirmed
                            ? 'bg-gray-50 text-gray-500 border-gray-200'
                            : 'border-gray-300 focus:border-brand-burgundy focus:ring-4 focus:ring-brand-burgundy/10'
                          }`}
                      />
                      {isContactConfirmed && (
                        <button
                          onClick={() => setIsContactConfirmed(false)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-brand-burgundy underline"
                        >
                          Change
                        </button>
                      )}
                    </div>
                    {!isContactConfirmed && (
                      <button
                        onClick={handleConfirmContact}
                        disabled={contactNumber.length !== 10}
                        className="bg-brand-black text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                      >
                        Confirm
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    We will send the vehicle report to this number via WhatsApp.
                  </p>
                </div>
              </div>
            </motion.div>


            {/* Step 3: Purpose */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className={`bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden ${!isContactConfirmed ? 'opacity-60 grayscale-[0.8] pointer-events-none' : ''
                }`}
            >
              <div className="p-6 md:p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-800 text-white flex items-center justify-center font-bold text-lg">
                    3
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Why do you need this report?</h2>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                  {[
                    { id: 'buy', label: 'Buying a Car', icon: '🚗' },
                    { id: 'sell', label: 'Selling my Car', icon: '🏷️' },
                    { id: 'insurance', label: 'Insurance', icon: '📋' },
                    { id: 'dealer', label: 'Dealer', icon: '🏢' },
                  ].map((option) => (
                    <button
                      key={option.id}
                      onClick={() => setReportReason(option.id as any)}
                      className={`relative p-4 rounded-xl border-2 text-left transition-all duration-200 ${reportReason === option.id
                          ? 'border-brand-burgundy bg-brand-cream/40 text-brand-burgundy shadow-sm'
                          : 'border-gray-100 bg-gray-50 text-gray-600 hover:border-gray-200 hover:bg-gray-100'
                        }`}
                    >
                      <span className="text-xl mb-1 block">{option.icon}</span>
                      <span className="font-bold text-sm">{option.label}</span>
                      {reportReason === option.id && (
                        <div className="absolute top-3 right-3 text-brand-burgundy">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:pl-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="sticky top-6 space-y-6"
            >
              {/* Payment Card */}
              <div className="bg-white rounded-2xl shadow-2xl shadow-gray-200/50 border border-gray-100 overflow-hidden">
                <div className="bg-brand-black p-5 text-white">
                  <h3 className="text-lg font-bold">Payment Summary</h3>
                  <p className="text-xs text-gray-400">Review your order details</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center text-sm group cursor-pointer" onClick={() => setDeliveryType(deliveryType === 'standard' ? 'express' : 'standard')}>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Report Type</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wide ${deliveryType === 'standard' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                          {deliveryType}
                        </span>
                      </div>
                      <div className="font-bold text-gray-900">₹{pricing[deliveryType]}</div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">GST (18%)</span>
                      <span className="font-semibold text-gray-900">₹{gst.toFixed(0)}</span>
                    </div>

                    <div className="mt-4 pt-4 border-t border-dashed border-gray-200">
                      <div className="flex justify-between items-end">
                        <div>
                          <p className="text-sm font-semibold text-gray-500">Total Payable</p>
                          <p className="text-sm text-green-600 font-medium">Includes all taxes</p>
                        </div>
                        <div className="text-3xl font-bold text-gray-900">₹{total.toFixed(0)}</div>
                      </div>
                    </div>
                  </div>

                  {isContactConfirmed ? (
                    <form ref={paymentFormRef} className="w-full">
                      {/* Razorpay button will be loaded here dynamically */}
                    </form>
                  ) : (
                    <button
                      disabled={true}
                      className="w-full bg-gradient-to-r from-brand-black to-gray-800 text-white py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:shadow-lg hover:to-black transition-all disabled:opacity-50 disabled:cursor-not-allowed group relative overflow-hidden"
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        Proceed to Payment
                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </span>
                    </button>
                  )}

                  {!isContactConfirmed && (
                    <p className="text-xs text-center text-red-500 mt-3 bg-red-50 py-1 rounded">
                      Please confirm your contact number first
                    </p>
                  )}
                </div>
              </div>

              {/* Trust Markers */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">What you get</h4>
                <ul className="space-y-3">
                  {[
                    "Comprehensive Service History",
                    "Accident & Damage Check",
                    "Odometer Fraud Detection",
                    "Challan & Legal Status"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full mt-5 py-2 text-xs font-bold text-brand-burgundy border border-brand-burgundy/20 rounded-lg hover:bg-brand-burgundy hover:text-white transition-colors">
                  VIEW SAMPLE REPORT
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-400 grayscale opacity-70">
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
                <div className="h-6 w-12 bg-gray-200 rounded"></div>
                <span className="text-xs">100% Secure Payment</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
