import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onLoadingComplete }) => {
    const [progress, setProgress] = useState(0);
    const containerRef = useRef(null);
    const curtainLeftRef = useRef(null);
    const curtainRightRef = useRef(null);
    const textRef = useRef(null);
    const percentRef = useRef(null);
    const progressBarRef = useRef(null);

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
                    // Trigger GSAP animation when 100% is reached
                    setTimeout(() => {

                        startExitAnimation();
                    }, 100);
                    return 100;
                }
                return next;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [onLoadingComplete]);

    const startExitAnimation = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                onLoadingComplete?.();
            }
        });

        // Create a stunning reveal animation
        tl
            // 1. Scale up and fade the percentage
            .to(percentRef.current, {
                scale: 1.5,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            }, 0.4)

            // 2. Explode the HELLO text with letter animation
            .to(textRef.current, {
                scale: 1.2,
                opacity: 0,
                letterSpacing: '10rem',
                duration: 0.5,
                ease: 'power3.in'
            }, 0.4)

            // 3. Progress bar shrinks to center
            .to(progressBarRef.current, {
                scaleX: 0,
                transformOrigin: 'center',
                duration: 0.5,
                ease: 'power2.inOut'
            }, 0.4)


    };

    // Calculate letter spacing based on progress (starts large, ends small)
    const letterSpacing = `${4 - (progress / 100) * 3.8}rem`; // From 4rem to 0.2rem

    return (
        <Box
            ref={containerRef}
            position="fixed"
            top={0}
            left={0}
            right={0}
            bottom={0}
            bg="transparent"
            zIndex={9999}
            display="flex"
            alignItems="center"
            justifyContent="center"
            overflow="hidden"
        >
            {/* Left Curtain Panel */}
            <Box
                ref={curtainLeftRef}
                position="absolute"
                top={0}
                left={0}
                bottom={0}
                width="50%"
                bg="white"
                zIndex={1}
            />

            {/* Right Curtain Panel */}
            <Box
                ref={curtainRightRef}
                position="absolute"
                top={0}
                right={0}
                bottom={0}
                width="50%"
                bg="white"
                zIndex={1}
            />

            {/* Content Layer */}
            <Box
                position="relative"
                zIndex={2}
                width="100%"
                height="100%"
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
                    overflow="hidden"
                >
                    <motion.div
                        ref={progressBarRef}
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
                    ref={textRef}
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
                    ref={percentRef}
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
        </Box>
    );
};

export default LoadingScreen;
