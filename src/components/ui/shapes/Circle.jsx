import React, { useState } from 'react'

const Circle = () => {
    const [animationPhase, setAnimationPhase] = useState('idle'); // idle, scaling, bounce, returning
    const [hasAnimated, setHasAnimated] = useState(false);

    const handleMouseEnter = () => {
        if (!hasAnimated && animationPhase === 'idle') {
            setHasAnimated(true);
            setAnimationPhase('scaling');

            // Animation sequence with bounce effect
            setTimeout(() => setAnimationPhase('bounce'), 300); // Start bounce after scaling
            setTimeout(() => setAnimationPhase('returningfirst'), 450); // Start first return after bounce
            setTimeout(() => setAnimationPhase('returning'), 550); // Start final return
            setTimeout(() => {
                setAnimationPhase('idle');
                setHasAnimated(false);
            }, 700); // Reset after full animation
        }
    };

    const getTransform = () => {
        switch (animationPhase) {
            case 'scaling':
                return 'translate3d(0px, 0px, 0px) scale3d(0.8, 0.8, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
            case 'bounce':
                return 'translate3d(0px, 0px, 0px) scale3d(1.2, 1.2, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
            case 'returningfirst':
                return 'translate3d(0px, 0px, 0px) scale3d(0.95, 0.95, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
            case 'returning':
                return 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
            default:
                return 'translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)';
        }
    };

    const getTransition = () => {
        switch (animationPhase) {
            case 'scaling':
                return 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'; // Fast start, smooth end
            case 'bounce':
                return 'transform 0.2s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Elastic bounce
            case 'returningfirst':
                return 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Quick settle
            case 'returning':
                return 'transform 0.15s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Smooth final return
            default:
                return 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    };

    return (
        <span
            data-w-id="f906b1ee-d2a4-0e5a-1bfa-2f1dfa16941f"
            className="span-image _3"
            onMouseEnter={handleMouseEnter}
            style={{
                opacity: 1,
                transform: getTransform(),
                transformStyle: 'preserve-3d',
                transition: getTransition(),
                WebkitTextSizeAdjust: '100%',
                textTransform: 'uppercase',
                fontFamily: 'DT Grotesk Display, sans-serif',
                lineHeight: 1.2,
                textAlign: 'center',
                fontWeight: 900,
                boxSizing: 'border-box',
                WebkitFontSmoothing: 'antialiased',
                WebkitAppearance: 'none',
                color: 'inherit',
                backgroundImage: 'url("https://cdn.prod.website-files.com/66fb0e86356d0ec4d059d333/66fb1dc2cfbcddffd587f7b6_life.svg")',
                backgroundPosition: '50%',
                backgroundSize: 'cover',
                width: '1em',
                height: '1em',
                marginLeft: '1rem',
                marginRight: '1rem',
                display: 'inline-block',
                position: 'relative',
                cursor: 'pointer'
            }}
        >
            &nbsp;
        </span>
    )
}

export default Circle