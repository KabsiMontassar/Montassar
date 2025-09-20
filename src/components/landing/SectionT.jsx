import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { formatTime } from "../../utils/helpers";
import { SOCIAL_LINKS } from "../../utils/constants";
import Magnet from "../ui/Magnet";

import { logos as logoData } from '../../assets/logo/index.js';





const SectionT = () => {
  const [formattedTime, setFormattedTime] = useState(formatTime(new Date()));
  const [launched, setLaunched] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInitialLaunch, setIsInitialLaunch] = useState(true);
  const [logos, setLogos] = useState([]);
  const containerRef = useRef(null);

/**  
 
 

FRAMER 
Figma 
next 
react 
kubernetes 

docker 
firebase 
nestjs

angular 
 
typescript

openai
chakraui
ansible
GSAP
motion.dev

https://www.vipulkumar.dev/#third
*/




  // Update local time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setFormattedTime(formatTime(new Date()));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Generate logos with oriented positions
  const generateLogos = () => {
    const logosArray = [];
    const numLogos = 14; // Changed from 15 to 14
    const basePositions = [];
    const pointCount = 5;
    const minDistance = 8;

    function randRange(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function isFarEnough(x, y, points) {
      return points.every(p => Math.hypot(p.x - x, p.y - y) >= minDistance);
    }

    function generateZone(xMin, xMax, count) {
      const zonePoints = [];
      while (zonePoints.length < count) {
        const x = randRange(xMin, xMax);
        const y = randRange(-10, 10);
        if (isFarEnough(x, y, zonePoints)) {
          zonePoints.push({ x, y });
        }
      }
      return zonePoints;
    }

    basePositions.push(...generateZone(-40, -10, pointCount));
    basePositions.push(...generateZone(-5, 5, pointCount));
    basePositions.push(...generateZone(10, 40, pointCount));

    // Shuffle the logo data array for randomization
    const shuffledLogos = [...logoData].sort(() => Math.random() - 0.5);

    for (let i = 0; i < numLogos; i++) {
      const base = basePositions[i % basePositions.length];
      const logo = shuffledLogos[i % shuffledLogos.length];
      logosArray.push({
        id: `logo-${i + 1}`,
        src: logo.src,
        name: logo.name,
        size: 250, // Set to 250px as requested
        x: `${base.x}vw`,
        y: `${base.y}vh`,
        rotate: i * 5,
        delay: i * 0.1
      });
    }

    return logosArray;
  };

  // Generate logos on mount
  useEffect(() => {
    setLogos(generateLogos());
  }, []);

  // Variants for logos with conditional delays
  const logoVariants = (logo, isInitialLaunch) => ({
    hidden: {
      x: "0vw",
      y: typeof window !== "undefined" ? `${window.innerHeight / 2 + 200}px` : "600px",
      opacity: 0,
      scale: 0.8,
      rotate: logo.rotate
    },
    visible: {
      x: logo.x,
      y: logo.y,
      opacity: 1,
      scale: 1,
      rotate: logo.rotate,
      transition: {
        duration: 1,
        delay: isInitialLaunch ? logo.delay : 0, // Delay only for initial launch
        ease: [0.22, 1, 0.36, 1]
      }
    },
    scattered: {
      x: `calc(${logo.x} + ${parseFloat(logo.x) > 0 ? '15px' : '-15px'})`,
      y: `calc(${logo.y} + ${parseFloat(logo.y) > 0 ? '15px' : '-15px'})`,
      opacity: 1,
      scale: 1,
      rotate: logo.rotate,
      transition: {
        duration: 0.3,
        delay: 0, // No delay for simultaneous movement
        ease: "easeOut"
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

  // Intersection observer for launching animation
  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLogos(generateLogos());
            setLaunched(true);
            setIsInitialLaunch(true);
          } else {
            setLaunched(false);
            setIsInitialLaunch(false);
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
      {/* Logos */}
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          variants={logoVariants(logo, isInitialLaunch)}
          initial="hidden"
          animate={
            !launched
              ? "hidden"
              : isHovering
              ? "scattered"
              : "visible"
          }
          className="absolute z-10"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: `${-logo.size / 2}px`,
            marginTop: `${-logo.size / 2}px`,
            width: logo.size,
            height: logo.size
          }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={logo.src}
              alt={logo.name}
              className="w-full h-full object-contain"
              style={{
                width: '250px',
                height: '250px',
                filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))'
              }}
            />
          </div>
        </motion.div>
      ))}      {/* Central Contact Button */}
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
          <Magnet
            magnetStrength={3}
            padding={150}
            wrapperClassName="relative"
            innerClassName="transition-transform duration-300 ease-out"
          >
            <div
              className="w-64 h-64 rounded-full flex items-center justify-center text-white font-bold shadow-2xl relative overflow-hidden backdrop-blur-sm cursor-pointer"
              style={{ background: "hsla(0,0%,100%,.08)", border: "1px solid hsla(0,0%,100%,.1)" }}
              onMouseEnter={() => {
                setIsHovering(true);
                setIsInitialLaunch(false);
              }}
              onMouseLeave={() => {
                setIsHovering(false);
                setIsInitialLaunch(false);
              }}
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
