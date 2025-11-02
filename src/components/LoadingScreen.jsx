import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const duration = 2500; // 2.5 seconds total loading time
        const interval = 20; // Update every 20ms
        const increment = (interval / duration) * 100;

        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + increment;
                if (next >= 100) {
                    clearInterval(timer);
                    // Wait a bit before completing to show 100%
                    setTimeout(() => {
                        onLoadingComplete?.();
                    }, 300);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    // Calculate letter spacing based on progress (starts large, ends small)
    const letterSpacing = `${4 - (progress / 100) * 3.8}rem`; // From 4rem to 2.2rem

    return (
        <Box
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="white"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            {/* Top Progress Bar */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                height="2vh"
                bg="rgba(0, 0, 0, 0.1)"
            >
                <motion.div
                    style={{
                        height: '100%',
                        backgroundColor: '#000',
                    }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.1, ease: 'linear' }}
                />
            </Box>

            {/* Center HELLO Text */}
            <Text
                fontSize={{ base: '7xl', sm: '8xl', md: '9xl', lg: '10xl' }}
                fontWeight="bold"
                color="black"
                letterSpacing={letterSpacing}
                transition="letter-spacing 0.1s ease-out"
                userSelect="none"
            >
                HELLO
            </Text>

            {/* Bottom Right Percentage */}
            <Text
                position="absolute"
                bottom={{ base: '5%', md: '8%' }}
                right={{ base: '5%', md: '8%' }}
                fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '7xl' }}
                fontWeight="bold"
                color="black"
            >
                {Math.round(progress)}%
            </Text>
        </Box>
    );
};

export default LoadingScreen;
