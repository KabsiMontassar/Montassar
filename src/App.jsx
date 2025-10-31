import { Box } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

  // 🔹 Animate hero scale & rounding for subtle depth
  const scale = useTransform(scrollY, [0, 400], [1, 1.03]);
  const borderRadius = useTransform(scrollY, [0, 400], [0, 40]);

  // 🔹 Move main content upward when scrolling
  const mainContentY = useTransform(scrollY, [0, 400], [0, 0]);

  // 🔹 Animate margin shrink effect (10% → 0%)
  const contentMarginX = useTransform(scrollY, [0, 50, 100], ["5%", "2%", "0%"]);

  // 🔹 GetInTouch animations: width (30% → 100%) and opacity (0 → 1)
  const getInTouchWidth = useTransform(scrollY, [0, 200, 400], ["30%", "60%", "100%"]);
  const getInTouchOpacity = useTransform(scrollY, [0, 200, 400], [0, 0.5, 1]);

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

        {/* 🔸 HERO SECTION (fixed, background layer) */}
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
          <Box bg="white"  >
            <Hero />
          </Box>
        </motion.div>

        <motion.div
          style={{
            y: mainContentY,
            position: "relative",
            zIndex: 10,
          }}
        >
          <motion.div style={{ marginLeft: contentMarginX, marginRight: contentMarginX }}>
            <Box mt="75vh" >
              <AboutMe />
            </Box>
            <MoreAboutMe />
            <MySkills />
            <Services />
            <Projects />
          <motion.div
  style={{
    width: getInTouchWidth,
    opacity: getInTouchOpacity,
    margin: "0 auto",
  }}
  transition={{ type: "spring", stiffness: 100, damping: 20 }}
>
  <Box>
    <GetInTouch />
  </Box>
</motion.div>
          </motion.div>

        </motion.div>
      </Box>
    </ReactLenis>
  );
}

export default App;
