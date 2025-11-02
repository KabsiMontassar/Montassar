import { useRef, useState, useEffect } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = '', spotlightColor = 'rgba(255, 255, 255, 0.25)' }) => {
  const divRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile/touch device
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleMouseMove = e => {
    // Only apply mouse tracking on non-mobile devices
    if (!isMobile && divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      divRef.current.style.setProperty('--mouse-x', `${x}px`);
      divRef.current.style.setProperty('--mouse-y', `${y}px`);
      divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    }
  };

  const handleTouchStart = e => {
    // Handle touch events for mobile
    if (isMobile && divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const x = touch.clientX - rect.left;
      const y = touch.clientY - rect.top;

      divRef.current.style.setProperty('--mouse-x', `${x}px`);
      divRef.current.style.setProperty('--mouse-y', `${y}px`);
      divRef.current.style.setProperty('--spotlight-color', spotlightColor);
    }
  };

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove}
      onTouchStart={handleTouchStart}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
