import { Box, Flex, Text } from '@chakra-ui/react';

const Hero = () => {
  return (
    <Box id="hero" minH="100vh" bg="white" p={8} pt="120px">
      <Flex justify="center" align="center" minH="60vh">
        <Text fontSize="xl">Add hello we will complete later</Text>
      </Flex>
    </Box>
  );
};

export default Hero;