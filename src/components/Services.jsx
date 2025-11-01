import { Box, Text, VStack, HStack, Button, SimpleGrid } from '@chakra-ui/react';
import SpotlightCard from './UI/SpotlightCard';
import Magnet from './UI/Magnet';

const Services = () => {
  const services = [
    {
      title: 'Website Development',
      description: 'Designing and developing responsive, modern websites with cutting-edge technology to enhance your digital presence and captivate your audience.',
      buttonText: 'Contact Me'
    },
    {
      title: 'Mobile App Development',
      description: 'Creating high-performance mobile applications tailored to your vision, ensuring seamless experiences across all devices.',
      buttonText: 'Contact Me'
    },
    {
      title: 'Project & Thesis Assistance',
      description: 'Providing expert guidance and support for academic projects, including graduation theses, to ensure high-quality and well-structured outcomes.',
      buttonText: 'Contact Me'
    }
  ];

  return (
    <Box id="services" minH="100vh" bg="black" pt="80px">
      <VStack spacing={100} align="flex-start" maxW="1500px" mx="auto">

        <Text textColor="white" fontSize="7xl" fontWeight="bold">
          Services
        </Text>

        <Text
          color="white"
          fontSize={{ base: 'lg', sm: '3xl', md: '4xl', lg: '5xl' }}
          fontWeight="200"
          lineHeight=".9"
          maxW="800px">
          I offer expert solutions in website and mobile app development, focusing on performance, scalability, and seamless user experience. Additionally, I provide optimization services for speed and SEO, along with academic project support, including graduation theses. Let's build something exceptional together!
        </Text>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
          {services.map((service, index) => (
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)" key={index}>
              <VStack align="start" h="100%" justifyContent={"center"}>
                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {service.title}
                </Text>
                <Text fontSize="xl" color="rgb(156 163 175)" flex={1}>

                  {service.description}
                </Text>
                <Magnet padding={100} disabled={false} magnetStrength={20}>
                <Button

                  variant="outline"
                  fontSize="2xl"
                  px={6}
                  py={6}
                  borderRadius={"full"}
                  fontWeight={"semibold"}
                  bgColor="#141414"
                  borderColor="#272727"
                  color="white"
                _hover={{ bg: 'white', color: 'black' }}
                >

                  {service.buttonText}
                </Button>
                </Magnet>
              </VStack>



            </SpotlightCard>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Services;