import { Box, Flex, Button, HStack } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

import { setStoredLanguage } from "../utils/localStorage";

import Magnet from "./UI/Magnet";

const Header = () => {
    const { i18n } = useTranslation();
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
            p={4}
            width="100%"
        >
            <Flex justify="space-between" align="center" mx="5%">
                <Magnet padding={100} disabled={false} magnetStrength={20}>
                    <Button
                        border="none"
                        _hover={{ backgroundColor: "transparent" }}
                        backgroundColor="transparent"
                        fontSize="xl"
                        fontWeight="600"
                        letterSpacing={1}
                        pl={20}
                    >
                        Kebsi Montassar
                    </Button>
                </Magnet>
                <HStack>
                    <Magnet padding={20} disabled={false} magnetStrength={20}>
                        <Button
                            border="none"
                            _hover={{
                                backgroundColor: "transparent",
                                fontWeight: "bold",
                                transform: "scale(1.1)",
                            }}
                            backgroundColor="transparent"
                            onClick={() => changeLanguage("en")}
                        >
                            EN
                        </Button>
                    </Magnet>
                    <Magnet padding={20} disabled={false} magnetStrength={20}>
                        <Button
                            border="none"
                            _hover={{
                                backgroundColor: "transparent",
                                fontWeight: "bold",
                                transform: "scale(1.1)",
                            }}
                            backgroundColor="transparent"
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