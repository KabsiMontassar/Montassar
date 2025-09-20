import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo } from "react";
import { formatTime } from "../../utils/helpers";
import { SOCIAL_LINKS } from "../../utils/constants";
import Magnet from "../ui/Magnet";

const SectionT = () => {
  const [formattedTime, setFormattedTime] = useState(formatTime(new Date()));
  const [launched, setLaunched] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(formatTime(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const generateRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Define shapes with fixed horizontal positions and stacked start
  const shapes = useMemo(() => {
    const shapesArray = [];
    const numShapes = 15;
const basePositions = [];
const pointCount = 5; // points per zone
const minDistance = 8; // minimum distance between points

function randRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Helper to check distance
function isFarEnough(x, y, points) {
  return points.every(p => Math.hypot(p.x - x, p.y - y) >= minDistance);
}

// Function to generate points for a zone
function generateZone(xMin, xMax, count) {
  const zonePoints = [];
  while (zonePoints.length < count) {
    const x = randRange(xMin, xMax);
    const y = randRange(-20, 20);
    if (isFarEnough(x, y, zonePoints)) {
      zonePoints.push({ x, y });
    }
  }
  return zonePoints;
}

// Left, Middle, Right zones
basePositions.push(...generateZone(-40, -10, pointCount));
basePositions.push(...generateZone(-5, 5, pointCount));
basePositions.push(...generateZone(10, 40, pointCount));



    for (let i = 0; i < numShapes; i++) {
      const base = basePositions[i % basePositions.length];
      shapesArray.push({
        id: `circle-${i + 1}`,
        color: generateRandomColor(),
        size: 250,
        x: `${base.x}vw`,
        y: `${base.y}vh`,
        rotate: i * 24,
        delay: i * 0.1
      });
    }

    return shapesArray;
  }, []);

  const shapeVariants = (shape) => ({
    hidden: {
      x: "0vw", // stacked at center horizontally
      y: typeof window !== "undefined" ? `${window.innerHeight / 2 + 200}px` : "600px", // stacked at bottom
      opacity: 0,
      scale: 0.8,
      rotate: shape.rotate
    },
    visible: {
      x: shape.x, // final horizontal position
      y: shape.y, // final vertical position
      opacity: 1,
      scale: 1,
      rotate: shape.rotate,
      transition: {
        duration: 1, // smooth flight
        delay: shape.delay,
        ease: [0.22, 1, 0.36, 1] // easeOut-like curve
      }
    }
  });


  const magnetVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLaunched(true);
          } else {
            setLaunched(false);
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full bg-black overflow-hidden">
      {/* Shapes */}
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          variants={shapeVariants(shape)}
          initial="hidden"
          animate={launched ? "visible" : "hidden"}
          className="absolute z-10"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: `${-shape.size / 2}px`,
            marginTop: `${-shape.size / 2}px`,
            width: shape.size,
            height: shape.size
          }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: shape.color,
              boxShadow: `0 0 30px ${shape.color}60`
            }}
          />
        </motion.div>
      ))}

      {/* Central Contact Button */}
      <div className="relative z-20 h-full flex items-center justify-center text-white">
        <motion.div
          variants={magnetVariants}
          initial="hidden"
          animate={launched ? "visible" : "hidden"}
          transition={{
            duration: 1,
            delay: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            damping: 15,
            stiffness: 100
          }}
        >
          <Magnet magnetStrength={3} padding={150} wrapperClassName="relative" innerClassName="transition-transform duration-300 ease-out">
            <div
              className="w-64 h-64 rounded-full flex items-center justify-center text-white font-bold shadow-2xl relative overflow-hidden backdrop-blur-sm"
              style={{ background: "hsla(0,0%,100%,.08)", border: "1px solid hsla(0,0%,100%,.1)" }}
            >
              <span className="text-xl font-bold z-10 relative tracking-wide">Contact.</span>
              <div
                className="absolute inset-0 rounded-full opacity-30"
                style={{ background: "radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%)" }}
              />
            </div>
          </Magnet>
        </motion.div>
      </div>

      {/* Bottom Info */}
      <motion.div
        ref={containerRef}
        className="absolute bottom-8 left-8 right-8 flex justify-between items-end z-30"
        variants={bottomVariants}
        initial="hidden"
        animate={launched ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="flex space-x-8">
          <div className="text-left">
            <div className="text-lg font-bold mb-1 text-white">LOCAL TIME</div>
            <div className="text-lg font-bold text-white">{formattedTime}</div>
          </div>
          <div className="text-left">
            <div className="text-lg mb-1 text-white">OPEN SOURCE</div>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-white hover:text-gray-300 transition-colors duration-300">View on GitHub</a>
          </div>
        </div>

        <div className="text-right">
          <div className="text-base font-bold mb-1 text-white">SOCIALS</div>
          <div className="flex flex-row space-x-3">
            {SOCIAL_LINKS.map(({ name, href, external }) => (
              <a key={name} href={href} {...(external && { target: "_blank", rel: "noopener noreferrer" })} className="text-xs font-semibold text-white hover:text-gray-300 transition-colors duration-300">{name}</a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionT;
