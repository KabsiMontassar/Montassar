import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useState, useEffect, useRef } from "react";
import '../../assets/style.css';
import Magnet from "../ui/Magnet";
import Chevrons from "../ui/Chevrons";
// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionS = ({ onButtonHover }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const buttonRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mouse move handler for magnetic effect
  const handleMouseMove = (e) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const buttonCenterX = rect.left + rect.width / 2;
      const buttonCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - buttonCenterX;
      const distanceY = e.clientY - buttonCenterY;

      // Apply magnetic effect within 200px radius
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < 200) {
        const strength = (200 - distance) / 200;
        setMousePosition({
          x: distanceX * strength * 0.4,
          y: distanceY * strength * 0.4,
        });
        setIsButtonHovered(true);
      } else {
        setMousePosition({ x: 0, y: 0 });
        setIsButtonHovered(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (onButtonHover) {
      onButtonHover(isButtonHovered);
    }
  }, [isButtonHovered, onButtonHover]);

  return (
    <div className={`relative w-full min-h-screen overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex items-center ${isButtonHovered ? 'bg-gradient-to-r from-black to-[#222121]' : 'bg-[#f4f4f4]'}`}>
      <div className="relative z-10 w-full flex items-center justify-center text-black py-4 sm:py-6 md:py-8 lg:py-12">
        <div className="text-center w-full max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.h1
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-6 md:mb-8 lg:mb-10 leading-tight max-w-6xl mx-auto px-2 ${isButtonHovered ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            >
              <span >

                Transforming ideas into
                polished  {/* Shuffle */}
                ,
                meaningful  {/* Fuzzy Text */}
                experiences
                <Chevrons />
                where
                design    {/* colourful */}    and
                technology {/* orange rectangle */}
                work in
                harmony.{/* yin yang */}

              </span>
            </motion.h1>
            <Magnet padding={100} disabled={false} magnetStrength={3}>

              <motion.button
                className="mt-6 md:mt-8 lg:mt-10 px-10 sm:px-12 md:px-14 lg:px-16 py-4 sm:py-5 md:py-6 bg-black text-white  font-semibold text-lg sm:text-xl md:text-2xl rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"

              >
                <p>View All Work</p>
              </motion.button>
            </Magnet>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionS;
