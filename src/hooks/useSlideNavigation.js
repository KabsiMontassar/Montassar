import { useState, useEffect, useCallback, useRef } from "react";
import { gsap } from "gsap";
import { ANIMATION_DURATION } from "../utils/constants";

/**
 * Custom hook for slide navigation and animations
 */
export const useSlideNavigation = (totalSlides) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const slideRefs = useRef([]);
  const gsapTimeline = useRef(null);

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

  return {
    currentSlide,
    isAnimating,
    slideRefs,
    navigateToSection,
    next,
    prev
  };
};