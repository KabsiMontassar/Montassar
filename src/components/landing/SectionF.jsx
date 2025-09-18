import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import CurvedLoop from "../CurvedLoop";
import yinYangSvg from "../../assets/yin-yang.svg";

const titles = [
  "Reactjs Developer",
  "Cloud Engineer",
  "AI Engineer",
  "DevOps Developer",
];

const SectionF = () => {
  const [index, setIndex] = useState(0);
  const [isCardHovered, setIsCardHovered] = useState(false);
  const cardRef = useRef(null);

  // Magnetic effect state
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Decryption animation for text
  const decryptText = (originalText) => {
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
    let iterations = 0;
    const maxIterations = originalText.length;

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

  // Mouse move handler for magnetic effect
  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const cardCenterX = rect.left + rect.width / 2;
      const cardCenterY = rect.top + rect.height / 2;

      const distanceX = e.clientX - cardCenterX;
      const distanceY = e.clientY - cardCenterY;

      // Apply magnetic effect within 200px radius for better range
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      if (distance < 200) {
        const strength = (200 - distance) / 200;
        setMousePosition({
          x: distanceX * strength * 0.4, // Increased strength
          y: distanceY * strength * 0.4,
        });
        setIsCardHovered(true); // Set hover state when in magnetic range
      } else {
        setMousePosition({ x: 0, y: 0 });
        setIsCardHovered(false); // Remove hover state when out of range
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % titles.length);
    }, 2000); // 2s  per title - longer display time
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-r from-black to-[#222121] overflow-hidden">
      {/* Left side content */}
      <div className="absolute left-30 top-2/5 transform -translate-y-1/2 z-10 text-white">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-start space-y-6"
        >
          {/* Arrow Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-8"
          >
            <FiArrowDownRight
              strokeWidth={1.5}
              className="text-white text-6xl"
            />
          </motion.div>

          {/* Freelance Text */}
          <motion.h2
            className="text-4xl md:text-5xl text-white mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            Freelance
          </motion.h2>

          {/* Animated Job Titles */}
          <motion.div
            className="flex items-center space-x-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <div className="relative overflow-hidden h-12 w-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }} // Faster animation
                  className="absolute w-full text-2xl md:text-3xl font-semibold text-gray-300 flex items-center h-12"
                >
                  {titles[index]}
                  <span className="text-yellow-400">.</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side card */}
      <div className="absolute right-30 top-2/5 transform -translate-y-1/2 z-10">
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, x: 50 }}
          animate={{
            opacity: 1,
            x: 0,
            x: mousePosition.x,
            y: mousePosition.y,
          }}
          transition={{
            duration: 0.8,
            delay: 0.8,
            x: { type: "spring", stiffness: 150, damping: 15 },
            y: { type: "spring", stiffness: 150, damping: 15 },
          }}
          className="bg-[#272727] rounded-full px-8 py-6 w-80 h-30 flex items-center justify-between cursor-pointer"
        >
          {/* Text Content */}
          <div className="flex flex-col space-y-1">
            <motion.h3
              className="text-lg font-semibold text-gray-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {isCardHovered ? decryptText("Check out") : "Check out"}
            </motion.h3>
            <motion.h2
              className="text-xl font-bold text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {isCardHovered ? decryptText("Latest Work") : "Latest Work"}
            </motion.h2>
          </div>

          {/* Yin Yang SVG Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.4 }}
            className="flex-shrink-0"
          >
            <motion.img
              src={yinYangSvg}
              alt="Yin Yang"
              className="w-16 h-16 filter invert"
              animate={{
                rotate: isCardHovered ? [0, 360] : 0,
              }}
              transition={{
                duration: 2,
                ease: "linear",
                repeat: isCardHovered ? Infinity : 0,
                repeatType: "loop",
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Curved Loop at Bottom */}
      <div className="flex items-end justify-center absolute bottom-0 left-0 right-0 w-full pb-4 z-20">
        <div className="w-full">
          <CurvedLoop
            marqueeText="Kebsi Montassar ✦ Creative Developer ✦ Software Engineer ✦"
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
