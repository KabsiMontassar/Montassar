import React, { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Box } from "@chakra-ui/react";

const Ballpit = () => {
  const [launched, setLaunched] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 768);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  const skills = [
    "React",
    "JavaScript",
    "TypeScript",
    "Node.js",
    "Python",
    "CSS",
    "HTML",
    "Git",
    "MongoDB",
    "Express",
    "Next.js",
    "Tailwind"
  ];

  const generateSkills = useCallback(() => {
    if (!containerRef.current) return [];

    const skillsArray = [];
    const numSkills = Math.min(12, skills.length);
    const basePositions = [];
    const minDistance = isMobile ? 60 : 80;

    const randRange = (min, max) =>
      Math.floor(Math.random() * (max - min + 1)) + min;

    const isFarEnough = (x, y, points) =>
      points.every((p) => Math.hypot(p.x - x, p.y - y) >= minDistance);

    // Get actual container dimensions
    const containerRect = containerRef.current.getBoundingClientRect();
    const containerWidth = containerRect.width || (isMobile ? 350 : 800);
    const containerHeight = containerRect.height || (isMobile ? 400 : 500);

    // Margin from edges considering skill size
    const skillSize = isMobile ? 150 : 180;
    const margin = skillSize / 2 + 20;

    let attempts = 0;
    while (basePositions.length < numSkills && attempts < 300) {
      const x = randRange(-containerWidth / 2 + margin, containerWidth / 2 - margin);
      const y = randRange(-containerHeight / 2 + margin, containerHeight / 2 - margin);

      if (isFarEnough(x, y, basePositions)) {
        basePositions.push({ x, y });
      }
      attempts++;
    }

    const shuffled = [...skills].sort(() => Math.random() - 0.5);
    for (let i = 0; i < Math.min(numSkills, basePositions.length); i++) {
      const base = basePositions[i];
      const skill = shuffled[i];

      skillsArray.push({
        id: `skill-${i}`,
        name: skill,
        size: skillSize,
        x: `${base.x}px`,
        y: `${base.y}px`,
        relativeX: base.x,
        relativeY: base.y,
        rotate: randRange(-15, 15),
        delay: i * 0.1,
      });
    }

    return skillsArray;
  }, [isMobile, skills]);

  const skillItems = useMemo(() => (launched ? generateSkills() : []), [launched, generateSkills]);

  const skillVariants = useCallback(
    (skill) => {
      return {
        hidden: {
          x: "0px",
          y: "200px",
          opacity: 0,
          scale: 0.8,
          rotate: skill.rotate || 0,
        },
        visible: {
          x: skill.x,
          y: skill.y,
          opacity: 1,
          scale: 1,
          rotate: skill.rotate || 0,
          transition: {
            duration: 1,
            delay: skill.delay,
            ease: [0.22, 1, 0.36, 1],
            type: "tween",
          },
        },
      };
    },
    []
  );

  useEffect(() => {
    const node = containerRef.current;
    if (!node || hasAnimated) return;

    // Small delay to ensure container is rendered with proper dimensions
    const timer = setTimeout(() => {
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasAnimated) {
              setLaunched(true);
              setHasAnimated(true);
            }
          });
        },
        { threshold: 0.1 }
      );

      obs.observe(node);

      return () => {
        obs.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [hasAnimated]);

  return (

    <Box
      w={{
        base: "100%",
        sm: "90%",
        md: "80%",
        lg: "70%",
        xl: "100%"
      }}
      h={{
        base: "400px",
        sm: "450px",
        md: "500px",
        lg: "550px",
        xl: "600px"
      }}
      bg="transparent"
      border="1px solid white"
      borderRadius="3xl"
      position="relative"

      boxShadow="0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1), 0 0 120px rgba(255, 255, 255, 0.05)"
    >
      <Box ref={containerRef} position="relative" w="100%" h="100%" overflow="hidden">
        {skillItems.map((skill) => (
          <Box
            userSelect={"none"}
            key={skill.id}
            as={motion.div}
            variants={skillVariants(skill)}
            initial="hidden"
            animate={launched ? "visible" : "hidden"}
            position="absolute"
            zIndex={10}
            left="50%"

            top="50%"
            marginLeft={`-${skill.size / 2}px`}
            marginTop={`-${skill.size / 2}px`}
            width={`${skill.size}px`}
            height={`${skill.size}px`}
          >
            <Box
              w="full"
              h="full"

              bg="rgba(255, 255, 255, 0.1)"
              backdropFilter="blur(4px)"
              border="1px solid rgba(255, 255, 255, 0.2)"
              borderRadius="50%"
              display="flex"
              alignItems="center"
              justifyContent="center"
              color="white"
              fontWeight="semibold"
              fontSize={{ base: "sm", md: "xl" }}
              boxShadow="lg"
              style={{ filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))" }}
            >
              {skill.name}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Ballpit;