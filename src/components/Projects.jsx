import { Box, Text } from '@chakra-ui/react';

const Projects = () => {
  return (
      <Box id="projects" minH="100vh" bg="black" p={8} pt="120px">
      <Text textColor="white" fontSize="3xl" fontWeight="bold" mb={4}>Projects</Text>
      <Text textColor="white">Content for Projects section</Text>
    </Box>
  );
};

export default Projects;