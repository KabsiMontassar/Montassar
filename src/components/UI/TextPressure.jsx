import { useEffect, useRef, useState, useCallback } from 'react';

const TextPressure = ({
  text = 'Compressa',
  fontFamily = 'Arial, sans-serif',
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 24
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const spansRef = useRef([]);
  
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const charDataRef = useRef([]);
  const rafIdRef = useRef(null);

  const [fontSize, setFontSize] = useState(minFontSize);
  const [scaleY, setScaleY] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);

  const chars = text.split('');

  // Debounced resize handler
  const setSize = useCallback(() => {
    if (!containerRef.current || !titleRef.current) return;

    const { width: containerW, height: containerH } = containerRef.current.getBoundingClientRect();
    let newFontSize = containerW / (chars.length / 2);
    newFontSize = Math.max(newFontSize, minFontSize);

    setFontSize(newFontSize);
    setScaleY(1);
    setLineHeight(1);

    // Pre-calculate character positions after layout
    setTimeout(() => {
      if (!titleRef.current) return;
      
      const titleRect = titleRef.current.getBoundingClientRect();
      charDataRef.current = [];
      
      spansRef.current.forEach((span, index) => {
        if (!span) return;
        const rect = span.getBoundingClientRect();
        charDataRef.current[index] = {
          centerX: rect.x + rect.width / 2,
          centerY: rect.y + rect.height / 2,
          width: rect.width
        };
      });

      if (scale && titleRect.height > 0) {
        const yRatio = containerH / titleRect.height;
        setScaleY(yRatio);
        setLineHeight(yRatio);
      }
    }, 100);
  }, [scale, text, minFontSize, chars.length]);

  // Mouse/touch handlers
  useEffect(() => {
    const handleMouseMove = (e) => {
      cursorRef.current.x = e.clientX;
      cursorRef.current.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches[0]) {
        cursorRef.current.x = e.touches[0].clientX;
        cursorRef.current.y = e.touches[0].clientY;
      }
    };

    // Throttled event listeners
    const throttledMouseMove = throttle(handleMouseMove, 16);
    const throttledTouchMove = throttle(handleTouchMove, 16);

    window.addEventListener('mousemove', throttledMouseMove);
    window.addEventListener('touchmove', throttledTouchMove, { passive: true });

    // Initialize position
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      mouseRef.current.x = rect.left + rect.width / 2;
      mouseRef.current.y = rect.top + rect.height / 2;
      cursorRef.current.x = mouseRef.current.x;
      cursorRef.current.y = mouseRef.current.y;
    }

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      window.removeEventListener('touchmove', throttledTouchMove);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, []);

  // Animation loop - optimized
  useEffect(() => {
    const animate = () => {
      // Smooth mouse follow
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) * 0.1;
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) * 0.1;

      if (charDataRef.current.length > 0) {
        const maxDist = charDataRef.current.reduce((max, char) => 
          Math.max(max, char.width * chars.length / 2), 300
        );

        spansRef.current.forEach((span, index) => {
          if (!span || !charDataRef.current[index]) return;

          const char = charDataRef.current[index];
          const dx = mouseRef.current.x - char.centerX;
          const dy = mouseRef.current.y - char.centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Optimized calculation
          const ratio = Math.max(0, 1 - (distance / maxDist));
          
          let styles = '';
          
          if (width) {
            const wdth = Math.max(5, 100 + (ratio * 100));
            styles += `font-stretch: ${Math.min(wdth, 200)}%;`;
          }
          
          if (weight) {
            const wght = Math.max(100, 100 + (ratio * 500));
            styles += `font-weight: ${Math.min(wght, 600)};`;
          }
          
          if (alpha) {
            styles += `opacity: ${Math.max(0.1, ratio)};`;
          }

          span.style.cssText = styles;
        });
      }

      rafIdRef.current = requestAnimationFrame(animate);
    };

    rafIdRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [width, weight, italic, alpha, chars.length]);

  // Resize handler with debounce
  useEffect(() => {
    const debouncedResize = debounce(setSize, 250);
    setSize();
    
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, [setSize]);

  // Helper functions
  function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func.apply(this, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const dynamicClassName = [className, flex ? 'flex' : '', stroke ? 'stroke' : '']
    .filter(Boolean).join(' ');

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        background: 'transparent'
      }}
    >
      <style>{`
        .flex {
          display: flex;
          justify-content: space-between;
        }

        .stroke span {
          position: relative;
          color: ${textColor};
          transition: opacity 0.1s ease;
        }
        
        .stroke span::after {
          content: attr(data-char);
          position: absolute;
          left: 0;
          top: 0;
          color: transparent;
          z-index: -1;
          -webkit-text-stroke-width: 3px;
          -webkit-text-stroke-color: ${strokeColor};
        }

        .text-pressure-title {
          color: ${textColor};
          font-weight: 100;
          will-change: transform;
        }
        
        .text-pressure-title span {
          display: inline-block;
          transition: all 0.1s ease-out;
          will-change: auto;
        }
      `}</style>

      <h1
        ref={titleRef}
        className={`text-pressure-title ${dynamicClassName}`}
        style={{
          fontFamily,
          textTransform: 'uppercase',
          fontSize: `${fontSize}px`,
          lineHeight,
          transform: `scale(1, ${scaleY})`,
          transformOrigin: 'center top',
          margin: 0,
          textAlign: 'center',
          userSelect: 'none',
          whiteSpace: 'nowrap',
          width: '100%'
        }}
      >
        {chars.map((char, i) => (
          <span
            key={i}
            ref={el => (spansRef.current[i] = el)}
            data-char={char}
            style={{
              color: stroke ? undefined : textColor,
              willChange: 'auto'
            }}
          >
            {char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;