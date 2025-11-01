import { Box, Text, VStack, HStack, Image ,Flex} from '@chakra-ui/react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';
import Magnet from './UI/Magnet';

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
        <VStack spacing={200} w="100%">
          {projects.map((project, index) => (
            // full box for each project
            <motion.div
              key={project.id}
              className="project-card"
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                marginLeft: index % 2 === 0 ? '150px' : '0',
                marginRight: index % 2 === 0 ? '0' : '150px',
                flexDirection: index % 2 === 0 ? "row" : "row-reverse",
                alignItems: 'center',
                gap: '12px',
                perspective: 1000, // enables 3D depth
              }}
              initial={{
                x: index % 2 === 0 ? -50 : 50,
                opacity: 0,
                rotateY: index % 2 === 0 ? 10 : -10, // starts slightly tilted
              }}
              whileInView={{
                x: 0,
                opacity: 1,
                rotateY: index % 2 === 0 ? 10 : -10, // stays tilted always
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true, amount: 0.6 }}
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
                  fontSize={{ base: "7xl", md: "9xl", lg: "220px" }}
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
                maxW="900px"
                w="100%"
                transformStyle="preserve-3d"
                style={{
                  transform: `rotateY(${index % 2 === 0 ? 10 : -10}deg)`, // consistent tilt
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

          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Projects;