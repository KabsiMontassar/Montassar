import { Box, Text, VStack, HStack, Image, Flex } from '@chakra-ui/react';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { LuArrowUpRight } from 'react-icons/lu';
import Magnet from './UI/magnet/Magnet';
import { useTranslation } from 'react-i18next';



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
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const gapTransform = useTransform(scrollYProgress, [0, .15], [400, 10]);

  const projects = [
    {
      id: '01',
      name: 'VerdeSeeds',
      image: 'https://picsum.photos/400/300',
    },
    {
      id: '02',
      name: 'Valero',
      image: 'https://picsum.photos/400/300',
    },
    {
      id: '03',
      name: 'FileFlow',
      image: 'https://picsum.photos/400/300',
    },
    {
      id: '04',
      name: 'InsightFlow',
      image: 'https://picsum.photos/400/300',
    },
    {
      id: '05',
      name: 'SecureFlow',
      image: 'https://picsum.photos/400/300',
    },
    {
      id: '06',
      name: 'PhytoScan',
      image: 'https://picsum.photos/400/300',
    },
    {
      id: '07',
      name: 'Greener',
      image: 'https://picsum.photos/400/300',
    }
  ];


  const content = {
    projectsTitleMy: t('projects.titleMy'),
    projectsTitleProjects: t('projects.titleProjects'),
    projects: projects
  }







  return (
    <Box
      ref={containerRef}
      id="projects"
      minH="100vh"
      bg="black"
      p={{ base: "4%", sm: "5%", md: "6%", lg: "8%" }}

      pb={{ base: "100px", sm: "150px", md: "200px", lg: "250px" }}
      overflow="hidden"
    >
      <VStack
        spacing={{ base: 16, sm: 20, md: 24, lg: 28 }}
        align="center"
        mx="auto"

      >
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
              {content.projectsTitleMy}
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
              {content.projectsTitleProjects}
            </Text>
          </motion.div>
        </Flex>

        {/* Projects Grid */}
        <VStack
          spacing={{ base: 20, sm: 24, md: 28, lg: 32 }}
          w="100%"
          mt={{ base: 8, md: 12, lg: 16 }}
        >
          {content.projects.map((project, index) => (
            <Box
              key={project.id}
              className="project-card"
              position="relative"
              w="100%"
              display="flex"
              marginLeft={{
                base: 0,
                lg: index % 2 === 0 ? '10px' : '0',

              }}
              marginRight={{
                base: 0,
                lg: index % 2 === 0 ? '10px' : '0',

              }}
              flexDirection={{
                base: "column",
                lg: index % 2 === 0 ? "row" : "row-reverse"
              }}
              alignItems="center"
              gap={{ base: 4, md: 6, lg: 8 }}
              style={{ perspective: 1000 }}
              px={{ base: 4, md: 6, lg: 8 }}
            >
              {/* Project Number - Responsive positioning */}
              <motion.div
                initial="initial"
                whileInView="animate"
                viewport={{ once: true, amount: 0.6 }}
                variants={fadeInVariants}
              >
                <Box
                  className="project-number"
                  position={{ base: "relative", lg: "absolute" }}
                  left={{
                    base: "auto",
                    lg: index % 2 === 0 ? "55%" : "45%"
                  }}
                  top={{ base: "auto", lg: "10%" }}
                  transform={{
                    base: "none",
                    lg: "translate(-50%, -50%)"
                  }}
                  zIndex={1}
                  mb={{ base: 4, lg: 0 }}
                  textAlign="center"
                >
                  <Text
                    fontSize={{ base: "7xl", md: "9xl", lg: "220px" }}
                    fontWeight="bold"
                    color="#808080"
                    opacity={0.5}
                    textAlign="center"
                    lineHeight="1"
                  >
                    {project.id}
                  </Text>
                </Box>
              </motion.div>

              {/* Content Wrapper - Enhanced responsive animations */}
              <motion.div
                className="project-content"
                initial={{
                  x: index % 2 === 0 ? -50 : 50,
                  opacity: 0,
                  rotateY: index % 2 === 0 ? 10 : -10,
                }}
                whileInView={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                  rotateY: index % 2 === 0 ? 10 : -10,
                }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                viewport={{ once: true, amount: 0.3 }}
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
                  maxW={{ base: "100%", sm: "500px", md: "600px", lg: "700px", xl: "900px" }}
                  w="100%"
                  style={{
                    transform: `rotateY(${index % 2 === 0 ? 10 : -10}deg)`,
                  }}
                >
                  <Box
                    position="relative"
                    borderRadius={{ base: "lg", md: "xl", lg: "2xl" }}
                    overflow="hidden"
                    transition="transform 0.3s ease"
                    _hover={{
                      transform: {
                        base: "scale(1.02)",
                        md: "scale(1.05)"
                      }
                    }}
                  >
                    <Image
                      src={project.image}
                      alt={project.name}
                      w="100%"
                      h={{ base: "250px", sm: "300px", md: "350px", lg: "400px", xl: "450px" }}
                      objectFit="cover"
                      borderRadius={{ base: "lg", md: "xl", lg: "2xl" }}
                    />
                  </Box>

                  {/* Project Name + Arrow - Responsive layout */}
                  <HStack
                    align="center"
                    mt={{ base: 4, md: 6 }}
                    justify={{ base: "center", lg: "center" }}
                    cursor="pointer"
                    onClick={() => window.open(project.link, "_blank")}
                    flexWrap="wrap"
                    spacing={{ base: 2, md: 4 }}
                  >
                    <Magnet
                      padding={{ base: 15, md: 20 }}
                      disabled={false}
                      magnetStrength={20}
                    >
                      <Flex
                        align="center"
                        textAlign={{ base: "center", sm: "center" }}
                      >
                        <Text
                          textColor="white"
                          fontSize={{ base: "xl", md: "4xl", lg: "5xl" }}
                          fontWeight="bold"
                          lineHeight={{ base: "1.2", md: "1.1" }}
                          textAlign={{ base: "center", sm: "left" }}
                        >
                          {project.name}
                        </Text>
                        <Box
                          w={{ base: "24px", md: "32px", lg: "40px" }}
                          h={{ base: "24px", md: "32px", lg: "40px" }}
                          borderRadius="full"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                          mt={{ base: 1, sm: 0 }}
                          ml={{ base: 0, sm: 2 }}
                        >
                          <LuArrowUpRight size={24} color="#ffc83d" />
                        </Box>
                      </Flex>
                    </Magnet>
                  </HStack>
                </Box>

                {/* Spacer for alternating layout - only on desktop */}
                <Box
                  flex={1}
                  display={{ base: "none", lg: "block" }}
                />
              </motion.div>
            </Box>
          ))}
        </VStack>
      </VStack>
    </Box>
  );
};

export default Projects;