import { Box, Text } from '@chakra-ui/react';

const MySkills = () => {
  return (
      <Box id="my-skills" minH="100vh" bg="black" p={8} pt="120px">
      <Text textColor="white" fontSize="3xl" fontWeight="bold" mb={4}>My skills</Text>
      <Text textColor="white">Content for My skills section</Text>
    </Box>
  );
};

export default MySkills;