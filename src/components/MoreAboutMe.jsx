import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const MoreAboutMe = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate the gap between "More" and "about me" on scroll
  const gapTransform = useTransform(scrollYProgress, [0, 0.3], [400, 20]);

  const paragraph =
    "I have a deep passion for learning new technologies, especially in effects and animations. I strive to create innovative and engaging digital experiences, pushing boundaries with each project while prioritizing quality above all.";

  return (
    <Box
      ref={containerRef}
      id="more-about-me"
      minH="100vh"
      bg="black"
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 16, md: 20, lg: 24 }}
      pt={{ base: '120px', md: '140px', lg: '160px' }}
      position="relative"
      overflow="hidden"
    >
      <VStack spacing={{ base: 12, md: 16, lg: 20 }} align="center" maxW="1200px" mx="auto">
        {/* Scroll-Animated Title */}
        <Flex justify="center" align="center" wrap="wrap" position="relative" overflow="hidden" w="100%">
          <motion.div
            style={{
              x: useTransform(gapTransform, (gap) => -gap / 2),
              position: 'relative',
              zIndex: 1
            }}
          >
            <Text
              color="white"
              fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl', xl: '8xl' }}
              fontWeight="bold"
              letterSpacing="-0.02em"
              textAlign="center"
              display="inline-block"
            >
              More
            </Text>
          </motion.div>

          <motion.div
            style={{
              x: useTransform(gapTransform, (gap) => gap / 2),
              position: 'relative',
              zIndex: 1
            }}
          >
            <Text
              color="white"
              fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl', xl: '8xl' }}
              letterSpacing="-0.02em"
              textAlign="center"
              display="inline-block"
            >
              about me
            </Text>
          </motion.div>
        </Flex>

        {/* Static Paragraph */}
        <Box maxW={{ base: '100%', sm: '90%', md: '700px', lg: '820px' }} textAlign="center">
          <Text
            color="white"
            fontSize={{ base: 'xl', sm: '2xl', md: '3xl', lg: '4xl' }}
            fontWeight="300"
            lineHeight="1.6"
            opacity={0.85}
          >
            {paragraph}
          </Text>
        </Box>

        {/* Three Column Section */}
        <VStack
          spacing={{ base: 12, md: 16, lg: 20 }}

          w="100%"

          mt={{ base: 16, md: 20, lg: 24 }}
        >
          {/* Left Paragraph with Reveal Animation */}
          <Box
            w={{ base: '100%', md: '80%', lg: '60%' }}
            textAlign="left"
            alignSelf="flex-start"
            transform={"rotateZ(1.2deg)"}


          >

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Text
                color="white"
                fontSize={{ base: 'lg', sm: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="200"
                lineHeight=".9"

              >
                {paragraph}
              </Text>
            </motion.div>
          </Box>

          {/* Center Logo */}
          <Box>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{
                opacity: 1,
                scale: 1,
                transition: {
                  duration: 1,
                  ease: "easeOut",
                  delay: 0.2
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Box
                w={{ base: '120px', md: '150px', lg: '180px' }}
                h={{ base: '120px', md: '150px', lg: '180px' }}
                bg="rgba(255, 255, 255, 0.1)"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
                border="2px solid rgba(255, 255, 255, 0.2)"
              >
                <Text
                  color="white"
                  fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
                  fontWeight="bold"
                  opacity={0.6}
                >
                  LOGO
                </Text>
              </Box>
            </motion.div>
          </Box>

          {/* Right Paragraph with Reveal Animation */}
          <Box
            w={{ base: '100%', md: '80%', lg: '60%' }}
            textAlign="right"
            alignSelf="flex-end"
            transform={"rotateZ(-1.2deg)"}

          >
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{
                opacity: 1,
                x: 0,
                transition: {
                  duration: 0.8,
                  ease: "easeOut"
                }
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <Text
                color="white"
                fontSize={{ base: 'lg', sm: '3xl', md: '4xl', lg: '5xl' }}
                fontWeight="200"
                lineHeight=".9"
              >
                {paragraph}
              </Text>
            </motion.div>
          </Box>
        </VStack>
      </VStack>
    </Box>
  );
};

export default MoreAboutMe;
