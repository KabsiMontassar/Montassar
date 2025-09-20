import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { useState, useEffect, useRef } from "react";
import '../../assets/style.css';
import Magnet from "../ui/Magnet";
import Chevrons from "../ui/shapes/Chevrons";
import YinYang from "../ui/shapes/YinYang";
import yinYangSvg from "../../assets/images/yin-yang.svg";
import ColourfulText from "../ui/typography/colourful-text";
import Technologie from "../ui/shapes/Technologie";
import Keys from "../ui/typography/Keys";
import Circle from "../ui/shapes/Circle";
import ShadowText from "../ui/typography/ShadowText";
import { Shadow } from "@react-three/drei";
// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionS = ({ onButtonHover }) => {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const buttonRef = useRef(null);

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

        setIsButtonHovered(true);
      } else {
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
    <div className={`relative w-full min-h-screen overflow-hidden transition-all duration-500 ${isButtonHovered ? 'bg-gradient-to-r from-black to-[#222121]' : 'bg-[#f4f4f4]'}`}>
      {/* Responsive padding container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 2xl:px-24">
        <div className="text-center w-full max-w-8xl mx-auto py-8 sm:py-12 md:py-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12"
          >
            {/* Main heading with responsive typography */}
            <motion.div
              className={`font-bold leading-[0.9] sm:leading-[0.95] md:leading-[1] lg:leading-[1.05] max-w-7xl mx-auto ${isButtonHovered ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                fontSize: 'clamp(1.75rem, 4.5vw, 6rem)',
              }}
            >
              {/* Keys component - responsive */}
              <div className="inline-block mb-2 sm:mb-3 md:mb-4">
                <Keys 
                  text="Transforming"
                  color={isButtonHovered ? "#ffffff" : "#101828"}
                  fontSize="clamp(1.75rem, 4.5vw, 6rem)"
                />
              </div>

              {/* Break for mobile readability */}
              <br className="block sm:hidden" />

              {/* ShadowText component - responsive */}
              <div className="inline-block mx-1 sm:mx-2 md:mx-3">
                <ShadowText
                  text="ideas"
                  textColor={isButtonHovered ? "#ffffff" : "#101828"}
                  shadowColor={isButtonHovered ? "#000000" : "#ffe500"}
                  fontSize="clamp(1.75rem, 4.5vw, 6rem)"
                />
              </div>

              {/* "into" text */}
              <span className="mx-1 sm:mx-2 md:mx-3">into</span>

              {/* Circle with responsive sizing */}
              <span className="inline-block mx-1 sm:mx-2 md:mx-3 align-middle">
                <Circle />
              </span>

              {/* Break for better mobile layout */}
              <br className="block sm:hidden" />

              {/* "polished experiences" */}
              <span className="mx-1 sm:mx-2">polished experiences</span>

              {/* Chevrons with spacing */}
              <span className="inline-block mx-1 sm:mx-2 md:mx-3 align-middle">
                <Chevrons />
              </span>

              {/* "where" */}
              <span className="mx-1 sm:mx-2">where</span>

              {/* Break for mobile */}
              <br className="block md:hidden" />

              {/* ColourfulText - responsive */}
              <span className="inline-block mx-2 sm:mx-3 md:mx-4">
                <ColourfulText text="design" />
              </span>

              {/* "and technology" */}
              <span className="mx-1 sm:mx-2">and technology</span>

              {/* Technologie component */}
              <span className="inline-block mx-1 sm:mx-2 md:mx-3 align-middle">
                <Technologie />
              </span>

              {/* "work in harmony" */}
              <span className="mx-1 sm:mx-2">work in harmony</span>

              {/* YinYang with responsive sizing */}
              <span className="inline-block ml-2 sm:ml-3 md:ml-4 align-middle">
                <YinYang
                  src={yinYangSvg}
                  size="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 lg:w-18 lg:h-18"
                  style={{ verticalAlign: 'middle' }}
                  filterClass={isButtonHovered ? "invert" : ""}
                />
              </span>
            </motion.div>

            {/* CTA Button - responsive */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex justify-center pt-4 sm:pt-6 md:pt-8 lg:pt-12"
            >
              <Magnet padding={80} disabled={false} magnetStrength={2.5}>
                <motion.button
                  ref={buttonRef}
                  className={`
                    px-8 sm:px-10 md:px-12 lg:px-16 xl:px-20
                    py-4 sm:py-5 md:py-6 lg:py-7
                    text-base sm:text-lg md:text-xl lg:text-2xl
                    font-semibold rounded-full
                    transition-all duration-300 ease-out
                    shadow-lg hover:shadow-2xl
                    transform hover:scale-105 active:scale-95
                    ${isButtonHovered 
                      ? 'bg-white text-black border-2 border-white' 
                      : 'bg-black text-white border-2 border-black hover:bg-white hover:text-black'
                    }
                  `}
                  onMouseEnter={() => setIsButtonHovered(true)}
                  onMouseLeave={() => setIsButtonHovered(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View All Work
                </motion.button>
              </Magnet>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionS;
