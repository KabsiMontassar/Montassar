import { Box } from "@chakra-ui/react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";

import Cursor from "./components/Cursor";
import Hero from "./components/Hero";
import AboutMe from "./components/AboutMe";
import MoreAboutMe from "./components/MoreAboutMe";
import MySkills from "./components/MySkills";
import Services from "./components/Services";
import Projects from "./components/Projects";
import GetInTouch from "./components/GetInTouch";
import Header from "./components/Header";

function App() {
  const { scrollY } = useScroll();
  const containerRef = useRef(null);
  const getInTouchRef = useRef(null);

  // Store scroll positions for GetInTouch animation
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);

  useLayoutEffect(() => {
    if (getInTouchRef.current) {
      const rect = getInTouchRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const offsetTop = rect.top + scrollTop;

      setStart(offsetTop - window.innerHeight); // animation starts when bottom reaches viewport
      setEnd(offsetTop); // animation ends when fully visible
    }
  }, []);

  // 🔹 Animate hero scale & rounding for subtle depth
  const scale = useTransform(scrollY, [0, 400], [1, 1.03]);
  const borderRadius = useTransform(scrollY, [0, 400], [0, 40]);

  // 🔹 Move main content upward
  const mainContentY = useTransform(scrollY, [0, 400], [0, 0]);

  // 🔹 Animate horizontal margins
  const contentMarginX = useTransform(scrollY, [0, 50, 100], ["5%", "2%", "0%"]);

  // 🔹 GetInTouch width based on scrollY
  const getInTouchWidth = useTransform(scrollY, [start, end - 300], ["30%", "100%"]);

  const lenisOptions = {
    lerp: 0.08,
    duration: 1.5,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
  };

  return (
    <ReactLenis root options={lenisOptions}>
      <Header />

      <Box position="relative" bg="white" overflow="hidden" ref={containerRef}>
        <Cursor />

        {/* 🔸 HERO SECTION */}
        <motion.div
          style={{
            scale,
            borderRadius,
            overflow: "hidden",
            zIndex: 1,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
          }}
        >
          <Box bg="white">
            <Hero />
          </Box>
        </motion.div>

        {/* 🔸 MAIN CONTENT */}
        <motion.div style={{ y: mainContentY, position: "relative", zIndex: 10 }}>
          <motion.div style={{ marginLeft: contentMarginX, marginRight: contentMarginX }}>
            <Box mt="75vh">
              <AboutMe />
            </Box>
            <MoreAboutMe />
            <MySkills />
            <Services />
            <Projects />

            {/* 🔹 GetInTouch */}
            <Box  bgColor={"black"}>
              <motion.div
                ref={getInTouchRef}
                style={{
                  width: getInTouchWidth,
                  margin: "0 auto",
                  minHeight: "100vh",
                }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
              >
                <GetInTouch />
              </motion.div>
            </Box>
          </motion.div>

        </motion.div>
      </Box>
    </ReactLenis>
  );
}

export default App;
