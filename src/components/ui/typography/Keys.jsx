import React from 'react'

const Keys = ({
  text = "KEYBOARD",
  color = "white",
  fontSize = "clamp(1.5rem, 4.5vw, 6rem)",
  className = ""
}) => {
  const characters = text.split('');

  return (
    <>
      <style>
        {`
          .keyboard {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;
            gap: clamp(0.1rem, 0.5vw, 1rem);
            margin: 0 clamp(0.1rem, 0.25vw, 0.5rem);
          }

          .key {
            font-family: 'DTGetaiGroteskDisplay', sans-serif;
            font-size: ${fontSize};
            display: inline-block;
            letter-spacing: clamp(-0.5vw, -1vw, -0.1rem);
            transition: transform 0.2s ease-out;
            color: ${color};
            line-height: 1;
            font-weight: 900;
            will-change: transform;
            transform-origin: center bottom;
          }

          /* Responsive breakpoints for smaller screens */
          @media (max-width: 640px) {
            .keyboard {
              gap: clamp(0.1rem, 0.5vw, 0.5rem);
            }
            .key {
              letter-spacing: clamp(-0.3vw, -0.5vw, -0.05rem);
            }
          }

          @media (max-width: 480px) {
            .keyboard {
              gap: clamp(0.05rem, 0.3vw, 0.3rem);
            }
            .key {
              letter-spacing: clamp(-0.2vw, -0.3vw, -0.03rem);
            }
          }

          @keyframes pressDown1 {
            30%, 40%, 100% { transform: translateY(0); }
            35% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown2 {
            70%, 80%, 100% { transform: translateY(0); }
            75% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown3 {
            30%, 40%, 100% { transform: translateY(0); }
            35% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown4 {
            40%, 50%, 100% { transform: translateY(0); }
            45% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown5 {
            20%, 30%, 100% { transform: translateY(0); }
            25% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown6 {
            60%, 70%, 100% { transform: translateY(0); }
            65% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown7 {
            10%, 20%, 100% { transform: translateY(0); }
            15% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown8 {
            35%, 45%, 100% { transform: translateY(0); }
            40% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown9 {
            50%, 60%, 100% { transform: translateY(0); }
            55% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          @keyframes pressDown10 {
            25%, 35%, 100% { transform: translateY(0); }
            30% { transform: translateY(clamp(2px, 1vw, 10px)); }
          }

          .key:nth-child(1) { animation: pressDown1 2s infinite; }
          .key:nth-child(2) { animation: pressDown2 3s infinite; }
          .key:nth-child(3) { animation: pressDown3 4s infinite; }
          .key:nth-child(4) { animation: pressDown4 2.5s infinite; }
          .key:nth-child(5) { animation: pressDown5 2.5s infinite; }
          .key:nth-child(6) { animation: pressDown6 3.5s infinite; }
          .key:nth-child(7) { animation: pressDown7 2.2s infinite; }
          .key:nth-child(8) { animation: pressDown8 3.2s infinite; }
          .key:nth-child(9) { animation: pressDown9 2.8s infinite; }
          .key:nth-child(10) { animation: pressDown10 3.8s infinite; }

          /* Reduce motion for accessibility */
          @media (prefers-reduced-motion: reduce) {
            .key {
              animation: none;
            }
          }
        `}
      </style>
      <div className={`keyboard ${className}`}>
        {characters.map((char, index) => (
          <span key={index} className="key">
            {char}
          </span>
        ))}
      </div>
    </>
  )
}

export default Keys