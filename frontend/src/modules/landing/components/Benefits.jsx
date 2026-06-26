import React from 'react';
import { Home, Sparkles, Zap, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

const benefitsList = [
  {
    icon: <Home size={28} />,
    title: "HOME PICKUP",
    description: "We offer home pickup to serve you better and to your convenience, right from your doorstep.",
    iconBg: "bg-primary/10 text-primary"
  },
  {
    icon: <Sparkles size={28} />,
    title: "BONUSES FOR RIDE",
    description: "When you book us frequently, we give you different bonuses and rewards that put a smile on your face.",
    iconBg: "bg-accent/10 text-accent"
  },
  {
    icon: <Zap size={28} />,
    title: "FAST BOOKING",
    description: "Our booking method is extremely fast and easy. It won't stress you or waste your time.",
    iconBg: "bg-accent/10 text-accent"
  },
  {
    icon: <Navigation size={28} />,
    title: "GPS SEARCHING",
    description: "We use smart GPS searching to ensure accuracy and real-time navigation. No location is out of reach.",
    iconBg: "bg-primary/10 text-primary"
  }
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
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export default function Benefits() {
  return (
    <section className="py-24 px-4 md:px-8 bg-gray-50/50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <motion.div 
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <p className="text-accent font-bold uppercase tracking-wider text-sm mb-3">
            Some Benefits
          </p>
          <h2 className="font-display font-black text-3xl md:text-4xl text-primary mb-4">
            Why Ride With Hellozy?
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            We are committed to providing the safest, fastest, and most convenient transportation services in the region.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefitsList.map((benefit, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -6, 
                boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.05), 0 8px 10px -6px rgb(0 0 0 / 0.05)",
                borderColor: "rgba(0, 0, 0, 0.05)"
              }}
              className="bg-white border border-stone-200/60 p-6 md:p-8 rounded-3xl flex flex-col items-center text-center cursor-pointer transition-colors duration-300"
            >
              <motion.div 
                whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.4 }}
                className={`p-4 rounded-2xl mb-6 ${benefit.iconBg}`}
              >
                {benefit.icon}
              </motion.div>
              <h3 className="font-display font-bold text-lg text-primary mb-3">
                {benefit.title}
              </h3>
              <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
