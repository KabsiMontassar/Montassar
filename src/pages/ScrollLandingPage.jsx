import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";

// Components
import SectionF from "../components/landing/SectionF";
import SectionS from "../components/landing/SectionS";
import SectionT from "../components/landing/SectionT";
import CustomCursor from "../components/ui/CustomCursor";
import YinYang from "../components/ui/YinYang";
import Magnet from "../components/ui/Magnet";
import MobileNavigationMenu from "../components/navigation/MobileNavigationMenu";
import DesktopNavigationMenu from "../components/navigation/DesktopNavigationMenu";

// Hooks
import { useSlideNavigation } from "../hooks/useSlideNavigation";
import { useTime } from "../hooks/useTime";
import { useEventListeners } from "../hooks/useEventListeners";

// Utils
import { getSectionStyles } from "../utils/helpers";

// Assets
import yinYangSvg from "../assets/images/yin-yang.svg";

// Constants
const SECTIONS = [SectionF, SectionS, SectionT];

const ScrollLandingPage = () => {
  // State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMontassarHovered, setIsMontassarHovered] = useState(false);
  const [isSectionSButtonHovered, setIsSectionSButtonHovered] = useState(false);

  // Custom hooks
  const { currentSlide, isAnimating, slideRefs, navigateToSection, next, prev } = useSlideNavigation(SECTIONS.length);
  const { formattedTime } = useTime();

  // Menu handlers
  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  const handleNavigateToSection = useCallback((sectionIndex) => {
    navigateToSection(sectionIndex);
    setIsMenuOpen(false);
  }, [navigateToSection]);

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

  // Styles
  const sectionStyles = getSectionStyles(currentSlide, isMenuOpen, isSectionSButtonHovered);

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
      {SECTIONS.map((SectionComponent, index) => (
        <div
          key={`slide-${index}`}
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
            <SectionComponent
              onButtonHover={index === 1 ? setIsSectionSButtonHovered : undefined}
            />
          </div>

          {/* Yin-Yang for each slide */}
          <div className="absolute top-8 left-8 z-20 mobile-yin-yang tablet-yin-yang large-yin-yang">
            <Magnet padding={100} disabled={false} magnetStrength={3}>
              <motion.div
                animate={{
                  filter: getSectionStyles(index, isMenuOpen, isSectionSButtonHovered).filterClass.includes('invert') ? 'invert(1)' : 'invert(0)'
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <YinYang
                  src={yinYangSvg}
                  isHovered={index === currentSlide && isMontassarHovered}
                  filterClass="" // Remove static filter class since we're animating it
                  className="space-x-1"
                  onMouseEnter={() => setIsMontassarHovered(true)}
                  onMouseLeave={() => setIsMontassarHovered(false)}
                />
              </motion.div>
            </Magnet>
          </div>

          {/* Menu Button for each slide */}
          <div className="absolute border-none top-12 right-12 z-50">
            <Magnet padding={50} disabled={false} magnetStrength={3}>
              <motion.button
                onClick={toggleMenu}
                className=" w-12 h-12 flex items-center justify-center transition-all duration-300 border-none bg-transparent mobile-menu-button tablet-menu-button"
                animate={{
                  color: (() => {
                    if (index === 1 && isSectionSButtonHovered) return "#ffffff";
                    switch (index) {
                      case 0: return isMenuOpen ? "#000000" : "#ffffff";
                      case 1: return isMenuOpen ? "#f4f4f4" : "#000000";
                      case 2: return isMenuOpen ? "#000000" : "#ffffff";
                      default: return "#000000";
                    }
                  })()
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H21M3 16H21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.button>
            </Magnet>
          </div>
        </div>
      ))}

      {/* Additional Menu Button - Only visible when menu is open */}
      {isMenuOpen && (
        <div className="fixed top-12 right-12 z-60">
          <Magnet padding={50} disabled={false} magnetStrength={3}>
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              onClick={toggleMenu}
              className="w-12 h-12 flex items-center justify-center transition-all duration-300 border-none bg-transparent"
              style={{
                color: (() => {
                  switch (currentSlide) {
                    case 0: return "#000000";
                    case 1: return "#f4f4f4";
                    case 2: return "#000000";
                    default: return "#000000";
                  }
                })()
              }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.button>
          </Magnet>
        </div>
      )}

      {/* Mobile Navigation Menu */}
      <MobileNavigationMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navigateToSection={handleNavigateToSection}
        sectionStyles={sectionStyles}
        formattedTime={formattedTime}
        yinYangSvg={yinYangSvg}
        isMontassarHovered={isMontassarHovered}
        setIsMontassarHovered={setIsMontassarHovered}
      />

      {/* Desktop Navigation Menu */}
      <DesktopNavigationMenu
        isMenuOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navigateToSection={handleNavigateToSection}
        sectionStyles={sectionStyles}
        formattedTime={formattedTime}
        yinYangSvg={yinYangSvg}
        isMontassarHovered={isMontassarHovered}
        setIsMontassarHovered={setIsMontassarHovered}
      />

      {/* Custom Cursor */}
      <CustomCursor mousePosition={mousePosition} />
    </div>
  );
};

export default ScrollLandingPage;