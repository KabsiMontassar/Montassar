import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { FiArrowDownRight } from "react-icons/fi";
import CurvedLoop from "../CurvedLoop";
import yinYangSvg from "../../assets/yin-yang.svg";
import Plasma from "../Plasma";

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

  // Auto-cycle through job titles
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % titles.length;
        return newIndex;
      });
    }, 2000); // Change every 2 seconds

    return () => clearInterval(interval);
  }, []);

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

  const handleCardMouseMove = (e) => {
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    setMousePosition({ x: 0, y: 0 });
    setIsCardHovered(false);
  };

  const handleMouseEnter = () => {
    setIsCardHovered(true);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-r from-black to-[#222121] overflow-hidden mobile-section-f">
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

      {/* Left side content */}
      <div className="absolute left-8 md:left-30 top-1/2 md:top-2/5 transform -translate-y-1/2 z-20 text-white left-content">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-start space-y-4 md:space-y-6"
          style={{ zIndex: 20, position: "relative" }}
        >
          {/* Arrow Icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mb-4 md:mb-8"
          >
            <FiArrowDownRight
              strokeWidth={1.5}
              className={`text-white text-4xl md:text-6xl arrow-icon
               hover:text-amber-300 transition-colors duration-300
              `}
            />
          </motion.div>

          {/* Freelance Text */}
          <motion.h2
            className="text-3xl md:text-4xl lg:text-6xl text-white mb-2 freelance-text"
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
            <div className="relative overflow-hidden h-8 md:h-12 w-full max-w-full job-titles">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="absolute w-full text-lg md:text-2xl lg:text-3xl font-semibold text-gray-300 flex items-center h-8 md:h-12 text-content z-20"
                  style={{
                    visibility: "visible",
                    display: "flex",
                    position: "relative",
                    zIndex: 20,
                  }}
                >
                  <span className="truncate pr-1 text-gray-300">
                    {titles[index]}
                  </span>
                  <span className="text-yellow-400 flex-shrink-0">.</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Right side card */}
      <div className="absolute right-8 md:right-30 bottom-20 md:top-2/5 md:bottom-auto transform z-10 w-full md:w-auto right-content">
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
          className="bg-[#272727] rounded-full px-6 md:px-8 py-4 md:py-6 w-full md:w-80 h-auto md:h-30 flex items-center justify-between cursor-pointer work-card"
        >
          {/* Text Content */}
          <div className="flex flex-col space-y-1">
            <motion.h3
              className="text-base md:text-lg font-semibold text-gray-300 work-card-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              {isCardHovered ? decryptText("Check out") : "Check out"}
            </motion.h3>
            <motion.h2
              className="text-lg md:text-xl font-bold text-white work-card-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              {isCardHovered ? decryptText("My Work") : "My Work"}
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
              className="w-12 h-12 md:w-16 md:h-16 filter invert yin-yang-icon"
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
