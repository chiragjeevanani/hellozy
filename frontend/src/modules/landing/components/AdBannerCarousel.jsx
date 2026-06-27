import React, { useState, useEffect } from 'react';
import { getBanners } from '../../registration/utils/registrationStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdBannerCarousel() {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Load active banners
    const loaded = getBanners().filter(b => b.isActive);
    setBanners(loaded);
  }, []);

  useEffect(() => {
    if (banners.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners]);

  if (banners.length === 0) return null;

  const currentBanner = banners[currentIndex];

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + banners.length) % banners.length);
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % banners.length);
  };

  return (
    <section className="py-8 px-4 md:px-8 bg-gray-50/50">
      <div className="max-w-7xl mx-auto">
        {/* Aspect Ratio Container (e.g. 1.91:1 standard banner ratio) */}
        <div className="relative w-full aspect-[16/9] md:aspect-[1.91/1] rounded-2xl md:rounded-[32px] overflow-hidden shadow-lg border border-stone-200/80 bg-stone-950 group">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBanner.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 cursor-pointer"
              onClick={() => {
                if (currentBanner.linkUrl) {
                  window.location.href = currentBanner.linkUrl;
                }
              }}
            >
              {/* Banner Image with object-fill to maintain absolute integrity of pre-designed ads */}
              <img
                src={currentBanner.imageUrl}
                alt={currentBanner.title}
                className="w-full h-full object-fill"
              />
            </motion.div>
          </AnimatePresence>

          {/* Minimalist Navigation Controls */}
          {banners.length > 1 && (
            <>
              <button
                onClick={handlePrev}
                className="absolute left-3 md:left-5 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-stone-900/60 backdrop-blur-md text-white border border-white/10 hover:bg-stone-900/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                aria-label="Previous advertisement"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-3 md:right-5 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-stone-900/60 backdrop-blur-md text-white border border-white/10 hover:bg-stone-900/80 transition-all opacity-0 group-hover:opacity-100 cursor-pointer z-10"
                aria-label="Next advertisement"
              >
                <ArrowRight size={16} />
              </button>
              
              {/* Dot Indicators */}
              <div className="absolute bottom-3 md:bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {banners.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? 'w-4 bg-accent' : 'w-1.5 bg-white/60'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
