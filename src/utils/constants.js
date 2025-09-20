// Animation and interaction constants
export const MAGNETIC_RADIUS = 150;
export const MAGNETIC_STRENGTH = 0.4;
export const ANIMATION_DURATION = 1.2;

// Animation configurations
export const CURSOR_ANIMATION = {
  inner: {
    spring: { stiffness: 300, damping: 30 },
    scale: { duration: 0.6, repeat: Infinity, ease: "easeInOut" }
  },
  outer: {
    spring: { stiffness: 200, damping: 25 },
    scale: { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 },
    opacity: { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
  }
};

export const MENU_TRANSITION = {
  duration: 0.8,
  ease: "easeInOut"
};

export const MAGNETIC_TRANSITION = {
  spring: { stiffness: 150, damping: 15 },
  elastic: { duration: 1.5, ease: [0.68, -0.55, 0.265, 1.55] },
  smooth: { duration: 0.1, ease: "easeOut" }
};

// Yin-Yang rotation animation
export const YIN_YANG_ROTATION = {
  duration: 2,
  ease: "linear",
  repeat: Infinity,
  repeatType: "loop"
};

// Navigation items
export const NAVIGATION_ITEMS = [
  { name: "Home", index: 0 },
  { name: "Work", index: 1 },
  { name: "Contact", index: 2 }
];

// Social links
export const SOCIAL_LINKS = [
  { name: "Email", href: "mailto:kebsimontassar@gmail.com", external: true  },
  { name: "GitHub", href: "https://github.com/KabsiMontassar", external: true },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/montassarkabsi", external: true }
];