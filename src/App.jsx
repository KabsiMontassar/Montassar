import { Box, Flex, Text, Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState } from 'react';
import { ReactLenis, useLenis } from '@studio-freight/react-lenis';
import { motion, AnimatePresence, useTransform, useMotionValueEvent, useScroll } from 'framer-motion';

import { setStoredLanguage } from './utils/localStorage';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import MoreAboutMe from './components/MoreAboutMe';
import MySkills from './components/MySkills';
import Services from './components/Services';
import Projects from './components/Projects';
import GetInTouch from './components/GetInTouch';
import Magnet from './components/UI/Magnet';

function App() {
  const { i18n } = useTranslation();
  const mainContentRef = useRef(null);
  const heroRef = useRef(null);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const lenisRef = useRef();
  const { scrollY } = useScroll();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setStoredLanguage(lang);
  };

  // Calculate main content position based on scroll
  const mainContentY = useTransform(scrollY, (latest) => {
    if (!heroRef.current) return 0;

    const heroHeight = heroRef.current.offsetHeight;
    const heroBottom = heroHeight;
    const distanceFromHeroBottom = latest - (heroHeight * 0.5); // Start appearing when hero is halfway through viewport

    // Calculate Y position - starts at bottom of hero
    if (distanceFromHeroBottom < 0) {
      return 100; // Off-screen below
    }

    // Smoothly move up as user scrolls
    const offset = Math.min(distanceFromHeroBottom, heroHeight);
    return Math.max(0, 100 - (offset / heroHeight) * 100);
  });

  const mainContentOpacity = useTransform(scrollY, (latest) => {
    if (!heroRef.current) return 0;

    const heroHeight = heroRef.current.offsetHeight;
    const scrollStart = heroHeight * 0.5;
    const scrollEnd = heroHeight;

    if (latest < scrollStart) return 0;
    if (latest > scrollEnd) return 1;

    // Fade in during scroll
    return (latest - scrollStart) / (scrollEnd - scrollStart);
  });

  const lenisOptions = {
    lerp: 0.08,
    duration: 1.5,
    smoothWheel: true,
    smoothTouch: false,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
  };

  return (
    <ReactLenis root ref={lenisRef} options={lenisOptions}>
      <Box position="relative" overflow="hidden">
        <Cursor />

        {/* Sticky Header */}
        <Box
          position="sticky"
          top="0"
          left="0"
          right="0"
          bg="white"
          zIndex="50"
          p={4}
          width="100%"
        >
          <Flex justify="space-between" align="center" mx="5%">
            <Magnet padding={100} disabled={false} magnetStrength={20}>

              <Button
                border="none"
                _hover={{ backgroundColor: "transparent" }}
                backgroundColor="transparent"
                fontSize="xl"
                fontWeight="600"
                letterSpacing={1}
                pl={20}
              >
                Kebsi Montassar
              </Button>
            </Magnet>
            <HStack>
              <Magnet padding={20} disabled={false} magnetStrength={20}>

                <Button
                  border="none"
                  _hover={{
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                    transform: "scale(1.1)"
                  }}
                  backgroundColor="transparent"
                  onClick={() => changeLanguage('en')}
                >
                  EN
                </Button>
              </Magnet>
              <Magnet padding={20} disabled={false} magnetStrength={20}>

                <Button
                  border="none"
                  _hover={{
                    backgroundColor: "transparent",
                    fontWeight: "bold",
                    transform: "scale(1.1)"
                  }}
                  backgroundColor="transparent"
                  onClick={() => changeLanguage('fr')}
                  fontWeight={i18n.language === 'fr' ? "bold" : "regular"}
                >
                  FR
                </Button>
              </Magnet>
            </HStack>
          </Flex>
        </Box>

        {/* Hero Section with ref */}
        <Box ref={heroRef} position="relative" zIndex="10">
          <Box >
            <Hero />
          </Box>
        </Box>

        {/* Main Content Overlay - with different background */}
        <motion.div
          ref={mainContentRef}
          id="main-content"
          style={{
            y: mainContentY,
            opacity: mainContentOpacity,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            zIndex: 40,
            backgroundColor: '#f5f5f5', // Different background
            overflowY: 'auto',
          }}
        >
          <Box mx="10%" pt={24}>
            <AboutMe />
            <MoreAboutMe />
            <MySkills />
            <Services />
            <Projects />
            <GetInTouch />
          </Box>
        </motion.div>
      </Box>
    </ReactLenis>
  );
}

export default App;