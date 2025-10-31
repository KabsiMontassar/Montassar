import { Box, Flex, Text, Button, HStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { setStoredLanguage } from './utils/localStorage';
import Cursor from './components/Cursor';
import Hero from './components/Hero';
import AboutMe from './components/AboutMe';
import MoreAboutMe from './components/MoreAboutMe';
import MySkills from './components/MySkills';
import Services from './components/Services';
import Projects from './components/Projects';
import GetInTouch from './components/GetInTouch';

function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setStoredLanguage(lang);
  };

  return (
    <Box>
      <Cursor />
      <Box position="fixed" top="0" left="0" right="0" bg="white" zIndex="10" p={4} >
        <Flex justify="space-between" align="center">
          <Text pl="250px" fontSize="2xl" fontWeight="bold">Kebsi Montassar</Text>
          <HStack pr="250px">
            <Button
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                fontWeight: "bold",
                transform: "scale(1.1)"
              }}
              backgroundColor={"transparent"}
              onClick={() => changeLanguage('en')}
              variant={i18n.language === 'en' ? 'solid' : 'outline'}>
              EN
            </Button>
            <Button
              border={"none"}
              _hover={{
                backgroundColor: "transparent",
                fontWeight: "bold",
                transform: "scale(1.1)"
              }}
              backgroundColor={"transparent"}
              onClick={() => changeLanguage('fr')}
              variant={i18n.language === 'fr' ? 'solid' : 'outline'}>
              FR
            </Button>
          </HStack>
        </Flex>
      </Box>
      <Hero />
      <AboutMe />
      <MoreAboutMe />
      <MySkills />
      <Services />
      <Projects />
      <GetInTouch />
    </Box>
  );
}

export default App;
