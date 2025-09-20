import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import CurvedLoop from "../ui/CurvedLoop";
import yinYangSvg from "../../assets/images/yin-yang.svg";
import Plasma from "../ui/Plasma.jsx";
import Magnet from "../ui/Magnet.jsx";
import RotatingText from "../ui/typography/RotatingText.jsx";
const titles = [
  "Reactjs Developer",
  "Cloud Engineer",
  "AI Engineer",
  "DevOps Developer",
];

const SectionF = () => {
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardRef = useRef(null);

  // Magnetic effect state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Decryption animation for text
  const decryptText = (originalText) => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let iterations = 0;

    if (!isCardHovered) return originalText;

    return originalText
      .split("")
      .map((letter, index) => {
        if (index < iterations) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
  };





  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-black to-[#222121] overflow-hidden">
      {/* Plasma Background Effect */}
      <div className="absolute inset-0 z-0 opacity-70">
        <Plasma
          color="#ffe500"
          speed={1}
          direction="forward"
          scale={1}
          opacity={0.9}
          mouseInteractive={true}
        />
      </div>

      {/* Mobile Layout (< 768px) */}
      <div className="md:hidden relative h-full z-20 text-white">
        {/* Mobile content container */}
        <div className="flex flex-col h-full px-4 sm:px-6">
          
          {/* Top section - Arrow and titles */}
          <div className="flex-1 flex flex-col justify-center items-center text-center space-y-6">
            
            {/* Arrow Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-4"
            >
              <FiArrowDownRight
                strokeWidth={1.5}
                className="text-white text-5xl sm:text-6xl hover:text-amber-300 transition-colors duration-300"
              />
            </motion.div>

            {/* Freelance Text */}
            <motion.h2
              className="text-4xl sm:text-5xl text-white font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Freelance
            </motion.h2>

            {/* RotatingText Component */}
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <RotatingText
                texts={titles}
                className="text-xl sm:text-2xl font-semibold text-gray-300"
              />
            </motion.div>
          </div>

          {/* Bottom section - Work card */}
          <div className="pb-20 flex justify-center">
            <Magnet padding={50} disabled={false} magnetStrength={2}>
              <motion.div
                ref={cardRef}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="bg-[#272727] rounded-full px-6 py-4 w-72 sm:w-80 h-auto flex items-center justify-between cursor-pointer"
                onMouseEnter={() => setIsCardHovered(true)}
                onMouseLeave={() => setIsCardHovered(false)}
              >
                {/* Text Content */}
                <div className="flex flex-col space-y-1">
                  <motion.h3
                    className="text-base font-semibold text-gray-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    {isCardHovered ? decryptText("Check out") : "Check out"}
                  </motion.h3>
                  <motion.h2
                    className="text-lg font-bold text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    {isCardHovered ? decryptText("My Work") : "My Work"}
                  </motion.h2>
                </div>

                {/* Yin Yang Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                  className="flex-shrink-0"
                >
                  <motion.img
                    src={yinYangSvg}
                    alt="Yin Yang"
                    className="w-12 h-12 filter invert"
                    animate={{
                      rotate: isCardHovered ? 360 : 0,
                    }}
                    transition={{
                      duration: 2,
                      ease: "linear",
                      repeat: isCardHovered ? Infinity : 0,
                      repeatType: isCardHovered ? "loop" : undefined,
                    }}
                  />
                </motion.div>
              </motion.div>
            </Magnet>
          </div>
        </div>
      </div>

      {/* Desktop Layout (>= 768px) */}
      <div className="hidden md:block relative h-full">
        
        {/* Left side content */}
        <div className="absolute left-6 lg:left-12 xl:left-20 top-1/2 transform -translate-y-1/2 z-20 text-white">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-start space-y-4 lg:space-y-6"
          >
            {/* Arrow Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mb-6 lg:mb-8"
            >
              <FiArrowDownRight
                strokeWidth={1.5}
                className="text-white text-5xl lg:text-6xl xl:text-7xl hover:text-amber-300 transition-colors duration-300"
              />
            </motion.div>

            {/* Freelance Text */}
            <motion.h2
              className="text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl text-white mb-2 font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              Freelance
            </motion.h2>

            {/* RotatingText Component */}
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <RotatingText
                texts={titles}
                className="text-xl lg:text-2xl xl:text-3xl 2xl:text-4xl font-semibold text-gray-300"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Right side - Work card */}
        <div className="absolute right-6 lg:right-12 xl:right-20 top-1/2 transform -translate-y-1/2 z-20">
          <Magnet padding={50} disabled={false} magnetStrength={3}>
            <motion.div
              ref={cardRef}
              initial={{ opacity: 0, x: 50 }}
              animate={{
                opacity: 1,
                x: mousePosition.x,
                y: mousePosition.y,
              }}
              transition={{
                duration: 0.8,
                delay: 0.8,
                x: { type: "spring", stiffness: 150, damping: 15 },
                y: { type: "spring", stiffness: 150, damping: 15 },
              }}
              className="bg-[#272727] rounded-full px-6 lg:px-8 py-4 lg:py-6 w-72 lg:w-80 xl:w-96 h-auto flex items-center justify-between cursor-pointer"
              onMouseEnter={() => setIsCardHovered(true)}
              onMouseLeave={() => setIsCardHovered(false)}
            >
              {/* Text Content */}
              <div className="flex flex-col space-y-1">
                <motion.h3
                  className="text-base lg:text-lg font-semibold text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                >
                  {isCardHovered ? decryptText("Check out") : "Check out"}
                </motion.h3>
                <motion.h2
                  className="text-lg lg:text-xl xl:text-2xl font-bold text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  {isCardHovered ? decryptText("My Work") : "My Work"}
                </motion.h2>
              </div>

              {/* Yin Yang Icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="flex-shrink-0"
              >
                <motion.img
                  src={yinYangSvg}
                  alt="Yin Yang"
                  className="w-12 h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16 filter invert"
                  animate={{
                    rotate: isCardHovered ? 360 : 0,
                  }}
                  transition={{
                    duration: 2,
                    ease: "linear",
                    repeat: isCardHovered ? Infinity : 0,
                    repeatType: isCardHovered ? "loop" : undefined,
                  }}
                />
              </motion.div>
            </motion.div>
          </Magnet>
        </div>
      </div>

      {/* Curved Loop - Bottom */}
      <div className="flex items-end justify-center absolute bottom-0 left-0 right-0 w-full pb-2 sm:pb-4 z-20">
        <div className="w-full">
          <CurvedLoop
            marqueeText="Kebsi Montassar ✦ Kebsi Montassar ✦ Kebsi Montassar ✦"
            speed={0.8}
            curveAmount={150}
            direction="left"
            interactive={true}
          />
        </div>
      </div>
    </div>
             
  );
};

export default SectionF;
