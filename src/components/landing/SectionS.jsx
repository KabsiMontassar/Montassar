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
import { FaArrowRight } from "react-icons/fa6";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionS = ({ onButtonHover, onNavigateToWork }) => {
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
      {/* Responsive padding container - Fixed mobile centering with proper boundaries */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center px-6 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-24">
        <div className="text-center w-full max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-6xl xl:max-w-8xl mx-auto py-4 sm:py-8 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-12"
          >
            {/* Main heading with responsive typography */}
            <motion.div
              className={`font-bold leading-[0.85] sm:leading-[0.9] md:leading-[0.95] lg:leading-[1] max-w-full mx-auto ${isButtonHovered ? 'text-white' : 'text-gray-900'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.0,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              style={{
                fontSize: 'clamp(1.35rem, 4vw, 6rem)',
                wordBreak: 'break-word',
                overflowWrap: 'break-word',
              }}
            >
              {/* Keys component - responsive */}
              <div className="inline-block mb-1 sm:mb-2 md:mb-3">
                <Keys
                  text="Transforming"
                  color={isButtonHovered ? "#ffffff" : "#101828"}
                  fontSize="clamp(1.35rem, 4vw, 6rem)"
                />
              </div>

              {/* Space for mobile readability */}
              <span className="inline-block w-2 sm:w-3"></span>

              {/* ShadowText component - responsive */}
              <div className="inline-block mx-0 sm:mx-1 md:mx-2">
                <ShadowText
                  text="ideas"
                  textColor={isButtonHovered ? "#ffe500" : "#101828"}
                  shadowColor={isButtonHovered ? "#000000" : "#ffe500"}
                  fontSize="clamp(1.35rem, 4vw, 6rem)"
                />
              </div>

              {/* Break for mobile layout optimization */}
              <br className="block sm:block md:hidden" />

              {/* "into" text */}
              <span className="mx-0 sm:mx-1 md:mx-2">into</span>

              {/* Circle with responsive sizing */}
              <span className="inline-block align-middle">
                <Circle />
              </span>


              {/* "polished experiences" */}
              <span className="mx-0 sm:mx-1">polished experiences</span>

              {/* Chevrons with spacing */}
              <span className="inline-block mx-0 sm:mx-1 md:mx-2 align-middle">
                <Chevrons />
              </span>

              {/* Mobile line break */}
              <br className="block sm:block md:hidden" />

              {/* "where" */}
              <span className="mx-0 sm:mx-1">where</span>

              {/* ColourfulText - responsive */}
              <span className="inline-block mx-1 sm:mx-2 md:mx-3">
                <ColourfulText text="design" />
              </span>

              {/* "and technology" */}
              <span className="mx-0 sm:mx-1">and technology</span>

              {/* Technologie component */}
              <span className="inline-block mx-0 sm:mx-1 md:mx-2 align-middle">
                <Technologie />
              </span>

              {/* Mobile line break */}
              <br className="block sm:block md:hidden" />

              {/* "work in harmony" */}
              <span className="mx-0 sm:mx-1">work in harmony</span>

              {/* YinYang with responsive sizing */}
              <span className="inline-block ml-1 sm:ml-2 md:ml-3 align-middle">
                <YinYang
                  src={yinYangSvg}
                  size="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 lg:w-16 lg:h-16"
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
              className="flex justify-center pt-6 sm:pt-8 md:pt-10 lg:pt-1 "
            >
              <div
                className="relative rounded-full"
                style={{
                  filter: 'drop-shadow(0 0 7px rgba(255, 229, 0, 0.6)) drop-shadow(0 0 8px rgba(255, 229, 0, 0.3))',
                }}
              >
                <Magnet padding={80} disabled={false} magnetStrength={2.5}>
                  <motion.button
                    ref={buttonRef}
                    className={`
                    px-6 sm:px-8 md:px-10 lg:px-14 xl:px-18
                    py-3 sm:py-4 md:py-5 lg:py-6
                    text-sm sm:text-base md:text-lg lg:text-xl
                    font-semibold rounded-full
                    transition-all duration-300 ease-out
                    shadow-lg hover:shadow-2xl
                    transform hover:scale-105 active:scale-95
                    ${isButtonHovered
                        ? 'bg-white text-black border-2 border-white'
                        : 'bg-black text-white border-2 border-black hover:bg-white hover:text-black'
                      }
                  `}
                    onClick={onNavigateToWork}
                    onMouseEnter={() => setIsButtonHovered(true)}
                    onMouseLeave={() => setIsButtonHovered(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View All Work 

                    <span >
                      <FaArrowRight strokeWidth={15}
                      className="inline-block align-middle ml-2 "
                       />
                    </span>


                  </motion.button>
                </Magnet>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SectionS;
