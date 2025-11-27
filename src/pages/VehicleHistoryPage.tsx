import { useState, useRef, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface VehicleHistoryResponse {
  success: boolean;
  data?: {
    vehicleNumber: string;
    rawData: any;
    timestamp: string;
  };
  error?: string;
  details?: string;
}

interface VehicleDetails {
  vehicleNo?: string;
  Description?: string;
  RegistrationYear?: string;
  CarMake?: string;
  CarModel?: string;
  Variant?: string;
  EngineSize?: string;
  ModelDescription?: string;
  CurrentTestValue?: string;
  CurrentTestDate?: string;
  FuelType?: string;
  RegistrationDate?: string;
  Owner?: string;
  Fitness?: string;
  Insurance?: string;
  RCNO?: string;
  VehicleType?: string;
  ImageUrl?: string;
  VehicleData?: Array<{
    Description?: string;
    RegisteredOwner?: string;
    CurrentTestValue?: string;
    CarModel?: string;
  }>;
}

export default function VehicleHistoryPage() {
  const navigate = useNavigate();
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [vehicleData, setVehicleData] = useState<VehicleHistoryResponse | null>(null);
  const sampleReportRef = useRef<HTMLDivElement | null>(null);
  const resultsRef = useRef<HTMLDivElement | null>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    if (!vehicleNumber.trim()) {
      setError('Please enter a vehicle registration number');
      return;
    }

    setLoading(true);
    setError(null);
    setVehicleData(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      const response = await fetch(`${apiUrl}/api/vehicle-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ vehicleNumber: vehicleNumber.trim() }),
      });

      const data: VehicleHistoryResponse = await response.json();

      if (data.success) {
        setVehicleData(data);
        setError(null);
        // Scroll to results after a short delay
        setTimeout(() => {
          if (resultsRef.current) {
            resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      } else {
        setError(data.error || 'Failed to fetch vehicle history');
        setVehicleData(null);
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Vehicle history fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewSampleReport = () => {
    if (sampleReportRef.current) {
      sampleReportRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-brand-cream py-24">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">
              Vehicle History Report
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-brand-black tracking-tight leading-tight">
              Check any car's history in minutes
            </h1>
            <p className="text-lg text-gray-600 max-w-xl leading-relaxed">
              Service history, RTO info, legal cases and challans  all in one detailed report so you can
              buy with complete confidence.
            </p>
            <div className="inline-flex items-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-brand-black">
              <span className="text-gray-600">Starting at</span>
              <span className="text-brand-burgundy font-bold text-base">₹399/-</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-700 pt-4">
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                <span>OEM verified service history (where available)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                <span>Accidental and structural damage flags</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                <span>Odometer fraud and tampering checks</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                <span>Challan, legal case and total loss indicators</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-8 md:p-10 shadow-xl border border-gray-100 max-w-md w-full ml-auto"
          >
            <h2 className="text-2xl font-bold text-brand-black mb-4">Enter vehicle number</h2>
            <p className="text-sm text-gray-600 mb-6">
              Enter the registration number exactly as on the RC to fetch accurate history records.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="vehicleNumber" className="text-xs font-semibold tracking-wide uppercase text-gray-600">
                  Vehicle registration number
                </label>
                <input
                  id="vehicleNumber"
                  type="text"
                  value={vehicleNumber}
                  onChange={(event) => setVehicleNumber(event.target.value.toUpperCase())}
                  placeholder="e.g., DL01AB1234"
                  disabled={loading}
                  className="w-full border border-gray-300 px-4 py-3 text-sm tracking-[0.2em] uppercase focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 text-sm">
                  <p className="font-semibold mb-1">Error</p>
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-black text-white px-6 py-3 text-sm font-semibold tracking-wider uppercase hover:bg-brand-burgundy transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Fetching Report...
                  </>
                ) : (
                  'Get History Report'
                )}
              </button>
            </form>
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-gray-500">
              <button
                type="button"
                onClick={handleViewSampleReport}
                className="text-brand-burgundy font-semibold hover:underline text-xs text-left"
              >
                View sample report
              </button>
              <p>Secure online payment. Report delivered within 15 hours.</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-14 max-w-3xl"
          >
            <p className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">What's included</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-3 mb-4 tracking-tight">
              Our vehicle history report covers every hidden detail
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Get a complete picture of the car's past so you can avoid accidental, flood-affected, or abused
              vehicles and negotiate confidently.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="border border-gray-200 p-6 bg-brand-cream/60"
            >
              <h3 className="text-lg font-bold text-brand-black mb-2">Odometer fraud check</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Detect odometer tampering with OEM verified service history records and inspection readings.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="border border-gray-200 p-6 bg-brand-cream/60"
            >
              <h3 className="text-lg font-bold text-brand-black mb-2">Accidental history</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Uncover past accidents, flood damage, insurance claims and potential structural repairs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="border border-gray-200 p-6 bg-brand-cream/60"
            >
              <h3 className="text-lg font-bold text-brand-black mb-2">Legal cases & challans</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Check for pending challans, RTO remarks, hypothecation and any legal or criminal cases.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="border border-gray-200 p-6 bg-brand-cream/60"
            >
              <h3 className="text-lg font-bold text-brand-black mb-2">Past service records</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                View parts replaced, major repairs, repainted panels and periodic maintenance history.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12 grid lg:grid-cols-[1.3fr_minmax(0,1fr)] gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase mb-3">
              Avoid risks
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mb-5 tracking-tight">
              Avoid the hidden risks in the used car market
            </h2>
            <p className="text-sm md:text-base text-gray-700 mb-4 leading-relaxed">
              Without proper history, you risk buying a car with rolled-back odometer, repeated accident repairs,
              or unresolved finance and legal issues. Our history report surfaces these red flags upfront.
            </p>
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">
              Use it alongside our on-ground inspection to get a 360° view of the cars health before you commit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 md:p-8 border border-gray-200"
          >
            <h3 className="text-lg font-bold text-brand-black mb-4">How does it work?</h3>
            <ol className="space-y-4 text-sm text-gray-700">
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-burgundy text-xs font-semibold text-white">
                  1
                </span>
                <div>
                  <p className="font-semibold text-brand-black">Enter details</p>
                  <p>Share your vehicle registration number and basic contact details.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-burgundy text-xs font-semibold text-white">
                  2
                </span>
                <div>
                  <p className="font-semibold text-brand-black">Online payment</p>
                  <p>Pay securely through our partner payment gateway.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-brand-burgundy text-xs font-semibold text-white">
                  3
                </span>
                <div>
                  <p className="font-semibold text-brand-black">Get report</p>
                  <p>Receive your detailed vehicle history report within 15 hours.</p>
                </div>
              </li>
            </ol>
          </motion.div>
        </div>
      </section>

      {/* Success Message - Auto redirect to checkout */}
      {vehicleData && vehicleData.success && vehicleData.data && (
        <section ref={resultsRef} className="py-24 bg-gradient-to-b from-green-50 to-white">
          <div className="container mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl mx-auto text-center"
              onAnimationComplete={() => {
                // Auto-navigate to checkout after animation
                setTimeout(() => {
                  if (vehicleData?.data) {
                    navigate('/vehicle-checkout', {
                      state: {
                        vehicleNumber: vehicleData.data.vehicleNumber,
                        vehicleData: vehicleData.data.rawData,
                        timestamp: vehicleData.data.timestamp
                      }
                    });
                  }
                }, 1500);
              }}
            >
              <div className="bg-white border-2 border-green-500 shadow-xl p-8 md:p-12">
                <div className="flex flex-col items-center gap-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center">
                    <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-brand-black mb-2">Vehicle Found!</h2>
                    <p className="text-sm text-gray-600">Registration: {vehicleData.data.vehicleNumber}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <p className="text-gray-700 mb-4">
                    We've successfully retrieved the vehicle history report. Redirecting you to view the complete details...
                  </p>
                  <div className="flex items-center justify-center gap-2 text-brand-burgundy">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="font-semibold">Loading report...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}


      <section ref={sampleReportRef} className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl"
          >
            <p className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">Sample report</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-3 mb-4 tracking-tight">
              Service history timeline preview
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Heres how a typical service history section looks. Your actual report will include many more
              checkpoints and data points.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="space-y-6 border-l-2 border-dashed border-brand-burgundy pl-6">
                {[
                  {
                    date: '12 Aug 2024',
                    km: '58,300 km',
                    type: 'Major service',
                    summary: 'Engine oil + all filters replaced, brake pads changed, AC serviced.',
                  },
                  {
                    date: '05 Jan 2024',
                    km: '48,900 km',
                    type: 'Periodic service',
                    summary: 'Oil change, wheel alignment & balancing, cabin filter replaced.',
                  },
                  {
                    date: '18 Jun 2023',
                    km: '38,200 km',
                    type: 'Accident repair',
                    summary: 'Front bumper and right fender replaced, repainted at authorized body shop.',
                  },
                  {
                    date: '02 Dec 2022',
                    km: '28,000 km',
                    type: 'Minor service',
                    summary: 'Engine oil top-up, basic checks, no major issues reported.',
                  },
                ].map((item, index) => (
                  <div key={item.date} className="relative pl-4">
                    <div className="absolute -left-[29px] top-1 h-4 w-4 rounded-full border-2 border-brand-burgundy bg-white" />
                    <div className="flex flex-wrap items-baseline justify-between gap-3 mb-1">
                      <p className="text-xs font-semibold tracking-wide uppercase text-gray-500">{item.date}</p>
                      <p className="text-xs font-medium text-gray-500">Odometer: {item.km}</p>
                    </div>
                    <p className="text-sm font-semibold text-brand-black mb-1">{item.type}</p>
                    <p className="text-sm text-gray-600 mb-1">{item.summary}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4 text-sm text-gray-700 bg-brand-cream/70 p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-brand-black mb-2">What you can infer</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                  <span>Consistent services at realistic odometer readings (lower risk of tampering).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                  <span>One recorded accident repair on the right front side.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 inline-block h-1.5 w-1.5 rounded-full bg-brand-burgundy" />
                  <span>Regular maintenance suggests a relatively well-kept vehicle.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-brand-cream">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10 max-w-3xl"
          >
            <p className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">
              Our happy customers
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-3 mb-4 tracking-tight">
              Helping buyers avoid costly mistakes
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Buyers use the history report along with our inspection to negotiate better and walk away from
              risky deals.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 text-sm text-gray-700">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-white p-6 border border-gray-200"
            >
              <p className="font-semibold text-brand-black mb-2">Amit, Gurgaon</p>
              <p>
                The report showed a major accident and insurance total-loss remark. I skipped the car and saved
                myself from a bad purchase.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="bg-white p-6 border border-gray-200"
            >
              <p className="font-semibold text-brand-black mb-2">Sana, Mumbai</p>
              <p>
                Odometer readings at each service matched perfectly. I felt confident going ahead and negotiated a
                better price.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-white p-6 border border-gray-200"
            >
              <p className="font-semibold text-brand-black mb-2">Rohit, Bangalore</p>
              <p>
                The history report plus inspection gave me complete clarity. I booked the car the same day.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <p className="text-brand-burgundy text-sm font-semibold tracking-[0.2em] uppercase">
              Frequently asked questions
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-black mt-3 mb-4 tracking-tight">
              Vehicle history report FAQs
            </h2>
          </motion.div>

          <div className="space-y-6 text-sm text-gray-700">
            <div className="border border-gray-200 p-5">
              <p className="font-semibold text-brand-black mb-2">What is a vehicle history report?</p>
              <p>
                A vehicle history report provides a comprehensive overview of the car's service records, accidents
                or damages, odometer readings, challans, and other critical events over its lifetime.
              </p>
            </div>
            <div className="border border-gray-200 p-5">
              <p className="font-semibold text-brand-black mb-2">Why is a vehicle history report important?</p>
              <p>
                It helps you avoid accidental, flood-affected, or poorly maintained vehicles, and supports better
                price negotiation with transparent data.
              </p>
            </div>
            <div className="border border-gray-200 p-5">
              <p className="font-semibold text-brand-black mb-2">What information is typically included?</p>
              <p>
                Service records, odometer readings, accident and repair history, insurance total-loss or flood
                remarks (where available), challans, and ownership or hypothecation status depending on data
                availability.
              </p>
            </div>
            <div className="border border-gray-200 p-5">
              <p className="font-semibold text-brand-black mb-2">Where does the data come from?</p>
              <p>
                Data is sourced from OEM service records, insurance and inspection inputs, and government / RTO
                databases wherever accessible.
              </p>
            </div>
            <div className="border border-gray-200 p-5">
              <p className="font-semibold text-brand-black mb-2">What if a report cannot be generated?</p>
              <p>
                In rare cases where complete data is not available, you will be informed and any charges will be
                handled as per our policy at the time of booking.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
