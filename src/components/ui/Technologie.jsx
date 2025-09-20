import React, { useState } from "react";

const Technologie = () => {
  const [phase, setPhase] = useState("idle"); // idle → stretch → bounce → return
  const [locked, setLocked] = useState(false);

  const handleMouseEnter = () => {
    if (!locked && phase === "idle") {
      setLocked(true);
      setPhase("stretch");
      setTimeout(() => setPhase("bounce"), 200);
      setTimeout(() => setPhase("return"), 350);
      setTimeout(() => {
        setPhase("idle");
        setLocked(false);
      }, 650);
    }
  };

  const getTransform = () => {
    switch (phase) {
      case "stretch":
        // Pull outward diagonally (top-right + bottom-left)
        return "translate3d(-5px, -5px, 0) scale3d(1.1, 1.1, 1) skew(-8deg, 8deg)";
      case "bounce":
        // Overshoot for elastic bounce
        return "translate3d(3px, 3px, 0) scale3d(0.98, 0.98, 1) skew(4deg, -4deg)";
      case "return":
      case "idle":
      default:
        return "translate3d(0, 0, 0) scale3d(1, 1, 1) skew(0deg, 0deg)";
    }
  };

  const getTransition = () => {
    switch (phase) {
      case "stretch":
        return "transform 0.2s cubic-bezier(0.4, 0, 0.2, 1)";
      case "bounce":
        return "transform 0.15s cubic-bezier(0.68,-0.55,0.265,1.55)";
      case "return":
        return "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      default:
        return "transform 0.3s ease";
    }
  };

  return (
    <span
      style={{
        textTransform: "uppercase",
        fontFamily: "DT Grotesk Display, sans-serif",
        lineHeight: "1.2",
        textAlign: "center",
        fontSize: "6rem",
        fontWeight: "900",
        boxSizing: "border-box",
        WebkitFontSmoothing: "antialiased",
        WebkitAppearance: "none",
        color: "inherit",
        backgroundPosition: "50%",
        backgroundSize: "cover",
        width: "1em",
        height: "1em",
        marginLeft: "1rem",
        marginRight: "1rem",
        display: "inline-block",
        position: "relative",
        backgroundImage:
          'url("https://cdn.prod.website-files.com/66fb0e86356d0ec4d059d333/66fb1dc2860f829926fa6ed0_tech.svg")',
        opacity: 1,
        transform: getTransform(),
        transformOrigin: "top right", // Key for diagonal pulling
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
