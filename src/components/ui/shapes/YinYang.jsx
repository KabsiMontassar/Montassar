import React from "react";
import { motion } from "framer-motion";
import { YIN_YANG_ROTATION } from "../../../utils/constants";

/**
 * Reusable YinYang component with rotation animation
 */
const YinYang = ({ 
  src, 
  isHovered, 
  className = "", 
  size = "w-10 h-10",
  filterClass = "",
  onMouseEnter,
  onMouseLeave,
  ref: forwardedRef,
  ...props 
}) => {
  return (
    <motion.img
      ref={forwardedRef}
      src={src}
      alt="Yin Yang"
      className={`${size} ${filterClass} ${className}`}
      animate={{
        rotate: isHovered ? 360 : 0,
      }}
      transition={{
        ...YIN_YANG_ROTATION,
        repeat: isHovered ? Infinity : 0,
        repeatType: isHovered ? "loop" : undefined,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...props}
    />
  );
};

export default React.forwardRef((props, ref) => (
  <YinYang {...props} ref={ref} />
));