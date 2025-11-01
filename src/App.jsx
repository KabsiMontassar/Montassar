import { Box, useBreakpointValue } from "@chakra-ui/react";
import { ReactLenis } from "@studio-freight/react-lenis";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
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
  const heroRef = useRef(null);

  const [headerColor, setHeaderColor] = useState("black"); // default black for Hero

  // Track scroll to dynamically change header color
  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroHeight = heroRef.current?.offsetHeight || 0;
    const getInTouchTop = getInTouchRef.current?.offsetTop || 0;
    if (latest < heroHeight) {
      setHeaderColor("black"); // Hero background is white
    } else if (latest >= heroHeight && latest < getInTouchTop) {
      setHeaderColor("white"); // Middle sections have black background
    } else {
      setHeaderColor("black"); // GetInTouch background is white
    }
  });

  // GetInTouch scroll-based animation
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(0);
  useLayoutEffect(() => {
    if (getInTouchRef.current) {
      const rect = getInTouchRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || window.pageYOffset;
      const offsetTop = rect.top + scrollTop;
      setStart(offsetTop - window.innerHeight);
      setEnd(offsetTop);
    }
  }, []);

  const scale = useTransform(scrollY, [0, 400], [1, 1.03]);
  const borderRadius = useTransform(scrollY, [0, 400], [0, 40]);
  const mainContentY = useTransform(scrollY, [0, 400], [0, 0]);
  const contentMarginX = useTransform(scrollY, [0, 50, 100], ["5%", "2%", "0%"]);
  const getInTouchWidth = useTransform(scrollY, [start, end - 300], ["30%", "100%"]);

  // Responsive values
  const heroHeight = useBreakpointValue({ base: "60vh", sm: "70vh", md: "75vh", lg: "75vh" });
  const getInTouchStartWidth = useBreakpointValue({ base: "50%", sm: "40%", md: "30%", lg: "30%" });

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
      <Header textColor={headerColor} />

      <Box position="relative" bg="white" overflow="hidden" ref={containerRef}>
        <Cursor />

        <motion.div
          ref={heroRef}
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
          <Box bg="white" h={heroHeight}>
            <Hero />
          </Box>
        </motion.div>

        {/* Placeholder to reserve Hero space */}
        <Box h={heroHeight} />

        {/* MAIN CONTENT */}
        <motion.div style={{ y: mainContentY, position: "relative", zIndex: 10 }}>
          <motion.div style={{ marginLeft: contentMarginX, marginRight: contentMarginX }}>
            <AboutMe />
            <MoreAboutMe />
            <MySkills />
            <Services />
            <Projects />

            {/* GETINTOUCH */}
            <Box bg="black">
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
