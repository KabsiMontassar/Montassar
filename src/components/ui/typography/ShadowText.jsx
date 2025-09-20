import React from "react";

const ShadowText = ({
  text = "SHADOW",
  textColor = "white",
  shadowColor = "rgb(76, 170, 146)",
  fontSize = "clamp(3rem, 12vw, 14rem)" // responsive font size
}) => {
  return (
    <>
      <style>
        {`
          
          .shadow-text {
            color: ${textColor};
            font-size: ${fontSize};
            text-shadow: 0.04em 0.04em 0 ${shadowColor};
            position: relative;
            font-family: 'DTGetaiGroteskDisplay', sans-serif;
            font-weight: 900;
            line-height: 1;
            margin: 0 1rem;
            padding: 0;
            display: inline-block;

          }

          .shadow-text::after {
            content: attr(data-shadow);
            position: absolute;
            top: 0.06em;
            left: 0.07em;
            z-index: -1;
            text-shadow: none;
            /* ✅ use px for a stable pattern */
            background-image: repeating-linear-gradient(
              45deg,
              transparent 0 6px,
              ${textColor} 6px 8px,
              transparent 8px 12px
            );
            background-size: 12px 12px; /* fixed pixel-based pattern */
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            animation: shadowSlide 18s linear infinite;
            display: inline-block;
            white-space: nowrap;
            font-family: 'DTGetaiGroteskDisplay', sans-serif;
            font-weight: 900;
          }

          @keyframes shadowSlide {
            0%   { background-position: 200% -200%; }
            100% { background-position: -200% 200%; }
          }
        `}
      </style>

      <h1 className="shadow-text" data-shadow={text}>
        {text}
      </h1>
    </>
  );
};

export default ShadowText;
