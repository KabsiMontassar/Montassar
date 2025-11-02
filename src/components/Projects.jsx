import { Box, Text, VStack, HStack, Image, Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';
import Magnet from './UI/magnet/Magnet';



const fadeInVariants = {
  initial: {
    opacity: 0,
    zIndex: 1,
  },
  animate: {
    opacity: 1,
    zIndex: 1,
    transition: {
      duration: 0.8,
      delay: 0.4,
    },
  },
};

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });


  // Animate the gap between "My" and "Projects" on scroll
  const gapTransform = useTransform(scrollYProgress, [0, .15], [400, 10]);

  const projects = [
    {
      id: '01',
      name: 'E-Commerce Platform',
      image: 'https://picsum.photos/400/300',
      description: 'Full-stack e-commerce solution with React and Node.js'
    },
    {
      id: '02',
      name: 'Mobile Banking App',
      image: 'https://picsum.photos/400/300',
      description: 'Secure mobile banking application with biometric authentication'
    },
    {
      id: '03',
      name: 'Portfolio Website',
      image: 'https://picsum.photos/400/300',
      description: 'Modern portfolio website with advanced animations'
    },
    {
      id: '04',
      name: 'Task Management System',
      image: 'https://picsum.photos/400/300',
      description: 'Collaborative task management platform'
    }
  ];

  return (
    <Box
      ref={containerRef}
      id="projects"
      minH="100vh"
      bg="black"
      p={8}
      pt="120px"
      pb={200}
      overflow="hidden"

    >
      <VStack spacing={100} align="center" mx="auto">
        {/* Scroll-Animated Title */}
        <Flex justify="center" w="100%">
          <motion.div
            style={{
              x: useTransform(gapTransform, (gap) => -gap / 2),
              position: 'relative',
              zIndex: 1
            }}
          >
            <Text
              color="white"
              fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
              fontWeight="bold"
              letterSpacing="-0.02em"
              textAlign="center"
              display="inline-block"
            >
              My
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
              fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
              fontWeight="200"
              letterSpacing="-0.02em"
              textAlign="center"
              display="inline-block"
            >
              Projects
            </Text>
          </motion.div>
        </Flex>


        {/* Projects Grid */}
        <VStack spacing={300} w="100%">
          {projects.map((project, index) => (
            // full box for each project
            <Box
              key={project.id}
              className="project-card"
              position="relative"
              w="100%"
              display="flex"
              marginLeft={index % 2 === 0 ? '250px' : '0'}
              marginRight={index % 2 === 0 ? '0' : '250px'}
              flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
              alignItems="center"
              gap="12px"
              style={{ perspective: 1000 }}
            >
              {/* Project Number - Separate Pop Animation */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.6 }}
                variants={fadeInVariants}
              >
                <Box
                  className="project-number"
                  position="absolute"

                  left={index % 2 === 0 ? "55%" : "45%"}
                  top="10%"
                  transform="translate(-50%, -50%)"
                  zIndex={1}
                >
                  <Text
                    fontSize={{ base: "7xl", md: "9xl", lg: "220px" }}
                    fontWeight="bold"
                    color="#808080"
                    opacity={0.5}
                    textAlign="center"
                  >
                    {project.id}
                  </Text>
                </Box>
              </motion.div>

              {/* Content Wrapper - Fade In Animation */}
              <motion.div
                className="project-content"
                initial={{
                  x: index % 2 === 0 ? -50 : 50,
                  opacity: 0,
                  rotateY: index % 2 === 0 ? 10 : -10,
                }}
                whileInView={{
                  x: 0,
                  opacity: 1,
                  rotateY: index % 2 === 0 ? 10 : -10,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.6 }}
                style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                  alignItems: 'center',
                  width: '100%',
                }}
              >
                {/* Project Image */}
                <Box
                  flex={1}
                  position="relative"
                  maxW="900px"
                  w="100%"
                  style={{
                    transform: `rotateY(${index % 2 === 0 ? 10 : -10}deg)`,
                  }}
                >
                  <Box position="relative" borderRadius="2xl" overflow="hidden">
                    <Image
                      src={project.image}
                      alt={project.name}
                      w="100%"
                      h="450px"
                      objectFit="cover"
                      borderRadius="2xl"
                    />
                  </Box>

                  {/* Project Name + Arrow */}
                  <HStack align="center" mt={6} justify="center" cursor="pointer"
                    onClick={() => window.open(project.link, "_blank")}
                  >
                    <Magnet padding={20} disabled={false} magnetStrength={20}>
                      <Flex>
                        <Text textColor="white" fontSize="6xl" fontWeight="bold">
                          {project.name}
                        </Text>
                        <Box
                          w="40px"
                          h="40px"
                          borderRadius="full"
                          display="flex"
                          pt={5}
                        >
                          <LuArrowUpRight size={24} color="#ffc83d" />
                        </Box>
                      </Flex>
                    </Magnet>
                  </HStack>
                </Box>

                {/* Spacer for alternating layout */}
                <Box flex={1} />
              </motion.div>
            </Box>

          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Projects;