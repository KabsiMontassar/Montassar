import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Register GSAP plugins
gsap.registerPlugin(Observer);

// Enhanced Section Components with distinct backgrounds
const Section1 = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
    {/* Animated background elements */}
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
        animate={{
          scale: [1, 1.2, 1],
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

    <div className="absolute inset-0 bg-black/50" />
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
          opacity: [1, 1, 1],
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

// Custom Cursor with Circle Only
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Hide default cursor
    document.body.style.cursor = 'none';
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.style.cursor = 'auto';
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-4 h-4 border-2 border-white rounded-full"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        mixBlendMode: 'difference',
      }}
      animate={{
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

const ParallaxLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [scrollDirection, setScrollDirection] = useState(null);
  const [previousSlide, setPreviousSlide] = useState(0);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const gsapTimeline = useRef(null);

  // Configuration
  const scrollSensitivity = 30;
  const totalSlides = sections.length;

  // Initialize slides position and z-index
  useEffect(() => {
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, {
          yPercent: index === currentSlide ? 0 : 100,
          zIndex: index === currentSlide ? 20 : 0,
          opacity: 1
        });
        
        // Initialize slide image
        const slideImage = slide.querySelector('.slide-image');
        if (slideImage) {
          gsap.set(slideImage, {
            scaleY: 1,
            opacity: 1,
            transformOrigin: '50% 50%'
          });
        }
        
        // Initialize slide content
        const slideContent = slide.querySelector('.slide-content');
        if (slideContent) {
          gsap.set(slideContent, {
            yPercent: 0,
            opacity: 1
          });
        }
      }
    });
  }, [currentSlide]);

  // GSAP-based navigation function
  const navigate = useCallback((newPosition, direction) => {
    if (isAnimating || newPosition === currentSlide) return;
    
    setIsAnimating(true);
    setPreviousSlide(currentSlide);
    setScrollDirection(direction);

    const currentSlideEl = slideRefs.current[currentSlide];
    const upcomingSlideEl = slideRefs.current[newPosition];
    const currentImg = currentSlideEl?.querySelector('.slide-image');
    const upcomingImg = upcomingSlideEl?.querySelector('.slide-image');
    const currentContent = currentSlideEl?.querySelector('.slide-content');
    const upcomingContent = upcomingSlideEl?.querySelector('.slide-content');

    // Kill any existing timeline
    if (gsapTimeline.current) {
      gsapTimeline.current.kill();
    }

    // Reset all slides z-index before animation
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        gsap.set(slide, {
          zIndex: index === currentSlide ? 20 : index === newPosition ? 15 : 0
        });
      }
    });

    // Create GSAP timeline with power3.inOut easing
    gsapTimeline.current = gsap.timeline({
      defaults: {
        duration: 1.6,
        ease: 'power3.inOut'
      },
      onComplete: () => {
        // Clean up z-indexes after animation
        slideRefs.current.forEach((slide, index) => {
          if (slide) {
            gsap.set(slide, {
              zIndex: index === newPosition ? 20 : 0
            });
          }
        });
        setIsAnimating(false);
        setCurrentSlide(newPosition);
      }
    });

    // Timeline animations
    gsapTimeline.current
      .addLabel('start', 0)
      
      // Set transform origins for smoother scaling
      .set([currentImg, upcomingImg], {
        transformOrigin: '50% 50%'
      }, 'start')
      
      // Position upcoming slide off-screen
      .set(upcomingSlideEl, {
        yPercent: direction === 'next' ? 100 : -100,
        zIndex: 15
      }, 'start')
      
      .set(upcomingContent, {
        yPercent: direction === 'next' ? -50 : 50,
        opacity: 0
      }, 'start')
      
      // Animate current slide out with reduced scaling
      .to(currentSlideEl, {
        yPercent: direction === 'next' ? -100 : 100
      }, 'start')
      
      .to(currentImg, {
        scaleY: 1.1,
        opacity: 1
      }, 'start')
      
      .to(currentContent, {
        yPercent: direction === 'next' ? -30 : 30,
        opacity: 0
      }, 'start')
      
      // Animate upcoming slide in with controlled scaling
      .to(upcomingSlideEl, {
        yPercent: 0
      }, 'start')
      
      .to(upcomingImg, {
        startAt: { scaleY: 1.1, opacity: 1 },
        scaleY: 1,
        opacity: 1,
        ease: 'power2.inOut'
      }, 'start+=0.2')
      
      .to(upcomingContent, {
        yPercent: 0,
        opacity: 1,
        ease: 'power2.out'
      }, 'start+=0.4')
      
      // Reset current slide position after animation
      .set(currentSlideEl, {
        yPercent: 0,
        zIndex: 1
      }, 'start+=1.6')
      
      .set(currentImg, {
        scaleY: 1,
        opacity: 1
      }, 'start+=1.6');

  }, [currentSlide, isAnimating]);

  // Next slide function
  const next = useCallback(() => {
    const newPosition = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    navigate(newPosition, 'next');
  }, [currentSlide, totalSlides, navigate]);

  // Previous slide function
  const prev = useCallback(() => {
    const newPosition = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    navigate(newPosition, 'prev');
  }, [currentSlide, totalSlides, navigate]);

  // Initialize GSAP Observer for scroll detection
  useEffect(() => {
    const observer = Observer.create({
      type: 'wheel,touch,pointer',
      onDown: () => !isAnimating && prev(),
      onUp: () => !isAnimating && next(),
      wheelSpeed: -1,
      tolerance: 10
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
      className="fixed inset-0 overflow-hidden"
      style={{ 
        height: "100vh", 
        width: "100vw",
        perspective: "1000px",
        backfaceVisibility: "hidden"
      }}
    >
      {/* GSAP-animated slides */}
      {sections.map((SectionComponent, index) => (
        <div
          key={`slide-${index}`}
          ref={el => slideRefs.current[index] = el}
          className={`absolute inset-0 w-full h-screen overflow-hidden ${
            index === currentSlide ? 'z-20' : 'z-0'
          }`}
          style={{
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translate3d(0,0,0)',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
          }}
        >
          {/* Slide image wrapper */}
          <div 
            className="slide-image absolute inset-0 w-full h-full overflow-hidden"
            style={{ 
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)'
            }}
          >
            <SectionComponent />
          </div>
          
          {/* Slide content wrapper */}
          <div 
            className="slide-content absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{ 
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              transform: 'translate3d(0,0,0)'
            }}
          >
            {/* Content will be handled by the SectionComponent */}
          </div>
        </div>
      ))}

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
};

export default ParallaxLandingPage;
