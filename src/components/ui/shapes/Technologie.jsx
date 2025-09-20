import React, { useState } from 'react';

const Technologie = () => {
    const [animationPhase, setAnimationPhase] = useState('idle'); // idle, scaling, bounce, returning
    const [hasAnimated, setHasAnimated] = useState(false);

    const handleMouseEnter = () => {
        if (!hasAnimated && animationPhase === 'idle') {
            setHasAnimated(true);
            setAnimationPhase('scaling');

            // Animation sequence with bounce effect
            setTimeout(() => setAnimationPhase('bounce'), 400); // Start bounce after scaling
            setTimeout(() => setAnimationPhase('returningfirst'), 500); // Start first return after bounce
            setTimeout(() => setAnimationPhase('returning'), 600); // Start final return
            setTimeout(() => {
                setAnimationPhase('idle');
                setHasAnimated(false);
            }, 800); // Reset after full animation
        }
    };

    const getTransform = () => {
        switch (animationPhase) {
            case 'scaling':
                return 'translate3d(0px, 0px, 0px) scale3d(0.75,1.25 , 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(20deg, 10deg)';
            case 'bounce':
                return 'translate3d(0px, 2px, 0px) scale3d(1.1,0.9 , 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(-10deg, 0deg)';
            case 'returningfirst':
                return 'translate3d(0px, -1px, 0px) scale3d(0.95,1.05 , 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(5deg, 0deg)';
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
                return 'transform 0.15s cubic-bezier(0.68, -0.55, 0.265, 1.55)'; // Elastic bounce
            case 'returningfirst':
                return 'transform 0.1s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Quick settle
            case 'returning':
                return 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)'; // Smooth final return
            default:
                return 'transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
        }
    };

    return (
        <span
            style={{
                lineHeight: "1.2",
                textAlign: "center",
                backgroundPosition: "50%",
                backgroundSize: "cover",
                width: "clamp(0.8em, 1em, 1.2em)",
                height: "clamp(0.8em, 1em, 1.2em)",
                marginLeft: "clamp(0.25rem, 0.5rem, 1rem)",
                marginRight: "clamp(0.25rem, 0.5rem, 1rem)",
                display: "inline-block",
                backgroundImage:
                    'url("https://cdn.prod.website-files.com/66fb0e86356d0ec4d059d333/66fb1dc2860f829926fa6ed0_tech.svg")',
                transform: getTransform(),
                transformStyle: 'preserve-3d',
                transition: getTransition(),
                cursor: "pointer",
            }}
            className="span-image _4"
            onMouseEnter={handleMouseEnter}
        >
            &nbsp;
        </span>
    );
};

export default Technologie;
