import React from "react";
import { motion } from "framer-motion";
import { CURSOR_ANIMATION } from "../../utils/constants";

/**
 * Custom cursor component with smooth animations
 */
const CustomCursor = React.memo(({ mousePosition }) => (
  <>
    {/* Inner cursor dot */}
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
    
    {/* Outer cursor ring */}
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

export default CustomCursor;