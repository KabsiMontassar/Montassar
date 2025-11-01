import { Box, Text } from '@chakra-ui/react';

const MoreAboutMe = () => {
  return (
      <Box id="more-about-me" minH="100vh" bg="black" p={8} pt="120px">
      <Text textColor="white" fontSize="3xl" fontWeight="bold" mb={4}>More About Me</Text>
      <Text textColor="white">Content for More About Me section</Text>
    </Box>
  );
};

export default MoreAboutMe;