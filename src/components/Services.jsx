import { Box, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import SpotlightCard from './UI/spotLight/SpotlightCard';
import SplitText from './UI/SplitText/SplitText';
import { useTranslation } from 'react-i18next';
const Services = () => {
  const { t, i18n } = useTranslation();


  const content = {
    servicesTitle: t('services.servicesTitle'),
    servicesDescription: t('services.servicesDescription'),

    services: [
      {
        title: t('services.fullstack.title'),
        description: t('services.fullstack.description'),
      },
      {
        title: t('services.ai.title'),
        description: t('services.ai.description'),
      },
      {
        title: t('services.cloud.title'),
        description: t('services.cloud.description'),
      }
     
    ],
  };


  return (
    <Box
      id="services"
      minH={{ base: "100vh", md: "100vh" }}
      bg="black"
      pt={{ base: "60px", sm: "70px", md: "80px", lg: "100px" }}
      px={{ base: "4%", sm: "5%", md: "6%", lg: "8%" }}
      pb={{ base: "60px", sm: "80px", md: "100px", lg: "120px" }}
    >
      <VStack
        spacing={{ base: 8, sm: 12, md: 16, lg: 20 }}
        align={{ base: "center", lg: "flex-start" }}
        maxW={{ base: "100%", sm: "95%", md: "90%", lg: "1500px" }}
        mx="auto"
        w="100%"
      >
        {/* Services Title */}
        <Box w="100%" display="flex" justifyContent={{ base: "center", lg: "flex-start" }}>
          <SplitText
            key={`services-title-${i18n.language}`}
            text={content.servicesTitle}
          />
        </Box>

        {/* Description Text */}
        <Text
          color="white"
          fontSize={{ base: 'md', sm: 'lg', md: 'xl', lg: '2xl', xl: '3xl', '2xl': '4xl' }}
          fontWeight="200"
          lineHeight={{ base: "1.4", md: "1.2", lg: "1.1" }}
          maxW={{ base: "100%", md: "90%", lg: "800px" }}
          textAlign={{ base: "center", lg: "left" }}
          px={{ base: 2, md: 0 }}
        >
          {content.servicesDescription}
        </Text>

        {/* Services Grid */}
        <SimpleGrid
          mt={{ base: 12, sm: 16, md: 20, lg: 24 }}
          columns={{ base: 1, md: 2, xl: 3 }}
          spacing={{ base: 4, sm: 6, md: 8, lg: 10 }}
          w="100%"
          maxW="100%"
        >
          {content.services.map((service, index) => (
            <SpotlightCard
              className="responsive-spotlight-card"
              spotlightColor="rgba(255, 255, 255, 0.2)"
              key={index}
            >
              <VStack
                align="start"
                h="90%"
                justifyContent="space-between"
                spacing={{ base: 4, md: 6 }}
                p={{ base: 2, md: 4 }}
              >
                <Text
                  fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
                  fontWeight="bold"
                  color="white"
                  lineHeight={{ base: "1.3", md: "1.2" }}
                >
                  {service.title}
                </Text>

                <Text
                  fontSize={{ base: "sm", sm: "md", md: "lg", lg: "xl" }}
                  color="rgb(156 163 175)"
                  flex={1}
                  lineHeight={{ base: "1.5", md: "1.4" }}
                >
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