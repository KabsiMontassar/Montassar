import { Box, Text, Flex, VStack, Image, Card, CardBody } from '@chakra-ui/react';
import { motion, scale, useScroll, useTransform } from 'framer-motion';
import image from '../assets/image.jpg';
import CurvedLoop from './UI/CurvedLoop';
import { t } from 'i18next';
const AboutMe = () => {
  const { scrollYProgress } = useScroll();

  // Create scroll-based transforms for curved loops
  const curve1X = useTransform(scrollYProgress, [0, 1], [0, 300]); // Move right
  const curve2X = useTransform(scrollYProgress, [0, 1], [0, -300]); // Move left




  const contents = {
    marqueeText1: "Montassar kebsi Montassar kebsi Montassar kebsi",
    marqueeText2: " Personal Website Personal Website Personal Website",
    title: "About Me",
    description: "I'm Kebsi Montassar Full Stack Developer with 6 years of experience, specializing in frontend development. I focus on building high-performance, user-friendly web and mobile applications that deliver seamless experiences.",
    signature: "Montassar",
  }








  return (
    <Box id="about-me" minH="100vh" bg="black" p={{ base: 4, md: 8 }} pt={{ base: "100px", md: "250px" }}>
      <Flex
        direction={{ base: "column", md: "row" }}
        align="top"
        justify="space-between"
        gap={8}
        maxW="1500px"
        mx="auto"
      >
        {/* Left Side - Text Content */}
        <VStack align="flex-start" spacing={10} flex={1} maxW={{ base: "100%", md: "60%" }}>
          <Text
            textColor="white"
            fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }}
            fontWeight="bold"
            lineHeight="1.1"
          >
            {contents.title}
          </Text>

          <Text
            textColor="white"
            fontSize={{ base: "md", md: "lg", lg: "4xl" }}
            fontWeight="200"
            maxW="700px"
          >
            {contents.description}
          </Text>

          <Text
            textColor="white"
            fontSize={{ base: "2xl", md: "3xl", lg: "7xl" }}
            fontWeight="very light"
            className="signature"
            mt={4}
          >
            {contents.signature}
          </Text>
        </VStack>

        {/* Right Side - Image Card */}
        <Box
          flex={1}
          maxW={{ base: "100%", md: "30%" }}
          transform="rotateZ(-10deg)"
        >
          <Card
            transition="transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)",
            }}
            bg="gray.800"
            borderRadius="2xl"
            overflow="hidden"
            boxShadow="2xl"
            h={{ base: "400px", md: "500px", lg: "600px" }}
            w="100%"
          >
            <CardBody p={0}>
              <Image
                src={image}
                alt="Montassar"
                objectFit="cover"
                w="100%"
                h="100%"
                borderRadius="2xl"
              />
            </CardBody>
          </Card>
        </Box>
      </Flex>
      <Box my={100} transform="rotateZ(-10deg)">
        <motion.div style={{ x: curve1X }} >
          <CurvedLoop
            marqueeText={contents.marqueeText1}
            speed={0}
            curveAmount={0}
            interactive={true}
            className="about-me-curve"
          />
        </motion.div>
        <motion.div style={{ x: curve2X }}>
          <CurvedLoop
            marqueeText={contents.marqueeText2}
            speed={0}
            curveAmount={0}
            interactive={true}
          />
        </motion.div>
      </Box>
    </Box>
  );
};

export default AboutMe;
