import { Box, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import SpotlightCard from './UI/spotLight/SpotlightCard';
import SplitText from './UI/SplitText/SplitText';

const Services = () => {
  const services = [
    {
      title: 'Website Development',
      description: 'Designing and developing responsive, modern websites with cutting-edge technology to enhance your digital presence and captivate your audience.',
    },
    {
      title: 'Mobile App Development',
      description: 'Creating high-performance mobile applications tailored to your vision, ensuring seamless experiences across all devices.',
    },
    {
      title: 'Project & Thesis Assistance',
      description: 'Providing expert guidance and support for academic projects, including graduation theses, to ensure high-quality and well-structured outcomes.',
    }
  ];

  return (
    <Box id="services" minH="100vh" bg="black" pt="80px">
      <VStack spacing={50} align="flex-start" maxW="1500px" mx="auto">
        <SplitText
          text="Services"
        />


        <Text
          color="white"
          fontSize={{ base: 'lg', sm: '3xl', md: '4xl', lg: '5xl' }}
          fontWeight="200"
          lineHeight=".9"
          maxW="800px">
          I offer expert solutions in website and mobile app development, focusing on performance, scalability, and seamless user experience. Additionally, I provide optimization services for speed and SEO, along with academic project support, including graduation theses. Let's build something exceptional together!
        </Text>

        <SimpleGrid mt={100} columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
          {services.map((service, index) => (
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 255, 255, 0.2)" key={index}>
              <VStack align="start" h="100%" justifyContent={"center"}>


                <Text fontSize="2xl" fontWeight="bold" color="white">
                  {service.title}
                </Text>




                <Text fontSize="xl" color="rgb(156 163 175)" flex={1}>

                  {service.description}
                </Text>
             
              </VStack>



            </SpotlightCard>
          ))}
        </SimpleGrid>
      </VStack>
    </Box>
  );
};

export default Services;