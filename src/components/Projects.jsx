import { Box, Text } from '@chakra-ui/react';

const Projects = () => {
  return (
    <Box id="projects" minH="100vh" bg="gray.50" p={8} pt="120px">
      <Text fontSize="3xl" fontWeight="bold" mb={4}>Projects</Text>
      <Text>Content for Projects section</Text>
    </Box>
  );
};

export default Projects;