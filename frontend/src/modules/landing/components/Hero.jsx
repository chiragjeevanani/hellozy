import React, { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CAROUSEL_IMAGES = [
  '/taxi.png',
  '/pickup.png',
  '/e-rikshaw.png',
  '/ambulance.png'
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 15
    }
  }
};

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3800);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-accent/5 pt-20 pb-24 px-4 md:px-8">
      {/* Decorative background grid/elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column text content */}
        <motion.div 
          className="lg:col-span-7 flex flex-col text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary-light font-semibold text-sm px-4 py-1.5 rounded-full w-fit mb-6"
          >
            <ShieldCheck size={16} className="text-accent" />
            <span>Travel securely with us!</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6"
          >
            Book your taxi from <span className="text-accent">anywhere</span> today!
          </motion.h1>

          <motion.h3 
            variants={itemVariants}
            className="text-xl md:text-2xl font-bold text-gray-800 mb-3"
          >
            Everything your taxi business needs is already here!
          </motion.h3>

          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl"
          >
            Hellozy is made for modern, secure, and reliable ride services. Experience the premium comfort of professional drivers and well-maintained cabs at your fingertips.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary/20 transition-colors w-full sm:w-auto"
              >
                <span>Join Us</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <a 
                href="#login" 
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-xl border border-gray-200 shadow-sm transition-colors w-full sm:w-auto"
              >
                Login
              </a>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right column: Auto-playing Carousel with smooth transitions */}
        <div className="lg:col-span-5 relative flex items-center justify-center z-10 w-full h-[320px] md:h-[450px]">
          <AnimatePresence mode="popLayout">
            {CAROUSEL_IMAGES.map((imgUrl, idx) => {
              const isActive = idx === activeIndex;
              if (!isActive) return null;
              return (
                <motion.img 
                  key={imgUrl}
                  src={imgUrl} 
                  alt="Hellozy Vehicle Partner" 
                  initial={{ opacity: 0, x: 50, scale: 1.15 }}
                  animate={{ opacity: 1, x: -16, scale: 1.45 }}
                  exit={{ opacity: 0, x: -50, scale: 1.15 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-auto object-contain max-h-[500px] drop-shadow-2xl -translate-x-4 lg:-translate-x-16"
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
