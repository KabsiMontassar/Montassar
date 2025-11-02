import React from 'react';
import { Box, Text, VStack, Flex } from '@chakra-ui/react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import CircularText from './UI/circularText/CircularText';

const MoreAboutMe = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });




  const gapTransform = useTransform(scrollYProgress, [0, 0.3], [400, 10]);

  const paragraph =
    "I have a deep passion for learning new technologies, especially in effects and animations. I strive to create innovative and engaging digital experiences, pushing boundaries with each project while prioritizing quality above all.";

  // Split paragraph into three parts
  const part1 = "I have a deep passion for learning new technologies,";
  const part2 = "especially in effects and animations. I strive to create";
  const part3 = "innovative and engaging digital experiences, pushing boundaries with each project while prioritizing quality above all.";
  const part4 = "I have a deep passion for learning new technologies,";
  const part5 = "especially in effects and animations. I strive to create";
  const part6 = "innovative and engaging digital experiences, pushing boundaries with each project while prioritizing quality above all.";

  // Configuration for all paragraph animations
  const paragraphConfigs = [
    // Left side paragraphs
    { text: part1, align: "left", selfAlign: "flex-start", rotation: "rotateZ(1.2deg)", delay: 0 },
    { text: part2, align: "left", selfAlign: "flex-start", rotation: "rotateZ(1.2deg)", delay: 0.2 },
    { text: part3, align: "left", selfAlign: "flex-start", rotation: "rotateZ(1.2deg)", delay: 0.4 },
    // Right side paragraphs
    { text: part4, align: "right", selfAlign: "flex-end", rotation: "rotateZ(-1.2deg)", delay: 0.6 },
    { text: part5, align: "right", selfAlign: "flex-end", rotation: "rotateZ(-1.2deg)", delay: 0.8 },
    { text: part6, align: "right", selfAlign: "flex-end", rotation: "rotateZ(-1.2deg)", delay: 1.0 },
  ];

  return (
    <Box
      ref={containerRef}
      id="more-about-me"
      minH="100vh"
      bg="black"
      px={{ base: "4%", sm: "5%", md: "6%", lg: "8%" }}
      py={{ base: 12, sm: 16, md: 20, lg: 24 }}
      pt={{ base: "80px", sm: "100px", md: "120px", lg: "140px" }}
      position="relative"
      overflow="hidden"
    >
      <VStack
        spacing={{ base: 8, sm: 12, md: 16, lg: 20 }}
        align="center"
        maxW={{ base: "100%", sm: "95%", md: "90%", lg: "1500px" }}
        mx="auto"
        w="100%"
      >
        {/* Scroll-Animated Title */}
        <Flex
          justify="center"
          align="center"
          wrap={{ base: "wrap", lg: "nowrap" }}
          position="relative"
          overflow="hidden"
          w="100%"
        >
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
              lineHeight={{ base: "1.1", md: "1" }}
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
              fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl', xl: '8xl' }} letterSpacing="-0.02em"
              textAlign="center"
              display="inline-block"
              lineHeight={{ base: "1.1", md: "1" }}

            >
              about me
            </Text>
          </motion.div>
        </Flex>

        {/* Static Paragraph */}
        <Box
          maxW={{ base: '100%', sm: '95%', md: '85%', lg: '700px', xl: '820px' }}
          textAlign="center"
          px={{ base: 2, md: 4 }}
        >
          <Text
            color="white"
            fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl', xl: '3xl', '2xl': '4xl' }}
            fontWeight="300"
            lineHeight={"1.2"}
            opacity={0.85}
          >
            {paragraph}
          </Text>
        </Box>

        {/* Three Column Section */}
        <VStack
          w="100%"
          mt={{ base: 8, sm: 12, md: 16, lg: 20, xl: 24 }}
        >
          {/* Animated Paragraphs */}
          {paragraphConfigs.map((config, index) => (
            <React.Fragment key={`paragraph-group-${index}`}>
              <Box
                key={`paragraph-${index}`}
                w={{ base: '100%', sm: '95%', md: '85%', lg: '75%', xl: '60%' }}
                textAlign={config.align}
                alignSelf={{ base: "center", md: config.selfAlign }}
                style={{ transform: config.rotation }}
                px={{ base: 2, md: 4 }}

              >
                <motion.div
                  initial={{ opacity: 0, x: config.align === "left" ? -50 : 50 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: config.delay
                    }
                  }}
                  viewport={{ once: true, margin: "-50px" }}
                >
                  <Text
                    color="white"
                    fontSize={{
                      base: 'lg',
                      sm: 'lg',
                      md: 'xl',
                      lg: '2xl',
                      xl: '3xl',
                      '2xl': '5xl'
                    }}
                    fontWeight="200"
                    lineHeight={"0.9"}
                  >
                    {config.text}
                  </Text>
                </motion.div>
              </Box>

              {index === 2 && (
                <Box
                  key={`circular-text-${index}`}
                  my={{ base: 16, sm: 20, md: 24, lg: 28 }}
                  w="100%"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
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
                    <CircularText
                      text="CODE * CREATE * INSPIRE * REPEAT * "
                      onHover="speedUp"
                      fontSize={{ base: '16px', sm: '20px', md: '24px', lg: '28px', xl: '32px' }}
                      starSize='30px'
                      spinDuration={20}
                      className="responsive-circular-text"
                    />
                  </motion.div>
                </Box>
              )}
            </React.Fragment>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default MoreAboutMe;
