import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import { Section1 } from "./landing/SectionF";
import { Section2 } from "./landing/SectionS";
import { Section3 } from "./landing/SectionT";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const sections = [Section1, Section2, Section3];

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
          opacity: 1,
        });

        // Initialize slide image
        const slideImage = slide.querySelector(".slide-image");
        if (slideImage) {
          gsap.set(slideImage, {
            scaleY: 1,
            opacity: 1,
            transformOrigin: "50% 50%",
          });
        }

        // Initialize slide content
        const slideContent = slide.querySelector(".slide-content");
        if (slideContent) {
          gsap.set(slideContent, {
            yPercent: 0,
            opacity: 1,
          });
        }
      }
    });
  }, [currentSlide]);

  // GSAP-based navigation function
  const navigate = useCallback(
    (newPosition, direction) => {
      if (isAnimating || newPosition === currentSlide) return;

      setIsAnimating(true);
      setPreviousSlide(currentSlide);
      setScrollDirection(direction);

      const currentSlideEl = slideRefs.current[currentSlide];
      const upcomingSlideEl = slideRefs.current[newPosition];
      const currentImg = currentSlideEl?.querySelector(".slide-image");
      const upcomingImg = upcomingSlideEl?.querySelector(".slide-image");
      const currentContent = currentSlideEl?.querySelector(".slide-content");
      const upcomingContent = upcomingSlideEl?.querySelector(".slide-content");

      // Kill any existing timeline
      if (gsapTimeline.current) {
        gsapTimeline.current.kill();
      }

      // Reset all slides z-index before animation
      slideRefs.current.forEach((slide, index) => {
        if (slide) {
          gsap.set(slide, {
            zIndex:
              index === currentSlide ? 20 : index === newPosition ? 15 : 0,
          });
        }
      });

      // Create GSAP timeline with power3.inOut easing
      gsapTimeline.current = gsap.timeline({
        defaults: {
          duration: 1.6,
          ease: "power3.inOut",
        },
        onComplete: () => {
          // Clean up z-indexes after animation
          slideRefs.current.forEach((slide, index) => {
            if (slide) {
              gsap.set(slide, {
                zIndex: index === newPosition ? 20 : 0,
              });
            }
          });
          setIsAnimating(false);
          setCurrentSlide(newPosition);
        },
      });

      // Timeline animations
      gsapTimeline.current
        .addLabel("start", 0)

        // Set transform origins for smoother scaling
        .set(
          [currentImg, upcomingImg],
          {
            transformOrigin: "50% 50%",
          },
          "start"
        )

        // Position upcoming slide off-screen
        .set(
          upcomingSlideEl,
          {
            yPercent: direction === "next" ? 100 : -100,
            zIndex: 15,
          },
          "start"
        )

        .set(
          upcomingContent,
          {
            yPercent: direction === "next" ? -50 : 50,
            opacity: 0,
          },
          "start"
        )

        // Animate current slide out with reduced scaling
        .to(
          currentSlideEl,
          {
            yPercent: direction === "next" ? -100 : 100,
          },
          "start"
        )

        .to(
          currentImg,
          {
            scaleY: 1.1,
            opacity: 1,
          },
          "start"
        )

        .to(
          currentContent,
          {
            yPercent: direction === "next" ? -30 : 30,
            opacity: 0,
          },
          "start"
        )

        // Animate upcoming slide in with controlled scaling
        .to(
          upcomingSlideEl,
          {
            yPercent: 0,
          },
          "start"
        )

        .to(
          upcomingImg,
          {
            startAt: { scaleY: 1.1, opacity: 1 },
            scaleY: 1,
            opacity: 1,
            ease: "power2.inOut",
          },
          "start+=0.2"
        )

        .to(
          upcomingContent,
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
          },
          "start+=0.4"
        )

        // Reset current slide position after animation
        .set(
          currentSlideEl,
          {
            yPercent: 0,
            zIndex: 1,
          },
          "start+=1.6"
        )

        .set(
          currentImg,
          {
            scaleY: 1,
            opacity: 1,
          },
          "start+=1.6"
        );
    },
    [currentSlide, isAnimating]
  );

  // Next slide function
  const next = useCallback(() => {
    const newPosition = currentSlide < totalSlides - 1 ? currentSlide + 1 : 0;
    navigate(newPosition, "next");
  }, [currentSlide, totalSlides, navigate]);

  // Previous slide function
  const prev = useCallback(() => {
    const newPosition = currentSlide > 0 ? currentSlide - 1 : totalSlides - 1;
    navigate(newPosition, "prev");
  }, [currentSlide, totalSlides, navigate]);

  // Initialize GSAP Observer for scroll detection
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
      {/* GSAP-animated slides */}
      {sections.map((SectionComponent, index) => (
        <div
          key={`slide-${index}`}
          ref={(el) => (slideRefs.current[index] = el)}
          className={`absolute inset-0 w-full h-screen overflow-hidden ${
            index === currentSlide ? "z-20" : "z-0"
          }`}
          style={{
            willChange: "transform",
            backfaceVisibility: "hidden",
            transform: "translate3d(0,0,0)",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          {/* Slide image wrapper */}
          <div
            className="slide-image absolute inset-0 w-full h-full overflow-hidden"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translate3d(0,0,0)",
            }}
          >
            <SectionComponent />
          </div>

          {/* Slide content wrapper */}
          <div
            className="slide-content absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
            style={{
              willChange: "transform",
              backfaceVisibility: "hidden",
              transform: "translate3d(0,0,0)",
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
