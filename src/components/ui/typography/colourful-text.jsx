import { useState, useEffect } from "react";
import { motion } from "motion/react";

export default function ColourfulText({ 
  text, 
  fontSize = "clamp(1.3rem, 4.5vw, 6rem)",
  className = "" 
}) {
  const colors = [
    "rgb(131, 179, 32)",
    "rgb(47, 195, 106)",
    "rgb(42, 169, 210)",
    "rgb(4, 112, 202)",
    "rgb(107, 10, 255)",
    "rgb(183, 0, 218)",
    "rgb(218, 0, 171)",
    "rgb(230, 64, 92)",
    "rgb(232, 98, 63)",
    "rgb(249, 129, 47)",
  ];

  const [currentColors, setCurrentColors] = useState(colors);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span 
      className={`inline-block ${className}`}
      style={{
        fontSize: fontSize,
        fontFamily: 'DTGetaiGroteskDisplay, sans-serif',
        fontWeight: 900,
        lineHeight: 1,
      }}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={`${char}-${count}-${index}`}
          initial={{ y: 0 }}
          animate={{
            color: currentColors[index % currentColors.length],
            y: [0, -3, 0],
            scale: [1, 1.01, 1],
            filter: ["blur(0px)", "blur(5px)", "blur(0px)"],
            opacity: [1, 0.8, 1],
          }}
          transition={{
            duration: 0.5,
            delay: index * 0.05,
          }}
          className="inline-block whitespace-pre tracking-tight"
          style={{
            willChange: 'transform, color, filter, opacity',
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
}
