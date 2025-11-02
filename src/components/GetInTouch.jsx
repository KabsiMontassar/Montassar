import { Box, Text, VStack, HStack, Flex } from '@chakra-ui/react';
import { BsArrowReturnRight } from "react-icons/bs";
import { VscGithubAlt } from "react-icons/vsc";
import { SlSocialLinkedin } from "react-icons/sl";
import { CiMail } from "react-icons/ci";

import SplitText from './UI/SplitText/SplitText';
import { useState, useEffect } from 'react';
import Magnet from './UI/magnet/Magnet';
import './GetInTouch.css';

const GetInTouch = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailHovered, setEmailHovered] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

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
    <Box
      id="get-in-touch"
      bg="white"

      position="relative"
      minH={{ base: "100vh", md: "90vh" }}
      overflow="hidden"
    >
      {/* Main Title */}
      <VStack
        py={{ base: 12, sm: 16, md: 20, lg: 24 }}
        pt={{ base: '60px', sm: '70px', md: '90px', lg: '110px', xl: '130px' }}
        w="100%"
        spacing={{ base: 6, md: 8, lg: 10 }}
      >
        <Flex
          direction="column"
          spacing={4}
          w="100%"
          align="center"
        >
          {/* Split Text Title */}
          <Flex
            gap={{ base: 1, md: 2 }}
            justify="center"
            wrap="wrap"
            align="center"
            w="100%"
          >
            <SplitText
              text="Get in"
              className='get-in-touch-title-first'
            />
            <SplitText
              text="Touch"
              className='get-in-touch-title-second'
            />
          </Flex>

          {/* Main Content Container */}
          <Box
            pl={{ base: "0", sm: "5%", md: "8%", lg: "10%" }}
            pr={{ base: "0", sm: "2%", md: "4%" }}
            pt={{ base: 8, sm: 12, md: 16, lg: 20 }}
            w="100%"
            maxW="1400px"
            mx="auto"
          >
            {/* Subtitle */}
            <Text
              fontSize={{
                base: "2xl",
                sm: "3xl",
                md: "4xl",
                lg: "5xl",
                xl: "6xl",
                "2xl": "7xl"
              }}
              color="black"
              textAlign={{ base: "center", md: "left" }}
              fontWeight={500}
              lineHeight={{ base: "1.2", md: "1.1", lg: "0.9" }}
              w="100%"
              mb={{ base: 6, md: 8, lg: 10 }}
            >
              Have a project in mind? <br />
              Let's make it a reality!
            </Text>

            {/* Call to Action */}
            <HStack
              spacing={{ base: 2, md: 4 }}
              align="center"
              pt={{ base: 6, md: 8, lg: 10 }}
              justify="flex-start"
              pl={{ base: 5, md: 0 }}
              flexWrap="wrap"
            >
              <BsArrowReturnRight
                size={windowWidth < 768 ? 24 : 32}
                color="#000"
              />
              <Box
                position="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                cursor="pointer"
                minW={{ base: "auto", md: "400px", lg: "500px" }}
                maxW={{ base: "100%", md: "600px" }}
              >
                <Text
                  fontSize={{
                    base: "lg",
                    sm: "xl",
                    md: "2xl",
                    lg: "3xl",
                    xl: "4xl"
                  }}
                  fontWeight="400"
                  color="black"
                  opacity={isHovered ? 0 : 1}
                  transition="opacity 0.3s ease"
                  textAlign={{ base: "center", md: "left" }}
                >
                  Get in touch
                </Text>
                <Text
                  fontSize={{
                    base: "lg",
                    sm: "xl",
                    md: "2xl",
                    lg: "3xl",
                    xl: "4xl"
                  }}
                  fontWeight="400"
                  color="black"
                  position="absolute"
                  top="0"
                  left="0"
                  opacity={isHovered ? 1 : 0}
                  transition="opacity 0.3s ease"
                  textAlign={{ base: "center", md: "left" }}
                  whiteSpace={{ base: "normal", md: "nowrap" }}
                >
                  kebsimontassar@gmail.com
                </Text>
              </Box>
            </HStack>

            {/* Social Links - Responsive Design */}
            <Box
              pt={{ base: 12, sm: 16, md: 20 }}
              display="flex"
              gap={{ base: 4, md: 6 }}
              justify={{ base: "center", md: "flex-start" }}
              flexWrap="wrap"
              pl={{ base: 2, md: 0 }}
            >
              <Magnet
                padding={{ base: 20, md: 30 }}
                disabled={false}
                magnetStrength={10}
              >
                <Box
                  as="button"
                  onClick={() => window.open('https://github.com/KabsiMontassar', '_blank')}
                  border="1px solid rgb(221 221 221)"
                  borderRadius="50%"
                  p={{ base: 3, sm: 4, md: 5 }}
                  bg="transparent"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "rgb(156 163 175)",
                    transform: "scale(1.05)"
                  }}
                >
                  <VscGithubAlt
                    size={windowWidth < 768 ? 24 : windowWidth < 1024 ? 30 : 35}
                    color="#000"
                  />
                </Box>
              </Magnet>

              <Magnet
                padding={{ base: 20, md: 30 }}
                disabled={false}
                magnetStrength={10}
              >
                <Box
                  as="button"
                  onClick={() => window.open('https://www.linkedin.com/in/montassarkabsi', '_blank')}
                  border="1px solid rgb(221 221 221)"
                  borderRadius="50%"
                  p={{ base: 3, sm: 4, md: 5 }}
                  bg="transparent"
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "rgb(156 163 175)",
                    transform: "scale(1.05)"
                  }}
                >
                  <SlSocialLinkedin
                    size={windowWidth < 768 ? 24 : windowWidth < 1024 ? 30 : 35}
                    color="#000"
                  />
                </Box>
              </Magnet>

              <Magnet
                padding={{ base: 20, md: 30 }}
                disabled={false}
                magnetStrength={10}
              >
                <Box
                  as="button"
                  onClick={copyEmailToClipboard}
                  onMouseEnter={() => setEmailHovered(true)}
                  onMouseLeave={() => setEmailHovered(false)}
                  border="1px solid rgb(221 221 221)"
                  borderRadius="50%"
                  p={{ base: 3, sm: 4, md: 5 }}
                  bg="transparent"
                  cursor="pointer"
                  position="relative"
                  transition="all 0.2s"
                  _hover={{
                    borderColor: "rgb(156 163 175)",
                    transform: "scale(1.05)"
                  }}
                >
                  <CiMail
                    size={windowWidth < 768 ? 24 : windowWidth < 1024 ? 30 : 35}
                    color="#000"
                  />

                  {(emailHovered || emailCopied) && (
                    <Text
                      position="absolute"
                      top={{ base: "-50px", md: "-40px" }}
                      left="50%"
                      transform="translateX(-50%)"
                      fontSize={{ base: "sm", md: "md" }}
                      fontWeight="400"
                      color="black"
                      bg="white"
                      px={2}
                      py={1}
                      borderRadius="md"
                      boxShadow="md"
                      zIndex={10}
                      whiteSpace="nowrap"
                    >
                      {emailCopied ? 'Copied!' : 'kebsimontassar@gmail.com'}
                    </Text>
                  )}
                </Box>
              </Magnet>
            </Box>

            {/* Back To Top - Responsive positioning */}
            <Box
              position="absolute"
              right={{ base: "4%", md: "3%", lg: "2.2%" }}
              top={{ base: "50%", md: "35%", lg: "40%" }}
              transform="translateY(-50%)"
              cursor="pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="back-to-top"

            >
              <Text
                fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
                fontWeight="400"
                color="black"
                writingMode="vertical-rl"
                _hover={{ color: "#ffc83d" }}
                transition="color 0.3s ease"
                transform="rotate(180deg)"
                className="bouncing-text"
              >
                Back To Top
              </Text>
            </Box>

            {/* Signature - Responsive Typography */}
            <Box mt={{ base: 8, md: 10, lg: 12 }}>
              <Text
                fontSize={{
                  base: "3xl",
                  sm: "4xl",
                  md: "5xl",
                  lg: "6xl",
                  xl: "7xl"
                }}
                fontWeight="300"
                color="black"
                textAlign={{ base: "center", md: "left" }}
                pl={{ base: 0, md: 4 }}
                className='signature'
              >
                Montassar
              </Text>
            </Box>
            {/* Thank you message - Responsive */}
            <Flex
              direction={{ base: "column", md: "row" }}
              mt={{ base: 12, md: 16, lg: 20 }}
              justify={{ base: "center", md: "flex-end" }}

            >
              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                fontWeight="400"
                color="black"
                textAlign={{ base: "left", md: "right", lg: "right" }}

                pl={{ base: "5%", md: 0 }}
              >
                Thank you for visiting!
              </Text>

              <Text
                fontSize={{ base: "md", sm: "lg", md: "xl" }}
                fontWeight="400"
                color="black"
                textAlign={{ base: "left", md: "right", lg: "right" }}
                pr={{ base: 0, md: "5%", lg: "10%" }}
                pl={{ base: "15%", md: 0, lg: "1%" }}>
                Let's stay connected.
              </Text>
            </Flex>


          </Box>

        </Flex>

      </VStack>
    </Box>
  );
};

export default GetInTouch;