import { Box, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import { BsArrowReturnRight } from "react-icons/bs";
import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialLinkedin } from "react-icons/sl";
import { CiMail } from "react-icons/ci";

import SplitText from './UI/SplitText/SplitText';
import { useState } from 'react';
import Magnet from './UI/magnet/Magnet';
import './GetInTouch.css';

const GetInTouch = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('kebsimontassar@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000); // Hide after 2 seconds
    } catch (err) {
      console.error('Failed to copy email: ', err);
    }
  };
  return (
    <Box id="get-in-touch" bg="white" p={8} position="relative" minH="100vh" >
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
                onClick={() => window.open('https://www.linkedin.com/in/montassarkabsi', '_blank')}
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
                 <Magnet padding={30} disabled={false} magnetStrength={10}><Box
                as="button"
                onClick={copyEmailToClipboard}
                onMouseEnter={() => setEmailHovered(true)}
                onMouseLeave={() => setEmailHovered(false)}
                border="1px solid rgb(221 221 221)"
                borderRadius="50%"
                p={5}
                bg="transparent"
                cursor="pointer"
                position="relative"
                transition="all 0.2s"
              >
                <CiMail size={35} color="#000" />
               
                {(emailHovered || emailCopied) && (
                  <Text
                    position="absolute"
                    top="-40px"
                    left="50%"
                    transform="translateX(-50%)"
                    fontSize="md"
                    fontWeight="400"
                    color="black"
                    bg="white"
                    px={2}
                    py={1}
                    borderRadius="md"
                    boxShadow="md"
                    zIndex={10}
                  >
                    {emailCopied ? 'copied!' : 'kebsimontassar@gmail.com'}
                  </Text>
                )}
             
              </Box>
              </Magnet>
            </Box>

            {/* Back To Top */}
            <Box
              position="absolute"
              right="2.2%"
              top="40%"
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="back-to-top"
            >
              <Text
                fontSize="2xl"
                fontWeight="400"
                color="black"
                writingMode="vertical-rl"
                textOrientation="mixed"
                _hover={{ color: "#ffc83d" }}
                transition="color 0.3s ease"
                transform="rotate(180deg)"
                className="bouncing-text"
              >
                Back To Top
              </Text>
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