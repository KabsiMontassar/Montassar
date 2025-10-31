import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import Magnet from './UI/Magnet';
import { IoTriangleSharp } from "react-icons/io5";

const Hero = () => {
    const [isWaving, setIsWaving] = useState(false);
    const timeoutRef = useRef(null);



    useEffect(() => {
        const startWaveCycle = () => {
            setIsWaving(true);

            timeoutRef.current = setTimeout(() => {
                setIsWaving(false);
                timeoutRef.current = setTimeout(startWaveCycle, 3000);
            }, 750);
        };

        timeoutRef.current = setTimeout(startWaveCycle, 1000);
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <Box
            id="hero"
            minH="100vh"
            bg="white"
            width="100%"
            position="relative"
            display="flex"
            alignItems="top"
            justifyContent="center"
            overflow="hidden"
        >
            <Flex
                direction="column"
                align="left"
                pl={20}
                pt={100}
                textAlign="left"
                width="100%"
                minH="400px"
                transition="transform 0.25s ease-out"
                position="relative"
            >
                <Box zIndex="1">
                    <Magnet padding={100} disabled={false} magnetStrength={20}>
                        <Text
                            fontSize={{ base: '3xl', md: '5xl', lg: '9xl' }}
                            fontWeight="bold"
                            lineHeight="1"
                            zIndex="1"
                            letterSpacing={2}
                        >
                            WELCOME TO <br /> MY WEBSITE
                        </Text>
                    </Magnet>
                </Box>
                {/* Main text */}
                <Box position="absolute"
                    top="5"
                    left="50%" zIndex="0">
                    <Magnet padding={700} disabled={false} magnetStrength={20}>
                        <Text
                            fontSize={{ base: '6xl', md: '8xl', lg: '10xl' }}
                            className={isWaving ? 'wave-animation' : ''}
                            style={{ pointerEvents: 'none', transition: 'transform 0.25s ease-out' }}
                        >
                            👋
                        </Text>
                    </Magnet>
                </Box>
                {/* Emoji */}
            </Flex>

            {/* Bottom right name */}
            <Box position="absolute" bottom="20%" right="10%">
                <Magnet padding={100} disabled={false} magnetStrength={20}>
                    <Text fontWeight={"bold"} textAlign={"right"} fontSize={{ base: 'lg', md: '4xl' }}>I'm Kebsi <br /> Montassar </Text>
                </Magnet>
            </Box>

            {/* Bottom left scroll indicator */}
            <Box position="absolute" bottom="20%" left="10%" textAlign="center">
                <Text fontWeight={"500"} fontSize={{ base: 'lg', md: '4xl' }} mb={2}>
                    Scroll
                </Text>
                <Box as="span" fontSize="2xl" className="bounce-animation" display="block">
                    <Icon
                        size="lg"
                        color="#ffc83d"
                        sx={{ transform: 'rotate(180deg)' }}
                    >
                        <IoTriangleSharp />
                    </Icon>
                </Box>
            </Box>
        </Box>
    );
};

export default Hero;
