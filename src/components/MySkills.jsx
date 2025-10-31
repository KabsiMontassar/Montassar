import { Box, Text } from '@chakra-ui/react';

const MySkills = () => {
  return (
    <Box id="my-skills" minH="100vh" bg="gray.50" p={8} pt="120px">
      <Text fontSize="3xl" fontWeight="bold" mb={4}>My Skills</Text>
      <Text>Content for My Skills section</Text>
    </Box>
  );
};

export default MySkills;