import { Box, Text, VStack } from '@chakra-ui/react';
import TextPressure from './UI/TextPressure';
import { FaLessThanEqual } from 'react-icons/fa';

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

        <div >
          <TextPressure
            text="My Skills"
            flex={true}
            alpha={false}
            stroke={false}
            width={false}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={80}
          />
        </div>

        {/* Big Transparent Box with White Borders */}
        <Box
          w={{
            base: "100%",
            sm: "90%",
            md: "80%",
            lg: "70%",
            xl: "100%"
          }}
          minH={{
            base: "400px",
            sm: "450px",
            md: "500px",
            lg: "550px",
            xl: "600px"
          }}
          bg="transparent"
          border="2px solid white"
          borderRadius="3xl"
          p={{
            base: 6,
            sm: 8,
            md: 10,
            lg: 12,
            xl: 16
          }}
          display="flex"
          alignItems="center"
          justifyContent="center"
          boxShadow="0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1), 0 0 120px rgba(255, 255, 255, 0.05)"
        >
          <Text
            textColor="white"
            fontSize={{
              base: "lg",
              sm: "xl",
              md: "2xl"
            }}
            textAlign="center"
            opacity={0.7}
          >
            Skills content will go here
          </Text>
        </Box>
      </VStack>
    </Box>
  );
};

export default MySkills;