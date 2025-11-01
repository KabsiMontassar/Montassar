import { Box, Text, VStack, HStack, Image } from '@chakra-ui/react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';

const Projects = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animate the gap between "My" and "Projects" on scroll
  const gapTransform = useTransform(scrollYProgress, [0, 0.3], [200, 20]);

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
      overflow="hidden"
    >
      <VStack spacing={100} align="center" mx="auto">
        {/* Scroll-Animated Title */}
        <Box position="relative" overflow="hidden" w="100%">
          <HStack justify="center" align="center" wrap="wrap" spacing={0} position="relative">
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
          </HStack>
        </Box>

        {/* Projects Grid */}
        <VStack spacing={20} w="100%">
          {projects.map((project, index) => (
            <Box
              key={project.id}
              className="project-card"
              position="relative"
              w="100%"
              display="flex"
              flexDirection={index % 2 === 0 ? "row" : "row-reverse"}
              ml={index % 2 === 0 ? { base: 0, md: 0, lg: 0, xl: 20 } : { base: 0, md: 0, lg: 0, xl: 0 }}
              mr={index % 2 === 0 ? { base: 0, md: 0, lg: 0, xl: 0 } : { base: 0, md: 0, lg: 0, xl: 20 }}
              alignItems="center"
              gap={12}
            >
              {/* Project Number */}
              <Box
                className="project-number"
                position="absolute"
                left="50%"
                top="10%"
                transform="translate(-50%, -50%)"
                zIndex={1}
              >
                <Text
                  fontSize={{ base: "6xl", md: "8xl", lg: "200px" }}
                  fontWeight="bold"

                  color="#808080"
                  opacity={0.5}
                  textAlign="center"
                >
                  {project.id}
                </Text>
              </Box>

              {/* Project Image */}
              <Box
                flex={1}
                position="relative"
                maxW="850px"
                w="100%"
              >
                <Box
                  position="relative"
                  borderRadius="2xl"
                  overflow="hidden"
                  boxShadow="0 0 40px rgba(255, 255, 255, 0.1)"
                  _hover={{
                    boxShadow: "0 0 60px rgba(255, 255, 255, 0.2)",
                    transform: "scale(1.02)",
                    transition: "all 0.3s ease"
                  }}
                >
                  <Image
                    src={project.image}
                    alt={project.name}
                    w="100%"
                    h="450px"
                    objectFit="cover"
                    borderRadius="2xl"
                  />
                </Box>

                {/* Project Name with Arrow */}
                <HStack

                  align="center"
                  mt={6}
                  justify="center"
                >
                  <Text
                    textColor="white"
                    fontSize="6xl"
                    fontWeight="bold"
                  >
                    {project.name}
                  </Text>

                  {/* Arrow pointing to top right */}
                  <Box
                    w="40px"
                    h="40px"
                    borderRadius="full"
                    display="flex"

                    cursor="pointer"
                    _hover={{
                      transform: "scale(1.1)",
                      transition: "transform 0.2s ease"
                    }}
                  >
                    <LuArrowUpRight size={24} color="#ffc83d" />
                  </Box>
                </HStack>
              </Box>

              {/* Spacer for alternating layout */}
              <Box flex={1} />
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Projects;