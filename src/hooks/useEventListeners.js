import { useEffect } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

/**
 * Custom hook for event listeners (scroll, keyboard, mouse, touch)
 */
export const useEventListeners = ({
  isAnimating,
  next,
  prev,
  setMousePosition,
  currentSlide,
  isMenuOpen,
  setIsMenuOpen,
  setIsMontassarHovered
}) => {
  // Scroll and keyboard navigation
  useEffect(() => {
    gsap.registerPlugin(Observer);
    
    const observer = Observer.create({
      type: "wheel,touch",
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
      } else if (event.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAnimating, next, prev, isMenuOpen, setIsMenuOpen]);

  // Mouse and touch events
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleTouchEnd = () => {
      // Reset hover state when touch ends
      setTimeout(() => setIsMontassarHovered(false), 100);
    };

    const preventClickScroll = (e) => {
      const target = e.target;
      const isInteractive = target.closest('button, a, input, select, textarea, [role="button"]');
      
      if (!isInteractive && e.button === 0) {
        e.preventDefault();
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchend", handleTouchEnd);
    document.addEventListener("click", preventClickScroll, { passive: false });
    document.addEventListener("mousedown", preventClickScroll, { passive: false });
    
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("click", preventClickScroll);
      document.removeEventListener("mousedown", preventClickScroll);
    };
  }, [setMousePosition, setIsMontassarHovered]);
};