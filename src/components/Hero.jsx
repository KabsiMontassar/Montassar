import { Box, Flex, Text } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

const Hero = () => {
    const [isWaving, setIsWaving] = useState(false);
    const timeoutRef = useRef(null);
    const intervalRef = useRef(null);

    useEffect(() => {
        const startWaveCycle = () => {
            // Clear any existing timeouts/intervals
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);

            // Start the wave
            setIsWaving(true);

            // After animation completes, stop waving and schedule next cycle
            timeoutRef.current = setTimeout(() => {
                setIsWaving(false);

                // Schedule next wave after 3 seconds
                timeoutRef.current = setTimeout(startWaveCycle, 3000);
            }, 750);
        };

        // Start first wave after 1 second
        timeoutRef.current = setTimeout(startWaveCycle, 1000);

        // Cleanup function
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <Box id="hero" minH="100vh" bg="white" p={20} pt="80px" position="relative">
            {/* Main welcome text */}
            <Flex ml="200px" justify="left" align="center" minH="60vh" position="relative">
                <Text
                    fontSize={{ base: "3xl", md: "5xl", lg: "9xl" }}
                    fontWeight="bold"
                    textAlign="left"
                    position="relative"
                    zIndex="1"
                    lineHeight="1"
                    letterSpacing={2}
                >
                    WELCOME TO <br /> MY WEBSITE
                </Text>
                {/* Wave emoji behind the text */}
                <Text
                    fontSize={{ base: "6xl", md: "8xl", lg: "10xl" }}
                    position="absolute"
                    top="25%"
                    left="50%"
                    zIndex="0"
                    transform="translate(-50%, -50%)"
                    className={isWaving ? "wave-animation" : ""}
                >
                    👋
                </Text>
            </Flex>

            {/* Bottom right text */}
            <Box position="absolute" bottom="8" right="8">
                <Text
                    fontSize={{ base: "lg", md: "xl" }}
                    textAlign="right"
                >
                    I'm Montassar kebsi
                </Text>
            </Box>

            {/* Bottom left scroll indicator */}
            <Box position="absolute" bottom="8" left="8" textAlign="center">
                <Text fontSize="lg" mb={2}>Scroll</Text>
                <Box
                    as="span"
                    fontSize="2xl"
                    className="bounce-animation"
                    display="block"
                >
                    ⌄
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;