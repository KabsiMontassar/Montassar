import { Box, Flex, Text, Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect, useState, forwardRef } from 'react';
import { ReactLenis } from '@studio-freight/react-lenis';
import { motion, useScroll, useTransform } from 'framer-motion';

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
  const { scrollY } = useScroll();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setStoredLanguage(lang);
  };

  // --- SCROLL TAKEOVER LOGIC ---
  const expandScale = useTransform(scrollY, [0, 500, 1000], [1, 1, 1.05]);
  const borderRadius = useTransform(scrollY, [0, 500, 1000], [40, 40, 0]);

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
      <Box position="relative" overflow="hidden" bg="white">
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
                _hover={{ backgroundColor: 'transparent' }}
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
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    transform: 'scale(1.1)',
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
                    backgroundColor: 'transparent',
                    fontWeight: 'bold',
                    transform: 'scale(1.1)',
                  }}
                  backgroundColor="transparent"
                  onClick={() => changeLanguage('fr')}
                  fontWeight={i18n.language === 'fr' ? 'bold' : 'regular'}
                >
                  FR
                </Button>
              </Magnet>
            </HStack>
          </Flex>
        </Box>

        {/* Hero Section */}
        <motion.div
          style={{
            scale: expandScale,
            borderRadius,
            overflow: 'hidden',
            originY: 0.5,
            zIndex: 10,
          }}
        >
          <Hero />
        </motion.div>

        {/* Main Content (expands and fades in) */}
        <motion.div
          style={{
            transformOrigin: 'top center',
         
            position: 'relative',
            zIndex: 5,
          }}
        >
          {/* Each section gets full-screen feel */}
          <Box mx="10%" pt={24} minH="100vh">
            <AboutMe />
          </Box>
          <Box mx="10%" pt={24} minH="100vh">
            <MoreAboutMe />
          </Box>
          <Box mx="10%" pt={24} minH="100vh">
            <MySkills />
          </Box>
          <Box mx="10%" pt={24} minH="100vh">
            <Services />
          </Box>
          <Box mx="10%" pt={24} minH="100vh">
            <Projects />
          </Box>
          <Box mx="10%" pt={24} minH="100vh">
            <GetInTouch />
          </Box>
        </motion.div>
      </Box>
    </ReactLenis>
  );
}

export default App;
