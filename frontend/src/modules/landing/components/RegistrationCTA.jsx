import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Car, 
  Truck, 
  Bus, 
  Zap, 
  Building2, 
  Users, 
  ArrowRight 
} from 'lucide-react';

const REGISTRATION_TYPES = [
  {
    id: 'four-wheeler',
    title: '4-Wheeler Owner',
    description: 'Register Hatchback, Sedan, SUV, etc. for commercial/personal operations.',
    icon: Car,
    tag: 'Popular',
    color: 'from-amber-700 to-amber-900',
  },
  {
    id: 'pickup',
    title: 'Pickup Owner',
    description: 'Register loading trucks, pickups, and commercial carriers for logistics.',
    icon: Truck,
    color: 'from-orange-700 to-orange-950',
  },
  {
    id: 'bus',
    title: 'Bus Owner',
    description: 'Register mini-buses, passenger buses, and luxury coaches.',
    icon: Bus,
    color: 'from-yellow-800 to-amber-950',
  },
  {
    id: 'e-rickshaw',
    title: 'E-Rickshaw Owner',
    description: 'Register eco-friendly electric rickshaws for local transit.',
    icon: Zap,
    color: 'from-amber-600 to-amber-800',
  },
  {
    id: 'hospital',
    title: 'Hospital / Clinic',
    description: 'Register medical facilities, emergency services, and ambulance tie-ups.',
    icon: Building2,
    color: 'from-stone-700 to-stone-900',
  },
  {
    id: 'influencer',
    title: 'Brand Influencer',
    description: 'Partner with Hellozy, promote sustainable transit, and earn rewards.',
    icon: Users,
    color: 'from-amber-800 to-orange-900',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { y: 25, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function RegistrationCTA() {
  return (
    <section id="register" className="py-20 bg-stone-50 border-t border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm font-display">
            Partner With Hellozy
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl font-display">
            Join Our Growing Network
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Register today to list your vehicle, partner your hospital/clinic, or join us as a brand influencer. Registration is completely free for a limited time!
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {REGISTRATION_TYPES.map((type) => {
            const Icon = type.icon;
            return (
              <motion.div 
                key={type.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.08), 0 8px 10px -6px rgb(0 0 0 / 0.08)",
                  borderColor: "rgba(232, 93, 4, 0.3)"
                }}
                className="bg-white rounded-2xl border border-stone-250/70 shadow-xs flex flex-col justify-between overflow-hidden group cursor-pointer transition-colors duration-300"
              >
                <div className="p-8">
                  {/* Icon Block with subtle pop on card hover */}
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${type.color} text-white mb-6`}
                  >
                    <Icon className="h-6 w-6" />
                  </motion.div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <h3 className="text-xl font-bold text-stone-900 font-display">
                      {type.title}
                    </h3>
                    {type.tag && (
                      <span className="bg-accent/15 text-accent text-xs font-semibold px-2.5 py-0.5 rounded-full">
                        {type.tag}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {type.description}
                  </p>
                </div>

                <div className="px-8 pb-8 pt-0">
                  <Link
                    to={`/register?type=${type.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:text-accent-hover transition-colors group/link"
                  >
                    Register Now
                    <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
