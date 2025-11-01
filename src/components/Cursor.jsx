import { Box } from '@chakra-ui/react';
import { useState, useEffect, useRef } from 'react';

const Cursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorPos = useRef({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Smooth animation loop
    const animate = () => {
      // Lerp (linear interpolation) for smooth following with delay
      cursorPos.current.x += (targetPos.current.x - cursorPos.current.x) * 0.2;
      cursorPos.current.y += (targetPos.current.y - cursorPos.current.y) * 0.2;
      
      setMousePosition({ x: cursorPos.current.x, y: cursorPos.current.y });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    document.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners to text content only - more specific selectors
    const interactiveElements = document.querySelectorAll(`
      button, a[href], input[type="submit"], input[type="button"], 
      [role="button"], .clickable, .interactive,
      h1, h2, h3, h4, h5, h6, p, span, button , img ,svg
    `);
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  return (
    <Box
      position="fixed"
      top={`${mousePosition.y}px`}
      left={`${mousePosition.x}px`}
      width={isHovering ? "120px" : "30px"}
      height={isHovering ? "120px" : "30px"}
      bg="#ffc83d"
      borderRadius="50%"
      pointerEvents="none"
      zIndex="9999"
      opacity={isHovering ? 0.6 : 1}
      transform="translate(-50%, -50%)"
      sx={{
        transition: 'width 0.3s ease, height 0.3s ease, opacity 0.3s ease',
      }}
    />
  );
};

export default Cursor;