import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function VehicleHistoryPage() {
  const navigate = useNavigate();
  const [vehicleNumber] = useState('KL03Y1954');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const sampleReportRef = useRef<HTMLDivElement | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="bg-white">
      <section className="bg-brand-cream py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-[1fr_1.2fr] gap-8 md:gap-12 lg:gap-16 items-start">
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
              Service history, RTO info, legal cases and challans all in one detailed report so you can
              buy with complete confidence.
            </p>
            <div className="inline-flex items-center gap-3 bg-white px-5 py-2.5 rounded-full shadow-md border border-gray-100 text-sm font-medium text-brand-black mb-2">
              <span className="text-gray-500 uppercase tracking-wider text-xs font-bold">Starting at</span>
              <span className="text-brand-burgundy font-bold text-lg">₹399/-</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700 pt-4">
              {[
                "OEM verified service history",
                "Accidental & structural damage",
                "Odometer fraud checks",
                "Challan & legal case status"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2.5">
                  <div className="flex-shrink-0 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="h-3 w-3 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white p-6 sm:p-8 lg:p-10 shadow-2xl border border-gray-200 rounded-xl w-full relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-burgundy to-red-600"></div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-brand-black mb-3">Enter Vehicle Details</h2>
              <p className="text-sm text-gray-700 mb-1">
                Registration Number: <span className="font-bold text-brand-burgundy">{vehicleNumber}</span>
              </p>
              <p className="text-sm text-gray-600">Please fill in the vehicle information below to proceed with the report.</p>
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              const manualData = {
                vehicleNo: vehicleNumber,
                Description: formData.get('description') as string,
                CarMake: formData.get('make') as string,
                CarModel: formData.get('model') as string,
                FuelType: formData.get('fuelType') as string,
                RegistrationYear: formData.get('year') as string,
                Owner: formData.get('owner') as string,
              };
              
              navigate('/vehicle-checkout', {
                state: {
                  vehicleNumber: vehicleNumber,
                  vehicleData: manualData,
                  timestamp: new Date().toISOString()
                }
              });
            }} className="space-y-5">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                      Vehicle Description *
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      required
                      placeholder="e.g., MARUTI SUZUKI SWIFT VXI"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy"
                    />
                  </div>
                  <div>
                    <label htmlFor="model" className="block text-sm font-semibold text-gray-700 mb-2">
                      Car Model *
                    </label>
                    <input
                      type="text"
                      id="model"
                      name="model"
                      required
                      placeholder="e.g., SWIFT"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy"
                    />
                  </div>

                  <div>
                    <label htmlFor="year" className="block text-sm font-semibold text-gray-700 mb-2">
                      Registration Year *
                    </label>
                    <input
                      type="text"
                      id="year"
                      name="year"
                      required
                      placeholder="e.g., 2018"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy"
                    />
                  </div>

                  <div>
                    <label htmlFor="fuelType" className="block text-sm font-semibold text-gray-700 mb-2">
                      Fuel Type
                    </label>
                    <select
                      id="fuelType"
                      name="fuelType"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy"
                    >
                      <option value="">Select Fuel Type</option>
                      <option value="PETROL">Petrol</option>
                      <option value="DIESEL">Diesel</option>
                      <option value="CNG">CNG</option>
                      <option value="ELECTRIC">Electric</option>
                      <option value="HYBRID">Hybrid</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="owner" className="block text-sm font-semibold text-gray-700 mb-2">
                      Owner Name
                    </label>
                    <input
                      type="text"
                      id="owner"
                      name="owner"
                      placeholder="e.g., FIRST OWNER"
                      className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-burgundy focus:border-brand-burgundy"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-3">
                <button
                  type="button"
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 text-sm font-bold tracking-wider uppercase hover:bg-gray-300 transition-all duration-300 rounded-md"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-black text-white px-6 py-3 text-sm font-bold tracking-wider uppercase hover:bg-brand-burgundy hover:shadow-lg transition-all duration-300 rounded-md"
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
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

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Odometer fraud check",
                desc: "Detect odometer tampering with OEM verified service history records and inspection readings.",
                icon: (
                  <svg className="w-6 h-6 text-brand-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )
              },
              {
                title: "Accidental history",
                desc: "Uncover past accidents, flood damage, insurance claims and potential structural repairs.",
                icon: (
                  <svg className="w-6 h-6 text-brand-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )
              },
              {
                title: "Legal cases & challans",
                desc: "Check for pending challans, RTO remarks, hypothecation and any legal or criminal cases.",
                icon: (
                  <svg className="w-6 h-6 text-brand-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                  </svg>
                )
              },
              {
                title: "Past service records",
                desc: "View parts replaced, major repairs, repainted panels and periodic maintenance history.",
                icon: (
                  <svg className="w-6 h-6 text-brand-burgundy" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                )
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="group p-6 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="h-12 w-12 rounded-lg bg-brand-cream flex items-center justify-center mb-4 group-hover:bg-brand-burgundy group-hover:text-white transition-colors duration-300">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-black mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-brand-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 grid lg:grid-cols-[1.3fr_minmax(0,1fr)] gap-8 md:gap-12 lg:gap-16 items-start">
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
            className="bg-white p-8 md:p-10 border border-gray-100 shadow-xl rounded-2xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-brand-burgundy/5 rounded-full blur-2xl"></div>
            <h3 className="text-xl font-bold text-brand-black mb-6 relative z-10">How does it work?</h3>
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


      <section ref={sampleReportRef} className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
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

          <div className="grid lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
            <div className="lg:col-span-2">
              <div className="relative space-y-8 pl-6 sm:pl-8 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-brand-burgundy before:to-transparent before:content-['']">
                {[
                  {
                    date: '12 Aug 2024',
                    km: '58,300 km',
                    type: 'Major service',
                    summary: 'Engine oil + all filters replaced, brake pads changed, AC serviced.',
                    color: 'bg-green-500'
                  },
                  {
                    date: '05 Jan 2024',
                    km: '48,900 km',
                    type: 'Periodic service',
                    summary: 'Oil change, wheel alignment & balancing, cabin filter replaced.',
                    color: 'bg-blue-500'
                  },
                  {
                    date: '18 Jun 2023',
                    km: '38,200 km',
                    type: 'Accident repair',
                    summary: 'Front bumper and right fender replaced, repainted at authorized body shop.',
                    color: 'bg-red-500'
                  },
                  {
                    date: '02 Dec 2022',
                    km: '28,000 km',
                    type: 'Minor service',
                    summary: 'Engine oil top-up, basic checks, no major issues reported.',
                    color: 'bg-gray-400'
                  },
                ].map((item) => (
                  <div key={item.date} className="relative group">
                    <div className={`absolute -left-[29px] sm:-left-[37px] top-1.5 h-4 w-4 rounded-full border-2 border-white shadow-sm ${item.color} ring-2 ring-gray-100`} />
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-wrap items-baseline justify-between gap-3 mb-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-white border border-gray-200 text-gray-600">
                          {item.date}
                        </span>
                        <span className="text-xs font-mono font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                          {item.km}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-brand-black mb-1">{item.type}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.summary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-5 text-sm text-gray-700 bg-brand-cream/40 p-6 sm:p-8 border border-brand-burgundy/10 rounded-2xl">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-8 w-8 rounded-full bg-brand-burgundy/10 flex items-center justify-center text-brand-burgundy">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold text-brand-black">Expert Insights</h3>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="leading-relaxed">Consistent services at realistic odometer readings (lower risk of tampering).</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <span className="leading-relaxed">One recorded accident repair on the right front side.</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span className="leading-relaxed">Regular maintenance suggests a relatively well-kept vehicle.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-brand-cream">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12">
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

          <div className="grid md:grid-cols-3 gap-6 text-sm text-gray-700">
            {[
              {
                name: "Amit, Gurgaon",
                text: "The report showed a major accident and insurance total-loss remark. I skipped the car and saved myself from a bad purchase."
              },
              {
                name: "Sana, Mumbai",
                text: "Odometer readings at each service matched perfectly. I felt confident going ahead and negotiated a better price."
              },
              {
                name: "Rohit, Bangalore",
                text: "The history report plus inspection gave me complete clarity. I booked the car the same day."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white p-8 border border-gray-100 shadow-sm rounded-xl relative"
              >
                <div className="absolute top-6 right-6 text-brand-cream/40">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11C14.017 11.5523 13.5693 12 13.017 12H12.017V5H22.017V15C22.017 18.3137 19.3307 21 16.017 21H14.017ZM5.0166 21L5.0166 18C5.0166 16.8954 5.91203 16 7.0166 16H10.0166C10.5689 16 11.0166 15.5523 11.0166 15V9C11.0166 8.44772 10.5689 8 10.0166 8H6.0166C5.46432 8 5.0166 8.44772 5.0166 9V11C5.0166 11.5523 4.56889 12 4.0166 12H3.0166V5H13.0166V15C13.0166 18.3137 10.3303 21 7.0166 21H5.0166Z" />
                  </svg>
                </div>
                <p className="font-bold text-brand-black mb-3 text-base">{testimonial.name}</p>
                <p className="leading-relaxed text-gray-600 relative z-10">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-4xl">
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

          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                q: "What is a vehicle history report?",
                a: "A vehicle history report provides a comprehensive overview of the car's service records, accidents or damages, odometer readings, challans, and other critical events over its lifetime."
              },
              {
                q: "Why is a vehicle history report important?",
                a: "It helps you avoid accidental, flood-affected, or poorly maintained vehicles, and supports better price negotiation with transparent data."
              },
              {
                q: "What information is typically included?",
                a: "Service records, odometer readings, accident and repair history, insurance total-loss or flood remarks (where available), challans, and ownership or hypothecation status depending on data availability."
              },
              {
                q: "Where does the data come from?",
                a: "Data is sourced from OEM service records, insurance and inspection inputs, and government / RTO databases wherever accessible."
              },
              {
                q: "What if a report cannot be generated?",
                a: "In rare cases where complete data is not available, you will be informed and any charges will be handled as per our policy at the time of booking."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-lg overflow-hidden bg-white">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="font-bold text-brand-black text-sm md:text-base">{faq.q}</span>
                  <span className={`transform transition-transform duration-300 ${openFaqIndex === index ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openFaqIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
