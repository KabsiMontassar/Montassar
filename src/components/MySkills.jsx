import { Box, Text, VStack } from '@chakra-ui/react';
import Ballpit from './UI/Ballpit';
const MySkills = () => {
  return (
    <Box
      id="my-skills"
      minH="100vh"
      bg="black"
      px={{ base: 4, md: 8, lg: 12 }}
      py={{ base: 16, md: 20, lg: 24 }}
      pt={{ base: "120px", md: "140px", lg: "160px" }}
    >
      <VStack spacing={{ base: 12, md: 16, lg: 20 }} align="center" maxW="1200px" mx="auto">

        <Text fontSize={{ base: "5xl", md: "6xl", lg: "7xl" }} fontWeight="600" color="white">
          My Skills
        </Text>

      
          <Ballpit />

       
      </VStack>
    </Box>
  );
};

export default MySkills;