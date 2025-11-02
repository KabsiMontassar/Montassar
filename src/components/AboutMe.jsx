import { Box, Text, Flex, VStack, Image, Card, CardBody } from '@chakra-ui/react';
import image from '../assets/image.jpg';
import ScrollVelocity from './UI/scrollVelocity/ScrollVelocity';
import SplitText from './UI/SplitText/SplitText';

const AboutMe = () => {

  // Create scroll-based transforms for curved loops




  const contents = {
    marqueeText1: "Montassar kebsi Montassar kebsi Montassar kebsi",
    marqueeText2: " Personal Website Personal Website Personal Website",
    title: "About Me",
    description: "I'm Kebsi Montassar Full Stack Developer with 6 years of experience, specializing in frontend development. I focus on building high-performance, user-friendly web and mobile applications that deliver seamless experiences.",
    signature: "Montassar",
  }








  return (
    <Box 
      id="about-me" 
      minH={{ base: "100vh", md: "100vh" }} 
      bg="black" 
      p={{ base: "4%", sm: "5%", md: "6%", lg: "8%" }} 
      pt={{ base: "100px", sm: "100px", md: "180px", lg: "250px" }}
      position="relative"
      overflow="hidden"
    >
      <Flex
        direction={{ base: "column", lg: "row" }}
        align={{ base: "center", lg: "flex-start" }}
        justify="space-between"
        gap={{ base: 8, sm: 10, md: 12, lg: 16 }}
        maxW={{ base: "100%", sm: "95%", md: "90%", lg: "1450px" }}
        mx="auto"
        minH={{ base: "auto", lg: "500px" }}
      >
        {/* Left Side - Text Content */}
        <VStack 
          align={{ base: "center", lg: "flex-start" }} 
          spacing={{ base: 6, sm: 8, md: 10, lg: 12 }} 
          flex={1} 
          maxW={{ base: "100%", lg: "65%" }}
          textAlign={{ base: "center", lg: "left" }}
          w="100%"
        >
            <Box w="100%" display="flex" justifyContent={{ base: "center", lg: "flex-start" }}>
              <SplitText
                text="About Me"
                fontWeight="bold"
              />
            </Box>

            <Text
              textColor="white"
              fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl", xl: "4xl" }}
              fontWeight="200"
              maxW={{ base: "100%", md: "90%", lg: "700px" }}
              lineHeight={{ base: "1.6", md: "1.5", lg: "1.4" }}
              textAlign={{ base: "center", lg: "left" }}
            >
              {contents.description}
            </Text>

            <Text
              textColor="white"
              fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl", xl: "7xl" }}
              fontWeight="100"
              className="signature"
              mt={{ base: 4, md: 6 }}
              textAlign={{ base: "center", lg: "left" }}
            >
              {contents.signature}
            </Text>
        </VStack>

        {/* Right Side - Image Card */}
        <Box
          flex={{ base: "none", lg: 1 }}
          maxW={{ base: "350px", sm: "400px", md: "450px", lg: "35%" }}
          w={{ base: "100%", lg: "auto" }}
          pb={{ base: 8, md: 12, lg: 16 }}
          mt={{ base: 8, lg: 0 }}
        >
          <Card
            transition="all 0.5s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              transform: { base: "scale(1.02)", md: "scale(1.05)" },
              boxShadow: { base: "0 15px 25px rgba(0, 0, 0, 0.3)", md: "0 20px 30px rgba(0, 0, 0, 0.3)" },
            }}
            bg="gray.800"
            borderRadius={{ base: "xl", md: "2xl" }}
            overflow="hidden"
            boxShadow={{ base: "xl", md: "2xl" }}
            h={{ base: "350px", sm: "400px", md: "450px", lg: "500px", xl: "600px" }}
            w="100%"
            position="relative"
          >
            <CardBody p={0}>
              <Image
                src={image}
                alt="Montassar"
                objectFit="cover"
                objectPosition="center"
                w="100%"
                h="100%"
                borderRadius={{ base: "xl", md: "2xl" }}
                transition="transform 0.5s ease"
                _hover={{ transform: "scale(1.1)" }}
              />
            </CardBody>
          </Card>
        </Box>
      </Flex>
      
      {/* Scroll Velocity Section */}
      <Box  my={{ base: 50, sm: 120, md: 150, lg: 150 }} transform="rotateZ(-10deg)">
        <ScrollVelocity texts={['Montassar Kebsi', 'Personal Website']}
          velocity={"10"}
          className="custom-scroll-text" />
      </Box>
    </Box>
  );
};

export default AboutMe;
