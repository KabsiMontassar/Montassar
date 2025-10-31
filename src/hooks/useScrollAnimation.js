import { useEffect, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const useScrollAnimation = (targetRef, triggerRef) => {
  const animationRef = useRef(null);

  useGSAP(() => {
    if (!targetRef.current || !triggerRef.current) return;

    // Initial state
    gsap.set(targetRef.current, {
      y: '100vh',
      opacity: 0
    });

    // Create the animation timeline
    animationRef.current = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1.5,
        ease: 'power3.inOut'
      }
    })
    .to(targetRef.current, {
      y: 0,
      opacity: 1
    })
    .to(targetRef.current, {
      pointerEvents: 'all'
    }, '-=0.5');

  }, { scope: targetRef });

  // Scroll trigger logic
  useEffect(() => {
    const handleScroll = () => {
      if (!triggerRef.current || !animationRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Start animation when hero is 30% from top
      const progress = 1 - (triggerRect.top / (windowHeight * 0.7));
      const clampedProgress = Math.max(0, Math.min(1, progress));
      
      animationRef.current.progress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [triggerRef]);
};