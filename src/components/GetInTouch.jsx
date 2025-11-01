import { Box, Text, VStack, HStack } from '@chakra-ui/react';
import { LuArrowDownRight } from 'react-icons/lu';

const GetInTouch = () => {
  return (
    <Box id="get-in-touch" minH="100vh" bg="white" p={8}  >
      <VStack spacing={8}  py={{ base: 16, md: 20, lg: 24 }} pt={{ base: '120px', md: '140px', lg: '160px' }}>
        {/* Main Title */}
        <Text
          fontSize={{ base: '4xl', md: '6xl', lg: '8xl' }}
          fontWeight="bold"
          color="black"
          letterSpacing="-0.02em"
        >
          Get in Touch
        </Text>

        {/* Subtitle */}
        <Text
          fontSize="2xl"
          color="gray.600"
          textAlign="left"
          maxW="600px"
          w="100%"
        >
          Have a project in mind? Let's make it a reality!
        </Text>

        {/* Call to Action */}
        <HStack spacing={4} align="center" justify="center">
          <LuArrowDownRight size={32} color="#000" />
          <Text
            fontSize="xl"
            fontWeight="semibold"
            color="black"
          >
            Get in touch
          </Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default GetInTouch;