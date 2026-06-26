import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

const FAQ_ITEMS = [
  {
    question: "Is registration free on Hellozy?",
    answer: "Yes! Hellozy registration is completely free during our launch phase. You can list your vehicle, register your hospital, or apply as an influencer with zero registration fees."
  },
  {
    question: "How long does document verification take?",
    answer: "Our verification team manually cross-checks all RC papers, Driving Licenses, and Aadhar details. Typically, accounts are approved and listings are activated within 24 to 48 hours."
  },
  {
    question: "What vehicle types can I register?",
    answer: "You can register 4-Wheelers (Hatchback/Sedan/SUV), Pickups/Logistics trucks, Buses, and E-Rickshaws. Each type has tailored verification checklists."
  },
  {
    question: "Why are some details marked Admin Only?",
    answer: "To ensure your privacy. Financial details, Aadhar, engine/chassis numbers, and personal contact numbers are strictly for administrative verification and are never shown publicly to customers."
  },
  {
    question: "How do passenger virtual numbers work?",
    answer: "Instead of showing your real mobile number on public profiles, Hellozy uses virtual phone masking. Customers can call you through our system, keeping your real mobile number hidden."
  },
  {
    question: "Can I register as a driver if I do not own the vehicle?",
    answer: "Yes. When a vehicle owner fills out Step 3, they can select 'No' for owner-driver and register a hired driver's details (Name, DL copy, photo) directly on Step 4."
  }
];

export default function FaqsPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-stone-50">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto w-full text-left">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-display">
            FAQs Help Center
          </span>
          <h1 className="mt-3 text-3xl md:text-4xl font-black tracking-tight text-primary font-display">
            Frequently Asked Questions
          </h1>
          <p className="mt-4 text-stone-600 text-sm md:text-base">
            Got questions about registration, document uploads, or security? We've compiled the answers below.
          </p>
        </motion.div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden shadow-xs hover:shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-stone-850 text-sm md:text-base flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-accent shrink-0" />
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-stone-400 shrink-0 ml-4" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-stone-400 shrink-0 ml-4" />
                  )}
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-stone-600 text-xs md:text-sm leading-relaxed border-t border-stone-50 pl-14">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
