import { Box, Text } from '@chakra-ui/react';

const AboutMe = () => {
  return (
    <Box id="about-me" minH="100vh" bg="red.500" p={8} pt="120px">
      <Text fontSize="3xl" fontWeight="bold" mb={4}>About Me</Text>
      <Text>Content for About Me section</Text>
    </Box>
  );
};

export default AboutMe;