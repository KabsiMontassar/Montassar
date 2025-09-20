import { motion } from "framer-motion";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { formatTime } from "../../utils/helpers";
import { SOCIAL_LINKS } from "../../utils/constants";
import Magnet from "../ui/Magnet";
import { logos as logoData } from "../../assets/logo/index.js";

const bottomVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const SectionT = () => {
  const [formattedTime, setFormattedTime] = useState(() => formatTime(new Date()));
  const [launched, setLaunched] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isInitialLaunch, setIsInitialLaunch] = useState(true);

  const containerRef = useRef(null);
  const observerRef = useRef(null);
  const timeIntervalRef = useRef(null);

  /** Add gradient keyframes only once */
  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  /** Update local time every minute */
  useEffect(() => {
    timeIntervalRef.current = setInterval(
      () => setFormattedTime(formatTime(new Date())),
      60000
    );
    return () => clearInterval(timeIntervalRef.current);
  }, []);

  /** Generate scattered logos */
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
      logosArray.push({
        id: `logo-${i}`,
        src: logo.src,
        name: logo.name || `Logo ${i}`,
        size: 250,
        x: `${base.x}vw`,
        y: `${base.y}vh`,
        rotate: i * 5,
        delay: i * 0.1,
      });
    }

    return logosArray;
  }, []);

  const logos = useMemo(() => (launched ? generateLogos() : []), [launched, generateLogos]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  /** Motion variants for logos */
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
      };
    },
    [isInitialLaunch]
  );

  /** Trigger launch when visible */
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          setLaunched(e.isIntersecting);
          setIsInitialLaunch(e.isIntersecting);
        }),
      { threshold: 0.35 }
    );
    obs.observe(node);
    observerRef.current = obs;
    return () => obs.disconnect();
  }, []);

  return (
    <div className="relative w-full h-full bg-gradient-to-r from-black to-[#222121] overflow-hidden">
      <div className="absolute inset-0 opacity-30" />

      {/* ✅ Animated Logos */}
      {logos.map((logo) => (
        <motion.div
          key={logo.id}
          variants={logoVariants(logo)}
          initial="hidden"
          animate={!launched ? "hidden" : isHovering ? "scattered" : "visible"}
          className="absolute z-10"
          style={{
            left: "50%",
            top: "50%",
            marginLeft: `-${(logo.size || 250) / 2}px`,
            marginTop: `-${(logo.size || 250) / 2}px`,
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

      {/* ✅ Contact button (always visible, no animation) */}
      <div
        className="absolute z-20"
        style={{
          left: "50%",
          top: "50%",
          marginLeft: "-128px",
          marginTop: "-128px",
          width: "256px",
          height: "256px",
        }}
      >
        <Magnet
          magnetStrength={3}
          padding={150}
          wrapperClassName="relative"
          innerClassName="transition-transform duration-300 ease-out"
        >
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-64 h-64 rounded-full flex items-center justify-center text-white font-bold relative cursor-pointer shadow-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              backdropFilter: "blur(10%)",
              WebkitBackdropFilter: "blur(10%)",
            }}
          >
            <span className="text-3xl font-bold tracking-wide">Contact
              <span  className="text-[#ffe500]">.</span>
            </span>
          </div>
        </Magnet>
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
          <div className="text-left text-white">
            <div className="text-lg font-bold mb-1">LOCAL TIME</div>
            <div className="text-lg font-bold">{formattedTime}</div>
          </div>
          <div className="text-left text-white">
            <div className="text-lg mb-1">OPEN SOURCE</div>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-bold hover:text-gray-300 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>

        <div className="text-right text-white">
          <div className="text-base font-bold mb-1">SOCIALS</div>
          <div className="flex space-x-3">
            {SOCIAL_LINKS?.map(({ name, href, external }) => (
              <a
                key={name}
                href={href}
                {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                className="text-xs font-semibold hover:text-gray-300 transition-colors"
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
