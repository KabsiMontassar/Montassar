import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Enhanced Section Components with distinct backgrounds
const Section1 = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-24 h-24 bg-blue-500/20 rounded-full blur-lg"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.4, 0.2, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
    </div>

    <div className="absolute inset-0 bg-black" />
    <div className="relative z-10 h-full flex items-center justify-center text-white">
      <div className="text-center max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-wider bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Welcome to Innovation
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Experience the future of web design with our cutting-edge parallax
            effects and seamless animations
          </motion.p>
        </motion.div>
      </div>
    </div>
  </div>
);

const Section2 = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 overflow-hidden">
    {/* Animated geometric shapes */}
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-16 right-32 w-16 h-16 border-2 border-orange-400/30 rotate-45"
        animate={{
          rotate: [45, 135, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-24 left-24 w-12 h-12 bg-red-400/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-yellow-400/20 rotate-12"
        animate={{
          rotate: [12, 72, 12],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>

    <div className="absolute inset-0 bg-black/30" />
    <div className="relative z-10 h-full flex items-center justify-center text-white">
      <div className="text-center max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-wider bg-gradient-to-r from-orange-200 via-red-200 to-yellow-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Creative Solutions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            We blend technology and creativity to deliver exceptional digital
            experiences that captivate and inspire
          </motion.p>
        </motion.div>
      </div>
    </div>
  </div>
);

const Section3 = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-green-900 via-blue-900 to-indigo-900 overflow-hidden">
    {/* Animated particles */}
    <div className="absolute inset-0">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 rounded-full"
          style={{
            background:
              i % 2 === 0
                ? "rgba(34, 197, 94, 0.4)"
                : "rgba(59, 130, 246, 0.4)",
            left: `${15 + i * 10}%`,
            top: `${20 + (i % 3) * 25}%`,
          }}
          animate={{
            y: [0, -25, 0],
            x: [0, Math.sin(i) * 10, 0],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
      <motion.div
        className="absolute top-1/4 right-1/4 w-28 h-28 border border-green-400/20 rounded-full"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 180, 360],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>

    <div className="absolute inset-0 bg-black/30" />
    <div className="relative z-10 h-full flex items-center justify-center text-white">
      <div className="text-center max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: 45 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-wider bg-gradient-to-r from-green-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, rotateX: 45 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Let's Build Together
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Ready to transform your vision into reality? Let's create something
            extraordinary together
          </motion.p>
          <motion.button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  </div>
);

const sections = [Section1, Section2, Section3];

// Circular Animation Divider Component
const CircularDivider = ({ isVisible, direction }) => (
  <AnimatePresence>
    {isVisible && (
      <motion.div
        className="fixed inset-0 z-40 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer rotating ring */}
          <motion.div
            className="w-32 h-32 border-4 border-white/20 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Middle pulsing ring */}
          <motion.div
            className="absolute w-24 h-24 border-2 border-white/40 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Inner spinning elements */}
          <motion.div
            className="absolute w-16 h-16"
            animate={{ rotate: -360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full border-2 border-white/60 rounded-full border-dashed" />
          </motion.div>

          {/* Center dot */}
          <motion.div
            className="absolute w-3 h-3 bg-white rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Directional arrows */}
          <motion.div
            className="absolute text-white/80 text-2xl"
            animate={{
              y: direction === "down" ? [0, 10, 0] : [0, -10, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {direction === "down" ? "↓" : "↑"}
          </motion.div>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const ParallaxLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDivider, setShowDivider] = useState(false);
  const [dividerDirection, setDividerDirection] = useState("down");
  const containerRef = useRef(null);

  // Configuration
  const scrollSensitivity = 30;
  const slideDuration = 800; // Smoother transition
  const dividerDuration = 600;
  const totalSlides = sections.length;

  // Handle wheel/scroll events (no looping)
  const handleScroll = useCallback(
    (event) => {
      if (isTransitioning) return;

      event.preventDefault();

      let delta = 0;

      // Cross-browser delta calculation
      if (event.deltaY) {
        delta = -event.deltaY;
      } else if (event.wheelDelta) {
        delta = event.wheelDelta;
      } else if (event.detail) {
        delta = event.detail * -120;
      }

      // Check scroll direction and sensitivity
      if (Math.abs(delta) < scrollSensitivity) return;

      setIsTransitioning(true);

      if (delta < 0) {
        // Scroll down - go to next slide (no looping)
        if (currentSlide < totalSlides - 1) {
          setDividerDirection("down");
          setShowDivider(true);
          setTimeout(() => {
            setCurrentSlide((prev) => prev + 1);
            setShowDivider(false);
          }, dividerDuration);
        }
      } else {
        // Scroll up - go to previous slide (no looping)
        if (currentSlide > 0) {
          setDividerDirection("up");
          setShowDivider(true);
          setTimeout(() => {
            setCurrentSlide((prev) => prev - 1);
            setShowDivider(false);
          }, dividerDuration);
        }
      }

      // Reset transition lock after slide duration
      setTimeout(() => {
        setIsTransitioning(false);
      }, slideDuration + dividerDuration);
    },
    [
      isTransitioning,
      currentSlide,
      totalSlides,
      scrollSensitivity,
      slideDuration,
      dividerDuration,
    ]
  );

  // Add event listeners
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Prevent default scrolling
    const preventScroll = (e) => e.preventDefault();

    container.addEventListener("wheel", handleScroll, { passive: false });
    container.addEventListener("DOMMouseScroll", handleScroll, {
      passive: false,
    });
    document.body.addEventListener("touchmove", preventScroll, {
      passive: false,
    });

    return () => {
      container.removeEventListener("wheel", handleScroll);
      container.removeEventListener("DOMMouseScroll", handleScroll);
      document.body.removeEventListener("touchmove", preventScroll);
    };
  }, [handleScroll]);

  // Keyboard navigation (no looping)
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isTransitioning) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        if (currentSlide < totalSlides - 1) {
          setIsTransitioning(true);
          setDividerDirection("down");
          setShowDivider(true);
          setTimeout(() => {
            setCurrentSlide((prev) => prev + 1);
            setShowDivider(false);
          }, dividerDuration);
          setTimeout(
            () => setIsTransitioning(false),
            slideDuration + dividerDuration
          );
        }
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        if (currentSlide > 0) {
          setIsTransitioning(true);
          setDividerDirection("up");
          setShowDivider(true);
          setTimeout(() => {
            setCurrentSlide((prev) => prev - 1);
            setShowDivider(false);
          }, dividerDuration);
          setTimeout(
            () => setIsTransitioning(false),
            slideDuration + dividerDuration
          );
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isTransitioning,
    currentSlide,
    totalSlides,
    slideDuration,
    dividerDuration,
  ]);

  // Animation variants for slides (matching CSS cubic-bezier)
  const slideVariants = {
    enter: (direction) => ({
      y: direction > 0 ? "100%" : "-100%",
      transition: {
        duration: 1,
        ease: [0.5, 0, 0.5, 1], // cubic-bezier(0.5, 0, 0.5, 1)
      },
    }),
    center: {
      y: "0%",
      transition: {
        duration: 1,
        ease: [0.5, 0, 0.5, 1],
      },
    },
    exit: (direction) => ({
      y: direction > 0 ? "-100%" : "100%",
      transition: {
        duration: 1,
        ease: [0.5, 0, 0.5, 1],
      },
    }),
  };

  const contentVariants = {
    enter: {
      y: "30vh",
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.5, 0, 0.5, 1],
      },
    },
    center: {
      y: "0vh",
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.5, 0, 0.5, 1],
        delay: 0.2,
      },
    },
    exit: {
      y: "-20vh",
      opacity: 0,
      transition: {
        duration: 1,
        ease: [0.5, 0, 0.5, 1],
      },
    },
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden"
      style={{ height: "100vh", width: "100vw" }}
    >
      <AnimatePresence mode="sync" initial={false}>
        {sections.map((SectionComponent, index) => {
          if (index !== currentSlide) return null;

          return (
            <motion.div
              key={`slide-${index}`}
              className="absolute inset-0 w-full h-screen"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={index > currentSlide ? -1 : 1}
            >
              <motion.div
                className="w-full h-full"
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <SectionComponent />
              </motion.div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Circular Animation Divider */}
      <CircularDivider isVisible={showDivider} direction={dividerDirection} />

      {/* Scroll Hint (updated for non-looping) */}
      <motion.div
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-white/70 text-sm uppercase tracking-wider"
        animate={{
          opacity: [0.5, 1, 0.5],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {currentSlide === 0
          ? "Scroll Down to Continue"
          : currentSlide === totalSlides - 1
          ? "Scroll Up to Go Back"
          : "Scroll to Navigate"}{" "}
        • {currentSlide + 1}/{totalSlides}
      </motion.div>

      {/* Loading Indicator During Transitions */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ParallaxLandingPage;
