import { Box, Text } from '@chakra-ui/react';

const Services = () => {
  return (
    <Box id="services" minH="100vh" bg="black" p={8} pt="120px">
      <Text textColor="white" fontSize="3xl" fontWeight="bold" mb={4}>My Services</Text>
      <Text textColor="white">Content for My Services section</Text>
    </Box>
  );
};

export default Services;