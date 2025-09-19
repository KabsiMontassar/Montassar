import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useState, useEffect } from "react";
import '../../assets/style.css';

// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionS = () => {
  const [isAutoHovering, setIsAutoHovering] = useState(false);
  const [cloudPosition, setCloudPosition] = useState('center'); // 'left', 'center', 'right'

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAutoHovering(true);
      setTimeout(() => setIsAutoHovering(false), 1000); // Auto-hover lasts 1 second
    }, 3000); // Every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Cloud sliding animation
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCloudPosition(prev => {
        if (prev === 'center') return 'right';
        if (prev === 'right') return 'left';
        if (prev === 'left') return 'center';
        return 'center';
      });
    }, 1500); // Every 1.5 seconds

    return () => clearInterval(slideInterval);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#f4f4f4] overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center">
      <div className="relative z-10 w-full flex items-center justify-center text-black py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="text-center w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 md:mb-8 lg:mb-10 leading-tight max-w-6xl mx-auto text-gray-900 px-2"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <span >

                Transforming ideas into polished, meaningful experiences where design and technology work in harmony.

              </span>
            </motion.h1>

            <motion.button
              className="mt-6 md:mt-8 lg:mt-10 px-10 sm:px-12 md:px-14 lg:px-16 py-4 sm:py-5 md:py-6 bg-black text-white font-semibold text-lg sm:text-xl md:text-2xl rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View all Work
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionS;
