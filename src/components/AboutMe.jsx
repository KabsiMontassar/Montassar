import { Box, Text } from '@chakra-ui/react';

const AboutMe = () => {
  return (
    <Box id="about-me" minH="100vh" bg="black" p={8} pt="120px">
      <Text textColor="white" fontSize="3xl" fontWeight="bold" mb={4}>About Me</Text>
      <Text textColor="white">Content for About Me section</Text>
    </Box>
  );
};

export default AboutMe;