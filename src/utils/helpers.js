// Utility functions for calculations and formatting

/**
 * Calculate distance between two points
 */
export const calculateDistance = (x1, y1, x2, y2) => 
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

/**
 * Calculate magnetic effect for UI elements
 */
export const calculateMagneticEffect = (mousePos, targetPos, radius = 150, strength = 0.4) => {
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

/**
 * Format time for display
 */
export const formatTime = (date) => {
  const options = {
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };

  return date.toLocaleString("en-US", options);
};

/**
 * Get section styles based on current state
 */
export const getSectionStyles = (currentSlide, isMenuOpen, isSectionSButtonHovered) => ({
  menuBackground: currentSlide === 1 ? "bg-gradient-to-br from-black to-[#222121]" : "bg-[#f4f4f4]",
  textColor: currentSlide === 1 ? "text-[#f4f4f4]" : "text-black",
  iconColor: (() => {
    if (currentSlide === 1 && isSectionSButtonHovered) return "text-white";
    switch (currentSlide) {
      case 0: return isMenuOpen ? "text-black" : "text-white";
      case 1: return isMenuOpen ? "text-[#f4f4f4]" : "text-black";
      case 2: return isMenuOpen ? "text-black" : "text-white";
      default: return "text-black";
    }
  })(),
  hoverColor: "hover:text-[#ffe500]",
  filterClass: (() => {
    if (currentSlide === 1 && isSectionSButtonHovered) return "filter invert";
    switch (currentSlide) {
      case 0: return isMenuOpen ? "" : "filter invert";
      case 1: return isMenuOpen ? "filter invert" : "";
      case 2: return isMenuOpen ? "" : "filter invert";
      default: return "";
    }
  })()
});