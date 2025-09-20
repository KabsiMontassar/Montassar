import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { formatTime } from "../../utils/helpers";
import { SOCIAL_LINKS } from "../../utils/constants";
import Magnet from "../ui/Magnet";
import { logos as logoData } from "../../assets/logo/index.js";

const SectionT = () => {
  const [formattedTime, setFormattedTime] = useState(() => formatTime(new Date()));
  const [launched, setLaunched] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInitialLaunch, setIsInitialLaunch] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [contactHovered, setContactHovered] = useState(false);
  const [justLeftContact, setJustLeftContact] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const containerRef = useRef(null);
  const timeIntervalRef = useRef(null);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  useEffect(() => {
    timeIntervalRef.current = setInterval(
      () => setFormattedTime(formatTime(new Date())),
      60000
    );
    return () => clearInterval(timeIntervalRef.current);
  }, []);

  const generateLogos = useCallback(() => {
    if (!logoData?.length) return [];
    const logosArray = [];
    const numLogos = Math.min(14, logoData.length);
    const basePositions = [];
    const pointCount = 5;
    const minDistance = 8;

    const randRange = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const isFarEnough = (x, y, points) =>
      points.every((p) => Math.hypot(p.x - x, p.y - y) >= minDistance);

    const generateZone = (xMin, xMax, count) => {
      const zonePoints = [];
      let attempts = 0;
      while (zonePoints.length < count && attempts < 100) {
        const x = randRange(xMin, xMax);
        const y = randRange(-10, 10);
        if (isFarEnough(x, y, zonePoints)) zonePoints.push({ x, y });
        attempts++;
      }
      return zonePoints;
    };

    basePositions.push(...generateZone(-40, -10, pointCount));
    basePositions.push(...generateZone(-5, 5, pointCount));
    basePositions.push(...generateZone(10, 40, pointCount));

    const shuffled = [...logoData].sort(() => Math.random() - 0.5);
    for (let i = 0; i < numLogos; i++) {
      const base = basePositions[i % basePositions.length];
      const logo = shuffled[i];
      if (!logo?.src) continue;

      const posX = isMobile ? `${base.y}vh` : `${base.x}vw`;
      const posY = isMobile ? `${base.x}vw` : `${base.y}vh`;

      // Calculate relative position to contact button (0,0 is center)
      const relativeX = isMobile ? base.y : base.x;
      const relativeY = isMobile ? base.x : base.y;

      logosArray.push({
        id: `logo-${i}`,
        src: logo.src,
        name: logo.name || `Logo ${i}`,
        size: isMobile ? 140 : 230,
        x: posX,
        y: posY,
        relativeX: relativeX, // Store relative x position for repulsion
        relativeY: relativeY, // Store relative y position for repulsion
        rotate: i * 5,
        delay: i * 0.1,
      });
    }
    return logosArray;
  }, [isMobile]);

  const logos = useMemo(() => (launched ? generateLogos() : []), [launched, generateLogos]);


  const handleContactMouseEnter = () => {
    setContactHovered(true);
    setJustLeftContact(false);
  };
  const handleContactMouseLeave = () => {
    setContactHovered(false);
    setJustLeftContact(true);
    // Reset the flag after a short delay
    setTimeout(() => setJustLeftContact(false), 350);
  };

  const logoVariants = useCallback(
    (logo) => {
      const safeH = typeof window !== "undefined" ? window.innerHeight : 800;
      return {
        hidden: {
          x: "0vw",
          y: `${safeH / 2 + 200}px`,
          opacity: 0,
          scale: 0.8,
          rotate: logo.rotate || 0,
        },
        visible: {
          x: logo.x,
          y: logo.y,
          opacity: 1,
          scale: 1,
          rotate: logo.rotate || 0,
          transition: {
            duration: 1,
            delay: isInitialLaunch ? logo.delay : 0,
            ease: [0.22, 1, 0.36, 1],
            type: "tween",
          },
        },
        scattered: {
          x: logo.x,
          y: logo.y,
          opacity: 1,
          scale: 1,
          rotate: logo.rotate || 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
        repelled: {
          x: logo.relativeX > 0
            ? `calc(${logo.x} + 10px)` // Move right logos further right
            : `calc(${logo.x} - 10px)`, // Move left logos further left
          y: logo.relativeY > 0
            ? `calc(${logo.y} + 10px)` // Move bottom logos further down
            : `calc(${logo.y} - 10px)`, // Move top logos further up
          opacity: 1,
          scale: 1,
          rotate: logo.rotate || 0,
          transition: { duration: 0.3, ease: "easeOut" },
        },
        return: {
          x: logo.x,
          y: logo.y,
          opacity: 1,
          scale: 1,
          rotate: logo.rotate || 0,
          transition: { duration: 0.3, ease: "easeOut", delay: 0 }, // No delay for simultaneous return
        },
        exit: {
          x: "0vw",
          y: `${typeof window !== "undefined" ? window.innerHeight / 2 + 200 : 600}px`,
          opacity: 0,
          scale: 0.8,
          rotate: logo.rotate || 0,
          transition: {
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: logo.delay * 0.1 // Staggered exit animation
          },
        },
      };
    },
    [isInitialLaunch]
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let isCurrentlyVisible = false;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setLaunched(true);
            setIsInitialLaunch(true);
            setIsExiting(false);
            isCurrentlyVisible = true;
          } else if (isCurrentlyVisible) {
            // Section just left viewport - trigger exit immediately
            setIsExiting(true);
            isCurrentlyVisible = false;
            setTimeout(() => {
              setLaunched(false);
              setIsExiting(false);
            }, 800);
          }
        });
      },
      { threshold: 0.1 } // Lower threshold for faster detection
    );

    // Additional scroll listener for faster detection
    const handleScroll = () => {
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight && rect.bottom > 0;

      if (!isVisible && isCurrentlyVisible) {
        // Section just left viewport
        setIsExiting(true);
        isCurrentlyVisible = false;
        setTimeout(() => {
          setLaunched(false);
          setIsExiting(false);
        }, 800);
      }
    };

    obs.observe(node);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const circleSize = isMobile ? 230 : 380;

  return (
    <div className="relative w-full h-full min-h-screen bg-gradient-to-r from-black to-[#222121] overflow-hidden">
      <div className="absolute inset-0 opacity-30" />

      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          variants={logoVariants(logo)}
          initial="hidden"
          animate={
            isExiting
              ? "exit"
              : !launched
                ? "hidden"
                : contactHovered
                  ? "repelled"
                  : justLeftContact
                    ? "return"
                    : isHovering
                      ? "scattered"
                      : "visible"
          }
          className="absolute z-10"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: `-${logo.size / 2}px`,
            marginTop: `-${logo.size / 2}px`,
            width: logo.size,
            height: logo.size,
          }}
        >
          <img
            src={logo.src}
            alt={logo.name}
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))" }}
            loading="lazy"
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
        </motion.div>
      ))}

      <div
      //external
        onClick={() => window.open('https://www.linkedin.com/in/montassarkabsi', '_blank')}
        className="absolute z-20 flex items-center justify-center"
        style={{
          left: "50%",
          top: "50%",
          width: `${circleSize}px`,
          height: `${circleSize}px`,
          marginLeft: `-${circleSize / 2}px`,
          marginTop: `-${circleSize / 2}px`,
        }}
      >
        <Magnet
          magnetStrength={7}
          padding={150}
          wrapperClassName="relative"
          innerClassName="transition-transform duration-300 ease-out"
        >
          <div
        onMouseEnter={handleContactMouseEnter}
        onMouseLeave={handleContactMouseLeave}
        className={`
          w-[128px] h-[128px]  sm:w-[128px] sm:h-[128px] md:w-[230px] md:h-[230px] 
          rounded-full flex items-center justify-center text-white font-bold
          relative cursor-pointer
          bg-gradient-to-tr from-[#6f6f6f1e] to-[#d2d2d26d]
          shadow-[0_0_80px_30px_rgba(255,255,255,0.15)] backdrop-blur-md
        `}

          >
        <span className="text-2xl md:text-4xl font-extrabold tracking-wide">
          Contact<span className="text-[#ffe500]">.</span>
        </span>
          </div>
        </Magnet>
      </div>

     
      <motion.div
        ref={containerRef}
        className=" absolute bottom-6 md:bottom-8 px-30 left-4 right-4 flex flex-col md:flex-row justify-between items-center md:items-end z-30 gap-4 text-white"
        initial={{ opacity: 0, y: 40 }}
        animate={launched ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <div className="md:flex flex-col md:flex-row gap-6 md:gap-8 hidden sm:hidden  ">
          <div>
            <div className="text-sm md:text-md mb-1   bg-gradient-to-r from-white to-gray-300
                clip-text text-transparent bg-clip-text">LOCAL TIME</div>
            <div className="text-sm md:text-md   bg-gradient-to-r from-white to-gray-300
                clip-text text-transparent bg-clip-text"
              style={{ letterSpacing: '1px' }}
            >{formattedTime}</div>
          </div>
          <div>
            <div className="text-sm md:text-md mb-1   bg-gradient-to-r from-white to-gray-300
                clip-text text-transparent bg-clip-text">OPEN SOURCE</div>

            <div
              rel="noopener noreferrer"
              className="text-sm md:text-md  transition-colors   bg-gradient-to-r from-white to-gray-300
                clip-text text-transparent bg-clip-text"
            >
              <a href="https://github.com/KabsiMontassar/portfolio"
                style={{ letterSpacing: '1px' }}
                target="_blank">
                View on GitHub
              </a>

            </div>
          </div>
        </div>

        <div className="text-center md:text-right">
          <div className="text-sm md:text-base font-bold mb-1 text-left   bg-gradient-to-r from-white to-gray-300
                clip-text text-transparent bg-clip-text">SOCIALS</div>
          <div className="flex gap-7 justify-center md:justify-end ">
            {SOCIAL_LINKS?.map(({ name, href, external }) => (
              <a
                key={name}
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-xs md:text-sm 
              bg-gradient-to-r from-white to-gray-300
                clip-text text-transparent bg-clip-text
                font-semibold  transition-colors"
              >
                {name}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionT;
