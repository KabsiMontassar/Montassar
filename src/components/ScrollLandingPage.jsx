import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SectionF from "./landing/SectionF";
import SectionS from "./landing/SectionS";
import SectionT from "./landing/SectionT";
import yinYangSvg from "../assets/yin-yang.svg";

// Register GSAP plugin
gsap.registerPlugin(Observer);

const sections = [SectionF, SectionS, SectionT];

// Custom Cursor with Delayed Following
const CustomCursor = ({ mousePosition }) => {
  return (
    <>
      {/* Inner yellow circle (moderate delay) */}
      <motion.div
        className="fixed pointer-events-none z-50 w-4 h-4 bg-[#ffe500] rounded-full"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: [1, 1.2, 1],
        }}
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          y: { type: "spring", stiffness: 300, damping: 30 },
          scale: {
            duration: 0.6,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* Outer transparent circle with yellow border (more delayed) */}
      <motion.div
        className="fixed pointer-events-none z-40 w-6 h-6 border border-[#ffe500] rounded-full bg-transparent"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: [1, 1.1, 1],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          x: { type: "spring", stiffness: 200, damping: 25 },
          y: { type: "spring", stiffness: 200, damping: 25 },
          scale: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          },
          opacity: {
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          },
        }}
      />
    </>
  );
};

const ScrollLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isMontassarHovered, setIsMontassarHovered] = useState(false);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const gsapTimeline = useRef(null);
  const menuButtonRef = useRef(null);
  const montassarRefs = useRef([]); // Array of refs for each section

  // Configuration
  const totalSlides = sections.length;

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mouse position tracking with magnetic effect detection
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Check menu button magnetic range
      if (menuButtonRef.current) {
        const rect = menuButtonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        setIsMenuHovered(distance < 150);
      }

      // Check Montassar text magnetic range for current section
      const currentMontassarRef = montassarRefs.current[currentSlide];
      if (currentMontassarRef) {
        const rect = currentMontassarRef.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        setIsMontassarHovered(distance < 150);
      } else {
        setIsMontassarHovered(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, [currentSlide]); // Add currentSlide dependency

  // Format time
  const formatTime = (date) => {
    const month = date.toLocaleString("default", { month: "short" });
    const day = date.getDate();
    const time = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `${month} ${day} | ${time}`;
  };

  // Toggle menu
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  // Prevent mouse clicks from causing unwanted scroll behavior
  useEffect(() => {
    const preventClickScroll = (e) => {
      // Only prevent default if it's a click that might cause scrolling
      // Allow normal clicks on interactive elements
      const target = e.target;
      const isInteractive = target.closest(
        'button, a, input, select, textarea, [role="button"]'
      );

      if (!isInteractive && e.button === 0) {
        // Left mouse button
        e.preventDefault();
      }
    };

    // Add passive event listeners to avoid interfering with normal interactions
    document.addEventListener("click", preventClickScroll, { passive: false });
    document.addEventListener("mousedown", preventClickScroll, {
      passive: false,
    });

    return () => {
      document.removeEventListener("click", preventClickScroll);
      document.removeEventListener("mousedown", preventClickScroll);
    };
  }, []);

  // Get menu background based on current section
  const getMenuBackground = () => {
    if (currentSlide === 0 || currentSlide === 2) {
      // First and third sections have gradients, so menu should be white
      return "bg-[#f4f4f4]";
    } else {
      // Second section is white, so menu should have gradient
      return "bg-gradient-to-br from-black to-[#222121]";
    }
  };

  // Get text color based on menu background
  const getTextColor = () => {
    if (currentSlide === 0 || currentSlide === 2) {
      // White background, use black text for better contrast
      return "text-black";
    } else {
      // Dark gradient background, use f4f4f4 text
      return "text-[#f4f4f4]";
    }
  };

  const getIconColor = () => {
    switch (currentSlide) {
      case 0:
        return isMenuOpen ? "text-black" : "text-white";
      case 1:
        return isMenuOpen ? "text-[#f4f4f4]" : "text-black";
      case 2:
        return isMenuOpen ? "text-black" : "text-white";
      default:
        return "text-black";
    }
  };

  // Get hover color for menu items
  const getHoverColor = () => {
    if (currentSlide === 0 || currentSlide === 2) {
      // White background, use yellow hover for contrast
      return "hover:text-[#ffe500]";
    } else {
      // Dark gradient background, use yellow hover
      return "hover:text-[#ffe500]";
    }
  };

  // Check if cursor is close to menu button
  const isCursorNearMenu = () => {
    const menuX = window.innerWidth - 60; // right-8 (32px) + half width (24px)
    const menuY = 60; // top-8 (32px) + half height (24px)
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - menuX, 2) +
        Math.pow(mousePosition.y - menuY, 2)
    );
    return distance < 150; // 150px proximity threshold for magnetic effect
  };

  // Calculate magnetic movement for Montassar text
  const getMontassarMagneticMovement = () => {
    const currentMontassarRef = montassarRefs.current[currentSlide];
    if (!currentMontassarRef) return { x: 0, y: 0 };

    const rect = currentMontassarRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = mousePosition.x - centerX;
    const distanceY = mousePosition.y - centerY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    if (distance < 150) {
      const strength = (150 - distance) / 150;
      return {
        x: distanceX * strength * 0.4,
        y: distanceY * strength * 0.4,
      };
    }
    return { x: 0, y: 0 };
  };

  // Calculate magnetic movement exactly like the provided example
  const getMagneticMovement = () => {
    const menuX = window.innerWidth - 60;
    const menuY = 60;
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - menuX, 2) +
        Math.pow(mousePosition.y - menuY, 2)
    );

    const magneticRadius = 150; // Same radius as the example

    if (distance < magneticRadius) {
      // Calculate offset exactly like the example: e.clientX - rect.left - rect.width/2
      // Button is positioned at top-12 right-12 (48px from edges)
      // Button size is w-12 h-12 (48px x 48px)
      const buttonLeft = window.innerWidth - 96; // right-12 = 48px, button width = 48px, so left = windowWidth - 96
      const buttonTop = 48; // top-12 = 48px
      const buttonWidth = 48;
      const buttonHeight = 48;

      const offsetX = mousePosition.x - buttonLeft - buttonWidth / 2;
      const offsetY = mousePosition.y - buttonTop - buttonHeight / 2;

      // Move button by 0.5 factor (same as example)
      const x = offsetX * 0.5;
      const y = offsetY * 0.5;

      return { x, y, scale: 1.1, inRange: true };
    } else {
      return { x: 0, y: 0, scale: 1, inRange: false };
    }
  };

  // Reset function with elastic animation like the example
  const resetMagnet = () => {
    // This will be handled by the animate prop returning to default values
    return { x: 0, y: 0, scale: 1 };
  };

  // Initialize slides
  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, {
          yPercent: index === currentSlide ? 0 : 100,
          zIndex: index === currentSlide ? 10 : 0,
        });
      }
    });
  }, [currentSlide]);

  // Simple GSAP-based navigation function
  const navigate = useCallback(
    (newPosition, direction) => {
      if (isAnimating || newPosition === currentSlide) return;

      setIsAnimating(true);

      const currentSlideEl = slideRefs.current[currentSlide];
      const upcomingSlideEl = slideRefs.current[newPosition];

      // Kill any existing timeline
      if (gsapTimeline.current) {
        gsapTimeline.current.kill();
      }

      // Set z-indexes
      slideRefs.current.forEach((slide, index) => {
        if (slide) {
          gsap.set(slide, {
            zIndex:
              index === newPosition ? 20 : index === currentSlide ? 10 : 0,
          });
        }
      });

      // Position upcoming slide
      gsap.set(upcomingSlideEl, {
        yPercent: direction === "next" ? 100 : -100,
        zIndex: 20,
      });

      // Create timeline
      gsapTimeline.current = gsap.timeline({
        defaults: {
          duration: 1.2,
          ease: "power2.inOut",
        },
        onComplete: () => {
          slideRefs.current.forEach((slide, index) => {
            if (slide) {
              gsap.set(slide, {
                zIndex: index === newPosition ? 10 : 0,
              });
            }
          });

          setIsAnimating(false);
          setCurrentSlide(newPosition);
        },
      });

      // Simple slide transitions
      gsapTimeline.current
        .to(
          currentSlideEl,
          {
            yPercent: direction === "next" ? -100 : 100,
          },
          0
        )
        .to(
          upcomingSlideEl,
          {
            yPercent: 0,
          },
          0
        );
    },
    [currentSlide, isAnimating]
  );

  // Navigation to specific section
  const navigateToSection = useCallback(
    (sectionIndex) => {
      if (sectionIndex === currentSlide || isAnimating) return;

      const direction = sectionIndex > currentSlide ? "next" : "prev";
      navigate(sectionIndex, direction);
      setIsMenuOpen(false); // Close menu after navigation
    },
    [currentSlide, isAnimating, navigate]
  );

  // Navigation functions (no looping)
  const next = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      const newPosition = currentSlide + 1;
      navigate(newPosition, "next");
    }
  }, [currentSlide, totalSlides, navigate]);

  const prev = useCallback(() => {
    if (currentSlide > 0) {
      const newPosition = currentSlide - 1;
      navigate(newPosition, "prev");
    }
  }, [currentSlide, totalSlides, navigate]);

  // Initialize GSAP Observer for full-screen scroll
  useEffect(() => {
    const observer = Observer.create({
      type: "wheel,touch", // Removed "pointer" to prevent mouse clicks from scrolling
      onDown: () => !isAnimating && prev(),
      onUp: () => !isAnimating && next(),
      wheelSpeed: -1,
      tolerance: 10,
    });

    return () => observer.kill();
  }, [isAnimating, next, prev]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isAnimating) return;

      if (event.key === "ArrowDown" || event.key === "PageDown") {
        event.preventDefault();
        next();
      } else if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        prev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating, next, prev]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden select-none"
      style={{
        height: "100vh",
        width: "100vw",
        perspective: "1000px",
        backfaceVisibility: "hidden",
        userSelect: "none",
        WebkitUserSelect: "none",
        MozUserSelect: "none",
        msUserSelect: "none",
      }}
    >
      {sections.map((SectionComponent, index) => (
        <div
          key={`slide-${index}`}
          ref={(el) => (slideRefs.current[index] = el)}
          className={`absolute inset-0 w-full h-screen overflow-hidden ${
            index === currentSlide ? "z-10" : "z-0"
          }`}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)",
          }}
        >
          {/* Section content */}
          <div className="w-full h-full">
            <SectionComponent />
          </div>

          {/* Montassar text overlay - same position as menu */}
          <div className="absolute top-8 left-8 z-20">
            <motion.div
              ref={(el) => (montassarRefs.current[index] = el)}
              className="flex items-center space-x-3"
              animate={{
                x:
                  index === currentSlide ? getMontassarMagneticMovement().x : 0,
                y:
                  index === currentSlide ? getMontassarMagneticMovement().y : 0,
              }}
              transition={{
                x: { type: "spring", stiffness: 150, damping: 15 },
                y: { type: "spring", stiffness: 150, damping: 15 },
              }}
            >
              <h1
                className={`text-2xl font-light ${
                  index === 0 || index === 2 ? "text-[#f4f4f4]" : "text-black"
                }`}
              >
                Montassar
              </h1>
              <motion.img
                src={yinYangSvg}
                alt="Yin Yang"
                className={`w-6 h-6 ${
                  index === 0 || index === 2 ? "filter invert" : ""
                }`}
                style={{
                  filter:
                    index === 1
                      ? "invert(0) drop-shadow(0 0 1px rgba(0,0,0,0.8))"
                      : index === 0 || index === 2
                      ? "invert(1)"
                      : "",
                }}
                animate={{
                  rotate:
                    index === currentSlide && isMontassarHovered ? [0, 360] : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat:
                    index === currentSlide && isMontassarHovered ? Infinity : 0,
                  repeatType: "loop",
                }}
              />
            </motion.div>
          </div>
        </div>
      ))}

      {/* Menu Icon - Top Right */}
      <motion.button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="fixed top-12 right-12 z-50 w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-full"
        animate={getMagneticMovement()}
        transition={{
          x: getMagneticMovement().inRange
            ? { duration: 0.1, ease: "easeOut" }
            : { duration: 1.5, ease: [0.68, -0.55, 0.265, 1.55] }, // bouncy elastic equivalent
          y: getMagneticMovement().inRange
            ? { duration: 0.1, ease: "easeOut" }
            : { duration: 1.5, ease: [0.68, -0.55, 0.265, 1.55] }, // bouncy elastic equivalent
          scale: { duration: 0.1, ease: "easeOut" },
        }}
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={getIconColor()}
          animate={{
            rotate: isMenuHovered ? [0, 360] : 0,
          }}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: isMenuHovered ? Infinity : 0,
            repeatType: "loop",
          }}
        >
          <path
            d="M3 8H21M3 16H21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.button>

      {/* Full Screen Menu Overlay */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isMenuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className={`fixed inset-0 z-40 ${getMenuBackground()}`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="relative w-full h-full flex flex-col">
          {/* Top Left - Montassar */}
          <div className="absolute top-8 left-8">
            <motion.div
              className="flex items-center space-x-3"
              animate={{
                x: getMontassarMagneticMovement().x,
                y: getMontassarMagneticMovement().y,
              }}
              transition={{
                x: { type: "spring", stiffness: 150, damping: 15 },
                y: { type: "spring", stiffness: 150, damping: 15 },
              }}
            >
              <h1 className={`text-2xl font-light ${getTextColor()}`}>
                Montassar
              </h1>
              <motion.img
                src={yinYangSvg}
                alt="Yin Yang"
                className={`w-6 h-6 ${
                  currentSlide === 1 ? "" : "filter invert"
                }`}
                animate={{
                  rotate: isMontassarHovered ? [0, 360] : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: isMontassarHovered ? Infinity : 0,
                  repeatType: "loop",
                }}
              />
            </motion.div>
          </div>

          {/* Center - Navigation */}
          <div
            className="flex-1 flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: isMenuOpen ? 1 : 0,
                  y: isMenuOpen ? 0 : 20,
                }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="space-y-8"
              >
                <button
                  onClick={() => navigateToSection(0)}
                  className={`block text-6xl md:text-8xl font-light ${getTextColor()} ${getHoverColor()} transition-colors duration-300`}
                >
                  Home
                </button>
                <button
                  onClick={() => navigateToSection(1)}
                  className={`block text-6xl md:text-8xl font-light ${getTextColor()} ${getHoverColor()} transition-colors duration-300`}
                >
                  Work
                </button>
                <button
                  onClick={() => navigateToSection(2)}
                  className={`block text-6xl md:text-8xl font-light ${getTextColor()} ${getHoverColor()} transition-colors duration-300`}
                >
                  Contact
                </button>
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <div
            className="absolute bottom-8 left-8 right-8 flex justify-between items-end"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Bottom Left - Time */}
            <div className={`text-center ${getTextColor()}`}>
              <div className="text-sm font-light mb-1">Local time</div>
              <div className="text-lg font-light">
                {formatTime(currentTime)}
              </div>
            </div>

            {/* Bottom Right - Social Links */}
            <div className={`text-left ${getTextColor()}`}>
              <div className="text-lg font-light mb-2">Socials</div>
              <div className="flex space-x-6 justify-end">
                <a
                  href="mailto:your.email@example.com"
                  className={`text-lg font-light ${getHoverColor()} transition-colors duration-300`}
                >
                  Email
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg font-light ${getHoverColor()} transition-colors duration-300`}
                >
                  GitHub
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-lg font-light ${getHoverColor()} transition-colors duration-300`}
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Cursor */}
      <CustomCursor mousePosition={mousePosition} />
    </div>
  );
};

export default ScrollLandingPage;
