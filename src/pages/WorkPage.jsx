import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Work Section Components
import WorkSection1 from "../components/work/WorkSection1";
import WorkSection2 from "../components/work/WorkSection2";
import WorkSection3 from "../components/work/WorkSection3";
import WorkSection4 from "../components/work/WorkSection4";
import WorkSection5 from "../components/work/WorkSection5";

// UI Components
import CustomCursor from "../components/ui/CustomCursor";
import Magnet from "../components/ui/Magnet";
import YinYang from "../components/ui/shapes/YinYang";

// Hooks
import { useSlideNavigation } from "../hooks/useSlideNavigation";
import { useEventListeners } from "../hooks/useEventListeners";
import { useTime } from "../hooks/useTime";

// Assets
import yinYangSvg from "../assets/images/yin-yang.svg";
import PageTransition from "../components/PageTransition";

// Constants
const WORK_SECTIONS = [WorkSection1, WorkSection2, WorkSection3, WorkSection4, WorkSection5];

const WorkPage = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMontassarHovered, setIsMontassarHovered] = useState(false);

  const navigate = useNavigate();

  // Custom hooks
  const { currentSlide, isAnimating, slideRefs, navigateToSection, next, prev } = useSlideNavigation(WORK_SECTIONS.length);
  const { formattedTime } = useTime();

  // Menu handlers
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleNavigateToSection = useCallback((sectionIndex) => {
    navigateToSection(sectionIndex);
    setIsMenuOpen(false);
  }, [navigateToSection]);

  const handleNavigateHome = useCallback(() => {
    navigate('/');
  }, [navigate]);

  // Event listeners
  useEventListeners({
    isAnimating,
    next,
    prev,
    setMousePosition,
    currentSlide,
    isMenuOpen,
    setIsMenuOpen,
    setIsMontassarHovered
  });

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (isAnimating) return;

      switch (e.key) {
        case 'ArrowDown':
        case 'ArrowRight':
          e.preventDefault();
          next();
          break;
        case 'ArrowUp':
        case 'ArrowLeft':
          e.preventDefault();
          prev();
          break;
        case 'Escape':
          e.preventDefault();
          handleNavigateHome();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isAnimating, next, prev, handleNavigateHome]);

  return (
    <div
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
      {/* Slides */}
      {WORK_SECTIONS.map((SectionComponent, index) => (
        <div
          key={`work-slide-${index}`}
          ref={(el) => (slideRefs.current[index] = el)}
          className={`absolute inset-0 w-full h-screen overflow-hidden ${index === currentSlide ? "z-10" : "z-0"
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

          {/* Yin-Yang for each slide */}
          <div className="absolute top-12 left-12 sm:top-14 sm:left-14 md:top-16 md:left-16 lg:top-12 lg:left-12 z-20">
            <Magnet padding={50} disabled={false} magnetStrength={3}>
              <motion.div
                animate={{
                  filter: 'invert(0)'
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <YinYang
                  src={yinYangSvg}
                  isHovered={index === currentSlide && isMontassarHovered}
                  filterClass=""
                  className="space-x-1"
                  size="w-8 h-8"
                  onMouseEnter={() => setIsMontassarHovered(true)}
                  onMouseLeave={() => setIsMontassarHovered(false)}
                />
              </motion.div>
            </Magnet>
          </div>

          {/* Back to Home Button */}
          <div className="absolute top-12 right-12 sm:top-14 sm:right-14 md:top-16 md:right-16 lg:top-12 lg:right-12 z-50">
            <Magnet padding={50} disabled={false} magnetStrength={3}>
              <motion.button
                onClick={handleNavigateHome}
                className="w-12 h-12 flex items-center justify-center transition-all duration-300 border-none bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                >
                  <path
                    d="M19 12H5M12 19L5 12L12 5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </Magnet>
          </div>

          {/* Section Counter */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
            <div className="bg-black/20 backdrop-blur-sm rounded-full px-4 py-2">
              <span className="text-white font-medium">
                {currentSlide + 1} / {WORK_SECTIONS.length}
              </span>
            </div>
          </div>

          {/* Navigation Instructions */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
            <div className="text-center text-white/60 text-sm">
              <p>Use arrow keys or scroll to navigate • Press ESC to go home</p>
            </div>
          </div>
        </div>
      ))}

      {/* Custom Cursor */}
      <CustomCursor mousePosition={mousePosition} />
    </div>
  );
};

export default WorkPage;