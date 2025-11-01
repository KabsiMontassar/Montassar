import { Box, Flex, Button, HStack, useBreakpointValue } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { setStoredLanguage } from "../utils/localStorage";

import Magnet from "./UI/Magnet";

const Header = ({ textColor }) => {
    const { i18n } = useTranslation();
    
    // Responsive values
    const padding = useBreakpointValue({ base: 2, sm: 3, md: 4, lg: 4 });
    const marginX = useBreakpointValue({ base: "3%", sm: "4%", md: "5%", lg: "5%" });
    const fontSize = useBreakpointValue({ base: "lg", sm: "lg", md: "xl", lg: "xl" });
    const logoMagnetPadding = useBreakpointValue({ base: 50, sm: 70, md: 100, lg: 100 });
    const langMagnetPadding = useBreakpointValue({ base: 10, sm: 15, md: 20, lg: 20 });

    const changeLanguage = (lang) => {
        i18n.changeLanguage(lang);
        setStoredLanguage(lang);
    };
    return (
        <Box
            position="sticky"
            top="0"
            left="0"
            right="0"
            bg="transparent"
            zIndex="50"
            p={padding}
            width="100%"
        >
            <Flex justify="space-between" align="center" mx={marginX}>
                <Magnet padding={logoMagnetPadding} disabled={false} magnetStrength={20}>
                    <Button
                        border="none"
                        _hover={{ backgroundColor: "transparent" }}
                        backgroundColor="transparent"
                        fontSize={fontSize}
                        fontWeight="600"
                        color={textColor}
                        letterSpacing={1}
                        pl={{ base: 2, sm: 3, md: 5, lg: 5 }}
                    >

                        Kebsi Montassar
                    </Button>
                </Magnet>
                <HStack gap={{ base: 2, sm: 3, md: 4, lg: 4 }}>
                    <Magnet padding={langMagnetPadding} disabled={false} magnetStrength={20}>
                        <Button
                            color={textColor}
                            border="none"
                            fontWeight={"300"}
                            _hover={{
                                backgroundColor: "transparent",
                                fontWeight: "bold",
                                transform: "scale(1.1)",
                            }}
                            backgroundColor="transparent"
                            fontSize={{ base: "sm", sm: "sm", md: "md", lg: "md" }}
                            onClick={() => changeLanguage("en")}
                        >
                            EN
                        </Button>
                    </Magnet>
                    <Magnet padding={langMagnetPadding} disabled={false} magnetStrength={20}>
                        <Button
                            color={textColor}
                            border="none"
                             fontWeight={"300"}
                            _hover={{
                                backgroundColor: "transparent",
                                fontWeight: "bold",
                                transform: "scale(1.1)",
                            }}
                            backgroundColor="transparent"
                            fontSize={{ base: "sm", sm: "sm", md: "md", lg: "md" }}
                            onClick={() => changeLanguage("fr")}
                            fontWeight={i18n.language === "fr" ? "bold" : "regular"}
                        >
                            FR
                        </Button>
                    </Magnet>
                </HStack>
            </Flex>
        </Box>
    )
}

export default Header