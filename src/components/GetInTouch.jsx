import { Box, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import { BsArrowReturnRight } from "react-icons/bs";
import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialLinkedin } from "react-icons/sl";

import SplitText from './UI/SplitText/SplitText';
import { useState } from 'react';
import Magnet from './UI/magnet/Magnet';

const GetInTouch = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Box id="get-in-touch"  bg="white" p={8}  >
      {/* Main Title */}
      <VStack py={{ base: 16, md: 20, lg: 24 }} pt={{ base: '90px', md: '110px', lg: '130px' }}>
        <Flex direction="column" spacing={4} w="100%" >
          <Flex gap={2} justify={"center"} >
            <SplitText
              text="Get in"
              className='get-in-touch-title-first'
            />
            <SplitText
              text="Touch"
              className='get-in-touch-title-second'
            />
          </Flex>

          {/* Subtitle */}

          <Box pl={"10%"}
            pt={20}

          >
            <Text
              fontSize="7xl"
              color="black"
              textAlign="left"
              fontWeight={500}
              lineHeight={.9}
              w="100%"

            >
              Have a project in mind?  <br />
              Let's make it a reality!
            </Text>

            {/* Call to Action */}
            <HStack spacing={4} align="center" pt={10}  >
              <BsArrowReturnRight size={32} color="#000" />
              <Box
                position="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                cursor="pointer"
                minW="500px"
              >
                <Text
                  fontSize="4xl"
                  fontWeight="400"
                  color="black"
                  opacity={isHovered ? 0 : 1}
                  transition="opacity 0.3s ease"
                >
                  Get in touch
                </Text>
                <Text
                  fontSize="4xl"
                  fontWeight="400"
                  color="black"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity={isHovered ? 1 : 0}
                  transition="opacity 0.3s ease"
                >
                  kebsimontassar@gmail.com
                </Text>
              </Box>


            </HStack>


            <Box pt={20} spacing={8} display="flex" gap={6}>
              <Magnet padding={30} disabled={false} magnetStrength={10}>
                <Box
                  as="button"
                  onClick={() => window.open('https://github.com/KabsiMontassar', '_blank')}
                  border="1px solid rgb(221 221 221)"
                  borderRadius="50%"
                  p={5}
                  bg="transparent"
                  cursor="pointer"

                  transition="all 0.2s"
                >
                  <VscGithubAlt size={35} color="#000" />
                </Box>
              </Magnet>


              <Magnet padding={30} disabled={false} magnetStrength={10}><Box
                as="button"
                onClick={() => window.open('https://linkedin.com/in/your-profile', '_blank')}
                border="1px solid rgb(221 221 221)"
                borderRadius="50%"
                p={5}
                bg="transparent"
                cursor="pointer"

                transition="all 0.2s"
              >
                <SlSocialLinkedin size={35} color="#000" />
              </Box>
              </Magnet>
            </Box>

            <Box mt={10}>
              <Text
                fontSize="7xl"
                fontWeight="300"
                color="black"
                textAlign="left"
                pl={4}
                className='signature'
              >
                Montassar
              </Text>
            </Box>
            <Box mt={20}>
              <Text
                fontSize="xl"
                fontWeight="400"
                color="black"
                textAlign="right"
                pr={"10%"}

              >
                Thank you for visiting! Let’s stay connected.
              </Text>
            </Box>


          </Box>

        </Flex>

      </VStack>
    </Box>
  );
};

export default GetInTouch;