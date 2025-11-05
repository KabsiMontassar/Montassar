import { Box, Flex, Text, Icon } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Magnet from './UI/magnet/Magnet';
import { IoTriangleSharp } from "react-icons/io5";
import { useTranslation } from 'react-i18next';

const Hero = () => {
    const { t } = useTranslation();
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

    const content = {
        welcome: t('hero.welcome'),
        myWebsite: t('hero.myWebsite'),
        nameIntro: t('hero.nameIntro'),
        scrollIndicator: t('hero.scrollIndicator'),
    };

    // Animation variants
    const fadeFromLeft = {
        hidden: { opacity: 0, x: -100 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };

    const fadeFromRight = {
        hidden: { opacity: 0, x: 100 },
        visible: { 
            opacity: 1, 
            x: 0,
            transition: { duration: 0.8, ease: "easeOut" }
        }
    };






    return (
        <Box
            id="hero"
            minH={{ base: "100vh", sm: "90vh", md: "85vh", lg: "75vh" }}
            bg="white"
            width="100%"
            pt={{ base: 8, sm: 12, md: 16, lg: 20 }}
            px={{ base: "4%", sm: "5%", md: "5%", lg: "5%" }}
            position="relative"
            display="flex"
            alignItems="top"
            justifyContent="center"
            overflow="hidden"
        >
            <Flex
                direction="column"

                pl={{ base: 4, sm: 4, md: 12, lg: 10 }}
                pt={20}
                textAlign={"left"}
                width="100%"
                minH={{ base: "300px", sm: "350px", md: "400px", lg: "500px" }}
                transition="transform 0.25s ease-out"
                position="relative"
            >
                <Box
                    position="relative"
                    zIndex="1"
                    w="full">
                    <Magnet
                        padding={100}
                        disabled={false}
                        magnetStrength={20}
                    >
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeFromLeft}
                        >
                            <Text
                                fontSize={{ base: '4xl', sm: '5xl', md: '6xl', lg: '9xl' }}
                                fontWeight="bold"
                                lineHeight={{ base: "1.2", md: "1" }}
                                zIndex="1"
                                letterSpacing={{ base: 1, md: 2 }}
                                maxW={{ base: "100%" }}
                                color="black"
                            >
                                {content.welcome} <br /> {content.myWebsite}
                            </Text>
                        </motion.div>
                    </Magnet>
                </Box>
                {/* Main emoji - positioned responsively */}
                <Box
                    position="absolute"
                    top={{ base: "5%", sm: "4%", md: "3%", lg: "2%" }}
                    left={{ base: "", md: "62%", lg: "62%" }}
                    right={{ base: "0", md: "", lg: "" }}
                    transform="translateX(-50%)"
                    zIndex="0"
                >
                    <Magnet
                        padding={400}
                        disabled={false}
                        magnetStrength={20}
                    >
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={fadeFromRight}
                        >
                            <Text
                                fontSize={{ base: '6xl', sm: '6xl', md: '7xl', lg: '100px' }}
                                className={isWaving ? 'wave-animation' : ''}
                                style={{
                                    pointerEvents: 'none',
                                    transition: 'transform 0.25s ease-out',
                                    display: 'inline-block'
                                }}
                            >
                                👋
                            </Text>
                        </motion.div>
                    </Magnet>
                </Box>
                {/* Emoji */}
            </Flex>

            {/* Bottom right name - responsive positioning */}
            <Box
                position="absolute"
                bottom={{ base: "30%", sm: "30%", md: "10%", lg: "0%" }}
                right={"10%"}
            >
                <Magnet
                    padding={{ base: 40, sm: 60, md: 80, lg: 100 }}
                    disabled={false}
                    magnetStrength={20}
                >
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeFromRight}
                    >
                        <Text
                            fontWeight={"bold"}
                            textAlign={"right"}
                            fontSize={{ base: 'xl', sm: 'xl', md: '2xl', lg: '5xl' }}
                            lineHeight={{ base: "1.3", md: "1.2" }}
                            color="black"
                        >
                            {content.nameIntro} <br /> Montassar
                        </Text>
                    </motion.div>
                </Magnet>
            </Box>

            {/* Bottom left scroll indicator - responsive positioning */}
            <Box
                position="absolute"
                bottom={{ base: "30%", sm: "30%", md: "10%", lg: "0%" }}
                left={"10%"}
                textAlign="center"
            >
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeFromLeft}
                >
                    <Text
                        fontWeight={"500"}
                        fontSize={{ base: 'xl', sm: 'xl', md: 'lg', lg: '4xl' }}
                        mb={{ base: 1, md: 2 }}
                        color="black"
                    >
                        {content.scrollIndicator}
                    </Text>
                    <Box
                        as="span"
                        fontSize={{ base: 'xl', sm: 'xl', md: '2xl', lg: '2xl' }}
                        className="bounce-animation"
                        display="block"
                    >
                        <Icon
                            size="lg"
                            color="#ffc83d"
                            sx={{ transform: 'rotate(180deg)' }}
                        >
                            <IoTriangleSharp />
                        </Icon>
                    </Box>
                </motion.div>
            </Box>
        </Box>
    );
};

export default Hero;
