import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface LocationState {
  vehicleNumber: string;
  vehicleData: any;
  timestamp?: string;
}

export default function VehicleCheckoutPage() {
  const location = useLocation();
  
  // Sample test data for development/testing
  const sampleVehicleData = {
    vehicleNo: 'KL03Y1954',
    Description: 'MARUTI SWIFT DZIRE VXI, (1197CC)',
    CarMake: 'MARUTI',
    CarModel: 'SWIFT DZIRE VXI, (1197CC)',
    Variant: 'N/A',
    EngineSize: '1197',
    FuelType: 'N/A',
    VehicleType: 'N/A',
    RegistrationYear: '2014',
    RegistrationDate: '16/08/2014',
    RCNO: 'N/A',
    Owner: 'RAJKUMAR',
    Fitness: 'N/A',
    Insurance: '01/01/0001',
  };

  const state = location.state as LocationState | null;
  
  // Use sample data if no state is provided (for testing)
  const testState: LocationState = state || {
    vehicleNumber: 'KL03Y1954',
    vehicleData: sampleVehicleData,
    timestamp: new Date().toISOString(),
  };

  const [contactNumber, setContactNumber] = useState('');
  const [isContactConfirmed, setIsContactConfirmed] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'standard' | 'express'>('standard');
  const [reportReason, setReportReason] = useState<'buy' | 'sell' | 'insurance' | 'dealer'>('buy');
  const [vehicleDescription, setVehicleDescription] = useState('Vehicle Details');

  useEffect(() => {
    // Parse vehicle description from vehicleData
    if (testState.vehicleData) {
      try {
        let details: any = {};
        if (testState.vehicleData.vehicleJson) {
          details = JSON.parse(testState.vehicleData.vehicleJson);
        } else {
          details = testState.vehicleData;
        }
        const description = details.Description || details.VehicleData?.[0]?.Description || 'Vehicle Details';
        setVehicleDescription(description);
      } catch (e) {
        console.error('Failed to parse vehicle data:', e);
      }
    }
  }, [testState]);

  const pricing = {
    standard: 199,
    express: 299,
  };

  const gst = (pricing[deliveryType] * 0.18);
  const total = pricing[deliveryType] + gst;

  const handleConfirmContact = () => {
    if (contactNumber.length === 10) {
      setIsContactConfirmed(true);
    }
  };

  const handleProceedToPayment = () => {
    // Here you would integrate with payment gateway
    alert('Proceeding to payment gateway...');
  };

  // Helper function to extract nested CurrentTextValue
  const getValue = (field: any): string => {
    if (!field) return 'N/A';
    if (typeof field === 'string') return field || 'N/A';
    if (typeof field === 'object' && field.CurrentTextValue !== undefined) {
      return field.CurrentTextValue || 'N/A';
    }
    return 'N/A';
  };

  // Parse vehicle data for display
  const getVehicleDetails = () => {
    if (!testState?.vehicleData) return null;
    
    const rawData: any = testState.vehicleData || {};
    let details: any = {};
    
    if (rawData.vehicleJson) {
      try {
        details = JSON.parse(rawData.vehicleJson);
      } catch (e) {
        console.error('Failed to parse vehicleJson:', e);
        details = rawData;
      }
    } else {
      details = rawData;
    }
    
    const primaryData = details.VehicleData?.[0] || rawData.vehicleData || {};
    return { details, primaryData };
  };

  const vehicleDetails = getVehicleDetails();

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form Steps */}
          <div className="lg:col-span-2 space-y-6">
            {/* Step 1: Vehicle Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-300 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-900">Vehicle Details</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Registration</p>
                  <div className="flex items-center justify-between">
                    <p className="text-2xl font-bold text-gray-900">{getValue(vehicleDetails?.details.Description) || vehicleDescription}</p>
                    <button className="bg-blue-600 text-white px-6 py-2 text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                      EDIT
                    </button>
                  </div>
                </div>

                {vehicleDetails && (
                  <div className="grid grid-cols-3 gap-6 pt-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Make</p>
                      <p className="text-base font-semibold text-gray-900">{getValue(vehicleDetails.details.CarMake)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Registration Year</p>
                      <p className="text-base font-semibold text-gray-900">{getValue(vehicleDetails.details.RegistrationYear)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">RC Number</p>
                      <p className="text-base font-semibold text-gray-900">{getValue(vehicleDetails.details.RCNO)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Owner Name</p>
                      <p className="text-base font-semibold text-gray-900">{getValue(vehicleDetails.details.Owner)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Insurance</p>
                      <p className="text-base font-semibold text-gray-900">{getValue(vehicleDetails.details.Insurance)}</p>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Step 2: Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white border border-gray-300 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-900">Contact Details</h2>
              </div>
              
              <div>
                <div className="flex gap-3">
                  <input
                    type="tel"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    placeholder="Enter contact number"
                    disabled={isContactConfirmed}
                    className="flex-1 border border-gray-300 px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                  {!isContactConfirmed && (
                    <button
                      onClick={handleConfirmContact}
                      disabled={contactNumber.length !== 10}
                      className="bg-gray-400 text-white px-8 py-3 font-semibold hover:bg-gray-500 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Confirm
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Step 3: Choose Delivery Type */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-300 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-900">Choose Delivery Type</h2>
              </div>
              
              <div className="space-y-4">
                {/* Standard Delivery */}
                <div
                  onClick={() => setDeliveryType('standard')}
                  className={`border-2 p-5 cursor-pointer transition-all ${
                    deliveryType === 'standard'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-6 w-6 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      deliveryType === 'standard' ? 'border-blue-600' : 'border-gray-400'
                    }`}>
                      {deliveryType === 'standard' && (
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Whatsapp Method</h3>
                    </div>
                  </div>
                </div>

                {/* Express Delivery */}
                <div
                  onClick={() => setDeliveryType('express')}
                  className={`border-2 p-5 cursor-pointer transition-all ${
                    deliveryType === 'express'
                      ? 'border-blue-600 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`h-6 w-6 rounded-full border-2 mt-0.5 flex items-center justify-center ${
                      deliveryType === 'express' ? 'border-blue-600' : 'border-gray-400'
                    }`}>
                      {deliveryType === 'express' && (
                        <div className="h-3 w-3 rounded-full bg-blue-600"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900 text-lg">Mail Method</h3>
                    </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Step 4: Why do you need this report? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white border border-gray-300 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                  4
                </div>
                <h2 className="text-xl font-bold text-gray-900">Why do you need this report?</h2>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'buy', label: 'Planning to buy' },
                  { id: 'sell', label: 'Selling my car' },
                  { id: 'insurance', label: 'Insurance claim' },
                  { id: 'dealer', label: 'I am a dealer' },
                ].map((option) => (
                  <button
                    key={option.id}
                    onClick={() => setReportReason(option.id as any)}
                    className={`border-2 p-4 text-base font-medium transition-all ${
                      reportReason === option.id
                        ? 'border-blue-600 bg-blue-50 text-blue-700'
                        : 'border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Payment Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white border border-gray-300 p-6 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">Standard Report</span>
                  <span className="font-semibold text-gray-900">₹ {pricing[deliveryType]}</span>
                </div>
                <div className="flex justify-between text-base">
                  <span className="text-gray-700">GST (18%)</span>
                  <span className="font-semibold text-gray-900">₹ {gst.toFixed(0)}</span>
                </div>
                <div className="border-t-2 border-gray-300 pt-4 flex justify-between">
                  <span className="font-bold text-gray-900 text-lg">Total Payable Amount</span>
                  <span className="font-bold text-gray-900 text-xl">₹ {total.toFixed(0)}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToPayment}
                disabled={!isContactConfirmed}
                className="w-full bg-gray-500 text-white py-4 text-lg font-semibold hover:bg-gray-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-8"
              >
                Proceed to Payment
              </button>

              <div className="border-t-2 border-gray-300 pt-6">
                <h4 className="font-bold text-gray-900 mb-5 text-lg">What to expect in the report</h4>
                <ul className="space-y-3 text-base text-gray-800">
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gray-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Maintenance Records</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gray-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>Accident history</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gray-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span>Odometer Re-adings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="h-5 w-5 text-gray-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Vehicle Details</span>
                  </li>
                </ul>

                <button className="w-full mt-6 border-2 border-gray-300 text-gray-800 py-3 text-base font-semibold hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m0 0l-4-4m4 4l4-4" />
                  </svg>
                  View sample report
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
