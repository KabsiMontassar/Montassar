import { Box, Flex, Text } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

const Hero = () => {
  const [isWaving, setIsWaving] = useState(false);
  const [textOffset, setTextOffset] = useState({ x: 0, y: 0 });
  const [emojiOffset, setEmojiOffset] = useState({ x: 0, y: 0 });
  const timeoutRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isWaving) return; // Stop movement during waving

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const heroCenterX = window.innerWidth / 2;
      const heroCenterY = window.innerHeight * 0.45;

      const deltaX = mouseX - heroCenterX;
      const deltaY = mouseY - heroCenterY;
      const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

      const maxRange = 2000;

      if (distance < maxRange && distance > 0) {
        const force = (maxRange - distance) / maxRange;
        const maxOffset = 100;

        // Text moves away from cursor
        const textX = -(deltaX / distance) * force * maxOffset;
        const textY = -(deltaY / distance) * force * maxOffset;

        // Emoji moves toward cursor (opposite direction)
        const emojiX = (deltaX / distance) * force * (maxOffset * 0.6);
        const emojiY = (deltaY / distance) * force * (maxOffset * 0.6);

        setTextOffset({ x: textX, y: textY });
        setEmojiOffset({ x: emojiX, y: emojiY });
      } else {
        setTextOffset({ x: 0, y: 0 });
        setEmojiOffset({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isWaving]);

  useEffect(() => {
    const startWaveCycle = () => {
      setIsWaving(true);
      setTextOffset({ x: 0, y: 0 });
      setEmojiOffset({ x: 0, y: 0 });

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
      position="relative"
      display="flex"
      alignItems="center"
      justifyContent="center"
      overflow="hidden"
    >
      <Flex
        direction="column"
        align="center"
        justify="center"
        textAlign="center"
        width="100%"
        minH="400px"
        transform={`translate(${textOffset.x}px, ${textOffset.y}px)`}
        transition="transform 0.25s ease-out"
        position="relative"
      >
        {/* Main text */}
        <Text
          fontSize={{ base: '3xl', md: '5xl', lg: '9xl' }}
          fontWeight="bold"
          lineHeight="1"
          letterSpacing={2}
        >
          WELCOME TO <br /> MY WEBSITE
        </Text>

        {/* Emoji */}
        <Text
          fontSize={{ base: '6xl', md: '8xl', lg: '10xl' }}
          position="absolute"
          top="10%"
          left="70%"
          transform={`translate(calc(-50% + ${emojiOffset.x}px), calc(-50% + ${emojiOffset.y}px))`}
          zIndex="0"
          className={isWaving ? 'wave-animation' : ''}
          style={{ pointerEvents: 'none', transition: 'transform 0.25s ease-out' }}
        >
          👋
        </Text>
      </Flex>

      {/* Bottom right name */}
      <Box position="absolute" bottom="8" right="8">
        <Text fontSize={{ base: 'lg', md: 'xl' }}>I'm Montassar Kebsi</Text>
      </Box>

      {/* Bottom left scroll indicator */}
      <Box position="absolute" bottom="8" left="8" textAlign="center">
        <Text fontSize="lg" mb={2}>
          Scroll
        </Text>
        <Box as="span" fontSize="2xl" className="bounce-animation" display="block">
          ⌄
        </Box>
      </Box>
    </Box>
  );
};

export default Hero;
