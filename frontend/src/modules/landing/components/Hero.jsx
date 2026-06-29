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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
            <span>Secure Mobility & Grand Event Bookings!</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-display font-black text-4xl md:text-5xl lg:text-6xl text-primary leading-tight tracking-tight mb-6"
          >
            Your ride & events — <span className="text-accent">all in one place</span> today!
          </motion.h1>

          <motion.h3 
            variants={itemVariants}
            className="text-xl md:text-2xl font-bold text-gray-800 mb-3"
          >
            Seamless transportation meets seamless event coordination!
          </motion.h3>

          <motion.p 
            variants={itemVariants}
            className="text-gray-600 text-lg leading-relaxed mb-8 max-w-xl"
          >
            Hellozy is designed for modern, secure mobility and premium event coordination. Book top-rated rides instantly or secure your spot, register, and sponsor the region's biggest events.
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
                <span>Find a Ride</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link 
                to="/event-registration" 
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-accent/20 transition-colors w-full sm:w-auto"
              >
                <span>Book an Event</span>
                <ArrowRight size={18} />
              </Link>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center bg-white hover:bg-gray-50 text-gray-800 font-bold py-4 px-8 rounded-xl border border-gray-200 shadow-sm transition-colors w-full sm:w-auto cursor-pointer"
              >
                Login
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Right column: Auto-playing Carousel with smooth transitions */}
        <div className="lg:col-span-5 relative flex items-center justify-center z-10 w-full h-[280px] md:h-[450px]">
          <AnimatePresence mode="popLayout">
            {CAROUSEL_IMAGES.map((imgUrl, idx) => {
              const isActive = idx === activeIndex;
              if (!isActive) return null;
              return (
                <motion.img 
                  key={imgUrl}
                  src={imgUrl} 
                  alt="Hellozy Vehicle Partner" 
                  initial={{ opacity: 0, x: isMobile ? 30 : 50, scale: isMobile ? 0.9 : 1.15 }}
                  animate={{ opacity: 1, x: isMobile ? 0 : 0, scale: isMobile ? 1.0 : 1.45 }}
                  exit={{ opacity: 0, x: isMobile ? -30 : -50, scale: isMobile ? 0.9 : 1.15 }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute w-full h-auto object-contain max-h-[450px] drop-shadow-2xl translate-x-0 lg:translate-x-4"
                />
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
