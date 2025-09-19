import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SectionF from "../components/landing/SectionF";
import SectionS from "../components/landing/SectionS";
import SectionT from "../components/landing/SectionT";
import yinYangSvg from "../assets/images/yin-yang.svg";

// Register GSAP plugin
gsap.registerPlugin(Observer);

// Constants
const SECTIONS = [SectionF, SectionS, SectionT];
const MAGNETIC_RADIUS = 150;
const MAGNETIC_STRENGTH = 0.4;
const ANIMATION_DURATION = 1.2;

// Animation configurations
const CURSOR_ANIMATION = {
  inner: {
    spring: { stiffness: 300, damping: 30 },
    scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
  },
  outer: {
    spring: { stiffness: 200, damping: 25 },
    scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
    opacity: { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
  }
};

const MENU_TRANSITION = {
  duration: 0.8,
  ease: "easeInOut"
};

const MAGNETIC_TRANSITION = {
  spring: { stiffness: 150, damping: 15 },
  elastic: { duration: 1.5, ease: [0.68, -0.55, 0.265, 1.55] },
  smooth: { duration: 0.1, ease: "easeOut" }
};

// Utility functions
const calculateDistance = (x1, y1, x2, y2) => 
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

const calculateMagneticEffect = (mousePos, targetPos, radius = MAGNETIC_RADIUS, strength = MAGNETIC_STRENGTH) => {
  const distance = calculateDistance(mousePos.x, mousePos.y, targetPos.x, targetPos.y);
  
  if (distance < radius) {
    const magneticStrength = (radius - distance) / radius;
    const deltaX = mousePos.x - targetPos.x;
    const deltaY = mousePos.y - targetPos.y;
    
    return {
      x: deltaX * magneticStrength * strength,
      y: deltaY * magneticStrength * strength,
      inRange: true
    };
  }
  
  return { x: 0, y: 0, inRange: false };
};

// Custom Cursor Component
const CustomCursor = React.memo(({ mousePosition }) => (
  <>
    <motion.div
      className="fixed pointer-events-none z-50 w-4 h-4 bg-[#ffe500] rounded-full touch-magnetic hidden md:block"
      animate={{
        x: mousePosition.x - 8,
        y: mousePosition.y - 8,
        scale: [1, 1.2, 1],
      }}
      transition={{
        x: CURSOR_ANIMATION.inner.spring,
        y: CURSOR_ANIMATION.inner.spring,
        scale: CURSOR_ANIMATION.inner.scale,
      }}
    />
    <motion.div
      className="fixed pointer-events-none z-40 w-6 h-6 border border-[#ffe500] rounded-full bg-transparent touch-magnetic hidden md:block"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: [1, 1.1, 1],
        opacity: [0.6, 0.8, 0.6],
      }}
      transition={{
        x: CURSOR_ANIMATION.outer.spring,
        y: CURSOR_ANIMATION.outer.spring,
        scale: CURSOR_ANIMATION.outer.scale,
        opacity: CURSOR_ANIMATION.outer.opacity,
      }}
    />
  </>
));

CustomCursor.displayName = 'CustomCursor';

const ScrollLandingPage = () => {
  // Core state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Hover states
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isMontassarHovered, setIsMontassarHovered] = useState(false);
  
  // Refs
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const gsapTimeline = useRef(null);
  const menuButtonRef = useRef(null);
  const montassarRefs = useRef([]);

  // Memoized values
  const totalSlides = SECTIONS.length;
  
  const sectionStyles = useMemo(() => ({
    menuBackground: currentSlide === 1 ? "bg-gradient-to-br from-black to-[#222121]" : "bg-[#f4f4f4]",
    textColor: currentSlide === 1 ? "text-[#f4f4f4]" : "text-black",
    iconColor: (() => {
      switch (currentSlide) {
        case 0: return isMenuOpen ? "text-black" : "text-white";
        case 1: return isMenuOpen ? "text-[#f4f4f4]" : "text-black";
        case 2: return isMenuOpen ? "text-black" : "text-white";
        default: return "text-black";
      }
    })(),
    hoverColor: "hover:text-[#ffe500]",
    filterClass: (() => {
      switch (currentSlide) {
        case 0: return isMenuOpen ? "" : "filter invert";
        case 1: return isMenuOpen ? "filter invert" : "";
        case 2: return isMenuOpen ? "" : "filter invert";
        default: return "";
      }
    })()
  }), [currentSlide, isMenuOpen]);

  // Time formatting
  const formatTime = useCallback((date) => {
    const options = {
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    };

    return date.toLocaleString("en-US", options);
  }, []);

  // Magnetic effect calculations
  const getMagneticMovement = useCallback(() => {
    if (!menuButtonRef.current) return { x: 0, y: 0, scale: 1, inRange: false };
    
    const rect = menuButtonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const effect = calculateMagneticEffect(
      mousePosition,
      { x: centerX, y: centerY }
    );
    
    return {
      x: effect.x * 0.5,
      y: effect.y * 0.5,
      scale: effect.inRange ? 1.1 : 1,
      inRange: effect.inRange
    };
  }, [mousePosition]);

  const getMontassarMagneticMovement = useCallback(() => {
    const currentMontassarRef = montassarRefs.current[currentSlide];
    if (!currentMontassarRef) return { x: 0, y: 0 };

    const rect = currentMontassarRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const effect = calculateMagneticEffect(
      mousePosition,
      { x: centerX, y: centerY }
    );

    return { x: effect.x, y: effect.y };
  }, [mousePosition, currentSlide]);

  // Navigation functions
  const navigate = useCallback((newPosition, direction) => {
    if (isAnimating || newPosition === currentSlide) return;

    setIsAnimating(true);

    const currentSlideEl = slideRefs.current[currentSlide];
    const upcomingSlideEl = slideRefs.current[newPosition];

    if (gsapTimeline.current) {
      gsapTimeline.current.kill();
    }

    // Set z-indexes
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, {
          zIndex: index === newPosition ? 20 : index === currentSlide ? 10 : 0,
        });
      }
    });

    gsap.set(upcomingSlideEl, {
      yPercent: direction === "next" ? 100 : -100,
      zIndex: 20,
    });

    gsapTimeline.current = gsap.timeline({
      defaults: { duration: ANIMATION_DURATION, ease: "power2.inOut" },
      onComplete: () => {
        slideRefs.current.forEach((slide, index) => {
          if (slide) {
            gsap.set(slide, { zIndex: index === newPosition ? 10 : 0 });
          }
        });
        setIsAnimating(false);
        setCurrentSlide(newPosition);
      },
    });

    gsapTimeline.current
      .to(currentSlideEl, { yPercent: direction === "next" ? -100 : 100 }, 0)
      .to(upcomingSlideEl, { yPercent: 0 }, 0);
  }, [currentSlide, isAnimating]);

  const navigateToSection = useCallback((sectionIndex) => {
    if (sectionIndex === currentSlide || isAnimating) return;
    const direction = sectionIndex > currentSlide ? "next" : "prev";
    navigate(sectionIndex, direction);
    setIsMenuOpen(false);
  }, [currentSlide, isAnimating, navigate]);

  const next = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      navigate(currentSlide + 1, "next");
    }
  }, [currentSlide, totalSlides, navigate]);

  const prev = useCallback(() => {
    if (currentSlide > 0) {
      navigate(currentSlide - 1, "prev");
    }
  }, [currentSlide, navigate]);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  // Effects
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      // Menu button hover detection
      if (menuButtonRef.current) {
        const rect = menuButtonRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = calculateDistance(e.clientX, e.clientY, centerX, centerY);
        setIsMenuHovered(distance < MAGNETIC_RADIUS);
      }

      // Montassar hover detection
      const currentMontassarRef = montassarRefs.current[currentSlide];
      if (currentMontassarRef) {
        const rect = currentMontassarRef.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = calculateDistance(e.clientX, e.clientY, centerX, centerY);
        setIsMontassarHovered(distance < MAGNETIC_RADIUS);
      } else {
        setIsMontassarHovered(false);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [currentSlide]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isMenuOpen]);

  useEffect(() => {
    const preventClickScroll = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]');
      
      if (!isInteractive && e.button === 0) {
        e.preventDefault();
      }
    };

    document.addEventListener("click", preventClickScroll, { passive: false });
    document.addEventListener("mousedown", preventClickScroll, { passive: false });

    return () => {
      document.removeEventListener("click", preventClickScroll);
      document.removeEventListener("mousedown", preventClickScroll);
    };
  }, []);

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

  useEffect(() => {
    const observer = Observer.create({
      type: "wheel,touch",
      onDown: () => !isAnimating && prev(),
      onUp: () => !isAnimating && next(),
      wheelSpeed: -1,
      tolerance: 10,
    });

    return () => observer.kill();
  }, [isAnimating, next, prev]);

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
      {SECTIONS.map((SectionComponent, index) => (
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
          <div className="w-full h-full">
            <SectionComponent />
          </div>

          <div className="absolute top-8 left-8 z-20 mobile-yin-yang tablet-yin-yang large-yin-yang">
            <motion.div
              ref={(el) => (montassarRefs.current[index] = el)}
              className="flex items-center space-x-1"
              animate={{
                x: index === currentSlide ? getMontassarMagneticMovement().x : 0,
                y: index === currentSlide ? getMontassarMagneticMovement().y : 0,
              }}
              transition={{
                x: MAGNETIC_TRANSITION.spring,
                y: MAGNETIC_TRANSITION.spring,
              }}
            >
              <motion.img
                src={yinYangSvg}
                alt="Yin Yang"
                className={`w-10 h-10 space-x-1 ${sectionStyles.filterClass}`}
                animate={{
                  rotate: index === currentSlide && isMontassarHovered ? 360 : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: index === currentSlide && isMontassarHovered ? Infinity : 0,
                  repeatType: index === currentSlide && isMontassarHovered ? "loop" : undefined,
                }}
              />
            </motion.div>
          </div>
        </div>
      ))}

      <motion.button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="fixed top-12 right-12 z-50 w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-full mobile-menu-button tablet-menu-button"
        animate={getMagneticMovement()}
        transition={{
          x: getMagneticMovement().inRange ? MAGNETIC_TRANSITION.smooth : MAGNETIC_TRANSITION.elastic,
          y: getMagneticMovement().inRange ? MAGNETIC_TRANSITION.smooth : MAGNETIC_TRANSITION.elastic,
          scale: MAGNETIC_TRANSITION.smooth,
        }}
      >
        <motion.svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={sectionStyles.iconColor}
          transition={{
            duration: 2,
            ease: "linear",
            repeat: isMenuHovered ? Infinity : 0,
            repeatType: isMenuHovered ? "loop" : undefined,
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

      {/* Mobile Drawer Menu */}
      <div className="md:hidden">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0, visibility: "hidden" }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0,
            visibility: isMenuOpen ? "visible" : "hidden"
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="mobile-drawer-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
        
        {/* Drawer */}
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: isMenuOpen ? 0 : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className={`mobile-drawer ${sectionStyles.menuBackground}`}
        >
          <div className="mobile-drawer-content">
            {/* Header */}
            <div className="mobile-drawer-header">
              <motion.img
                src={yinYangSvg}
                alt="Yin Yang"
                className={`w-8 h-8 ${sectionStyles.filterClass}`}
                animate={{
                  rotate: isMontassarHovered ? 360 : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: isMontassarHovered ? Infinity : 0,
                  repeatType: isMontassarHovered ? "loop" : undefined,
                }}
              />
              <button 
                onClick={() => setIsMenuOpen(false)}
                className={`mobile-drawer-close ${sectionStyles.textColor}`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <div className="mobile-drawer-nav">
              {["Home", "Work", "Contact"].map((item, index) => (
                <motion.button
                  key={item}
                  onClick={() => navigateToSection(index)}
                  className={`${sectionStyles.textColor} ${sectionStyles.hoverColor} transition-colors duration-300`}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: isMenuOpen ? 1 : 0,
                    x: isMenuOpen ? 0 : 20 
                  }}
                  transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
                >
                  {item}
                </motion.button>
              ))}
            </div>

            {/* Footer */}
            <div className="mobile-drawer-footer">
              <div className={`${sectionStyles.textColor} mobile-time-section`}>
                <div className="mobile-time-text">Local time</div>
                <div className="mobile-time-value">
                  {formatTime(currentTime)}
                </div>
              </div>

              <div className={`${sectionStyles.textColor} mobile-social-section`}>
                <div className="mobile-social-text">Socials</div>
                <div className="mobile-social-links ">
                  {[
                    { name: "Email", href: "mailto:your.email@example.com" },
                    { name: "GitHub", href: "https://github.com", external: true },
                    { name: "LinkedIn", href: "https://linkedin.com", external: true }
                  ].map(({ name, href, external }) => (
                    <a
                      key={name}
                      href={href}
                      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                      className={`${sectionStyles.hoverColor} transition-colors duration-300 m-1`}
                    >
                      {name}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Desktop Full Screen Menu */}
      <motion.div
        initial={{ y: "-100%" }}
        animate={{ y: isMenuOpen ? 0 : "-100%" }}
        transition={MENU_TRANSITION}
        className={`fixed inset-0 z-40 ${sectionStyles.menuBackground} hidden md:block`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div className="relative w-full h-full flex flex-col">
          <div className="absolute top-8 left-8 tablet-yin-yang">
            <motion.div
              className="flex items-center"
              animate={{
                x: getMontassarMagneticMovement().x,
                y: getMontassarMagneticMovement().y,
              }}
              transition={{
                x: MAGNETIC_TRANSITION.spring,
                y: MAGNETIC_TRANSITION.spring,
              }}
            >
              <h1 className={`text-2xl p-0 font-light ${sectionStyles.textColor}`}></h1>
              <motion.img
                src={yinYangSvg}
                alt="Yin Yang"
                className={`w-10 h-10 space-x-1 ${sectionStyles.filterClass}`}
                animate={{
                  rotate: isMontassarHovered ? 360 : 0,
                }}
                transition={{
                  duration: 2,
                  ease: "linear",
                  repeat: isMontassarHovered ? Infinity : 0,
                  repeatType: isMontassarHovered ? "loop" : undefined,
                }}
              />
            </motion.div>
          </div>

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
                {["Home", "Work", "Contact"].map((item, index) => (
                  <button
                    key={item}
                    onClick={() => navigateToSection(index)}
                    className={`block text-6xl md:text-8xl font-light ${sectionStyles.textColor} ${sectionStyles.hoverColor} transition-colors duration-300 tablet-menu-nav laptop-menu-nav large-menu-nav`}
                  >
                    {item}
                  </button>
                ))}
              </motion.div>
            </div>
          </div>

          <div
            className="absolute bottom-8 left-8 right-8 flex justify-between items-end tablet-bottom-section"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`text-center ${sectionStyles.textColor}`}>
              <div className="text-2xl font-bold mb-1">Local time</div>
              <div className="text-3xl font-bold">
                {formatTime(currentTime)}
              </div>
            </div>

            <div className={`text-left ${sectionStyles.textColor}`}>
              <div className="text-3xl font-bold mb-2">Socials</div>
              <div className="flex space-x-6 justify-end">
                {[
                  { name: "Email", href: "mailto:your.email@example.com" },
                  { name: "GitHub", href: "https://github.com", external: true },
                  { name: "LinkedIn", href: "https://linkedin.com", external: true }
                ].map(({ name, href, external }) => (
                  <a
                    key={name}
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`text-2xl font-bold ${sectionStyles.hoverColor} transition-colors duration-300`}
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <CustomCursor mousePosition={mousePosition} />
    </div>
  );
};

export default ScrollLandingPage;
