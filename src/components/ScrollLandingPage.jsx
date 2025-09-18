import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import SectionF from "./landing/SectionF";
import SectionS from "./landing/SectionS";
import SectionT from "./landing/SectionT";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const sections = [SectionF, SectionS, SectionT];

// Custom Cursor with Circle Only
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    // Hide default cursor
    document.body.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "auto";
    };
  }, []);

  return (
    <motion.div
      className="fixed pointer-events-none z-50 w-4 h-4 border-2 border-white rounded-full"
      style={{
        left: mousePosition.x - 8,
        top: mousePosition.y - 8,
        mixBlendMode: "difference",
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

const ScrollLandingPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const slideRefs = useRef([]);
  const gsapTimeline = useRef(null);

  // Configuration
  const totalSlides = sections.length;

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
            zIndex: index === newPosition ? 20 : index === currentSlide ? 10 : 0,
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
        .to(currentSlideEl, {
          yPercent: direction === "next" ? -100 : 100,
        }, 0)
        .to(upcomingSlideEl, {
          yPercent: 0,
        }, 0);
    },
    [currentSlide, isAnimating]
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
      type: "wheel,touch,pointer",
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
      className="fixed inset-0 overflow-hidden"
      style={{
        height: "100vh",
        width: "100vw",
        perspective: "1000px",
        backfaceVisibility: "hidden",
      }}
    >
      {sections.map((SectionComponent, index) => (
        <div
          key={`slide-${index}`}
          ref={el => slideRefs.current[index] = el}
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
          <div className="absolute inset-0 w-full h-full">
            <SectionComponent />
          </div>
        </div>
      ))}

      {/* Custom Cursor */}
      <CustomCursor />
    </div>
  );
};

export default ScrollLandingPage;