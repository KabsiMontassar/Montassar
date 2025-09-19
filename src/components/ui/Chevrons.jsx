import React, { useState } from 'react';

const Chevrons = () => {
  const [animationPhase, setAnimationPhase] = useState('idle'); // idle, scaling, bounce, returning
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleMouseEnter = () => {
    if (!hasAnimated && animationPhase === 'idle') {
      setHasAnimated(true);
      setAnimationPhase('scaling');

      // Animation sequence with bounce effect
      setTimeout(() => setAnimationPhase('bounce'), 300); // Start bounce after scaling
      setTimeout(() => setAnimationPhase('returning'), 300); // Start final return after bounce
      setTimeout(() => {
        setAnimationPhase('idle');
        setHasAnimated(false);
      }, 700); // Reset after full animation
    }
  };

  const getTransform = () => {
    switch (animationPhase) {
      case 'scaling':
        return 'translate3d(0px, 0px, 0px) scale3d(1.25, 0.75, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
      case 'bounce':
        return 'translate3d(0px, 0px, 0px) scale3d(0.9, 1.1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
      case 'returningfirst':
        return 'translate3d(0px, 0px, 0px) scale3d(1.05, 0.95, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
      case 'returning':
        return 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
      default:
        return 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
    }
  };

  const getTransition = () => {
    switch (animationPhase) {
      case 'scaling':
        return 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      case 'bounce':
        return 'transform 0.1s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Elastic bounce
      case 'returning':
        return 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      default:
        return 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    }
  };

  return (
    <span
      data-w-id="bf0fb268-96d6-44db-ff22-56c41d43e2bb"
      className="span-image _2"
      onMouseEnter={handleMouseEnter}
      style={{
        // Webkit properties
        WebkitTextSizeAdjust: '100%',
        WebkitFontSmoothing: 'antialiased',
        WebkitAppearance: 'none',

        // Typography
        textTransform: 'uppercase',
        fontFamily: 'DT Grotesk Display, sans-serif',
        lineHeight: '1.2',
        textAlign: 'center',
        fontSize: '6rem',
        fontWeight: '900',
        color: 'inherit',

        // Layout
        boxSizing: 'border-box',
        height: '1em',
        marginLeft: '1rem',
        marginRight: '1rem',
        display: 'inline-block',
        position: 'relative',
        width: '2em',

        // Visual
        opacity: 1,
        transform: getTransform(),
        transformStyle: 'preserve-3d',
        transition: getTransition(),
        backgroundImage: 'url("https://cdn.prod.website-files.com/66fb0e86356d0ec4d059d333/66fb1dc210836b0eb2badb2d_success.svg")',
        backgroundPosition: '50%',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'contain'
      }}
    >
    </span>
  );
};export default Chevrons;