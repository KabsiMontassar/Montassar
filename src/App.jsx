import React, { useState, useEffect, useRef, useCallback } from "react";
import { HiBars3 } from "react-icons/hi2";
import { PiHandWavingBold } from "react-icons/pi";

import Hero from "./components/Hero";
import WhatIDo from "./components/WhatIDo";
import MyWork from "./components/MyWork";
import About from "./components/About";
import Contact from "./components/Contact";
import NavigationMenu from "./components/NavigationMenu";
import ContactDrawer from "./components/ContactDrawer";
import SettingsPanel from "./components/SettingsPanel";
import translations from "./data/translations.json";

function App() {
  const [language, setLanguage] = useState("en");
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const cursorRef = useRef(null);

  const data = translations[language];

  // Helper functions for cursor logic (memoized for performance)
  const isInteractiveElement = useCallback((target) => {
    return (
      target.matches(
        'button, a, input, textarea, select, .custom-button, [role="button"], [onclick]'
      ) ||
      target.closest(
        'button, a, input, textarea, select, .custom-button, [role="button"], [onclick]'
      )
    );
  }, []);

  const isIconElement = useCallback((target) => {
    return (
      target.matches("svg, path, circle, rect, line, polyline, polygon") ||
      target.closest("svg, path, circle, rect, line, polyline, polygon")
    );
  }, []);

  const handleNavigate = (section) => {
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Optimized cursor functionality
  const handleMouseMove = useCallback((e) => {
    const cursor = cursorRef.current;
    if (cursor) {
      // Use transform for better performance
      cursor.style.transform = `translate(${e.clientX - 12.5}px, ${
        e.clientY - 12.5
      }px)`;
    }
  }, []);

  const handleMouseInteraction = useCallback(
    (e) => {
      const target = e.target;
      const isInteractive =
        isInteractiveElement(target) || isIconElement(target);

      // Use CSS classes for size changes instead of state
      const cursor = cursorRef.current;
      if (cursor) {
        if (isInteractive) {
          cursor.classList.add("interactive");
          cursor.classList.remove("small");
        } else {
          cursor.classList.add("small");
          cursor.classList.remove("interactive");
        }
      }
    },
    [isInteractiveElement, isIconElement]
  );

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setNavOpen(false);
      setContactOpen(false);
      setSettingsOpen(false);
    }
  }, []);

  const handleOverlayClick = useCallback((e) => {
    // Only close if clicking on the overlay itself, not on the cards
    if (e.target === e.currentTarget) {
      setNavOpen(false);
      setContactOpen(false);
      setSettingsOpen(false);
    }
  }, []);

  // Custom cursor functionality
  useEffect(() => {
    // Initialize cursor visibility
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.display = "block";
      cursor.classList.add("small"); // Default size
    }

    // Throttle mousemove for better performance
    let ticking = false;
    const throttledMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    document.addEventListener("mousemove", throttledMouseMove);
    document.addEventListener("mouseover", handleMouseInteraction, true);
    document.addEventListener("mouseout", handleMouseInteraction, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", throttledMouseMove);
      document.removeEventListener("mouseover", handleMouseInteraction, true);
      document.removeEventListener("mouseout", handleMouseInteraction, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleMouseMove, handleMouseInteraction, handleKeyDown]);

  // Montassar Floating Text scroll functionality - Optimized
  useEffect(() => {
    let ticking = false;
    const element = document.getElementById("montassar-floating");

    const updateFloatingText = () => {
      if (!element) return;

      const scrollY = window.scrollY;
      const isAnyPanelOpen = navOpen || contactOpen || settingsOpen;

      // Apply panel effects first
      if (isAnyPanelOpen) {
        element.classList.add('panel-blur');
      } else {
        element.classList.remove('panel-blur');
      }

      if (scrollY <= 100) {
        // Start position - large at bottom with more margin
        element.style.top = `${window.innerHeight - 300}px`;
        element.style.bottom = "auto";
        element.style.fontSize = "10rem";
        element.style.transform = "translateX(-50%)";
        element.style.webkitTextStroke = "2px black";
      } else if (scrollY >= 300) {
        // End position - medium size at top, FIXED (much faster transition)
        element.style.bottom = "auto";
        element.style.top = "10px";
        element.style.fontSize = "2.5rem";
        element.style.transform = "translateX(-50%)";
        element.style.webkitTextStroke = "1px black";
      } else {
        // Transition - smooth movement and scaling (300px range instead of 900px)
        const progress = (scrollY - 100) / 200; // 300px transition - much faster!

        // Calculate font size: 10rem to 2.5rem
        const fontSize = 10 - 7.5 * progress;

        // Calculate top position: smoothly move from initialTop to finalTop
        const initialTop = window.innerHeight - 300;
        const currentTop = initialTop - progress * (initialTop - 50);

        element.style.top = `${currentTop}px`;
        element.style.bottom = "auto";
        element.style.fontSize = `${fontSize}rem`;
        element.style.transform = "translateX(-50%)";
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateFloatingText);
        ticking = true;
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call
    updateFloatingText();

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [navOpen, contactOpen, settingsOpen]);

  return (
    <div className="relative bg-primary text-secondary">
      {/* Custom Cursor */}
      <div ref={cursorRef} className="custom-cursor"></div>

      {/* Floating Montassar Text - Clean Implementation */}
      <div id="montassar-floating" className="montassar-floating">
        Montassar
      </div>

      {/* Fixed Buttons */}
      <button
        onClick={() => setNavOpen(true)}
        className="fixed top-4 left-4 z-30 custom-button"
        style={{ position: "fixed", top: "16px", left: "16px" }}
      >
        <HiBars3 className="w-6 h-6" />
      </button>
      <button
        onClick={() => setContactOpen(true)}
        className="fixed top-4 right-4 z-30 custom-button"
        style={{ position: "fixed", top: "16px", right: "16px" }}
      >
        <PiHandWavingBold className="w-6 h-6" />
      </button>
      {/* Settings Panel */}
      <div className={settingsOpen ? "no-blur" : ""}>
        <SettingsPanel
          isOpen={settingsOpen}
          onToggle={() => setSettingsOpen(!settingsOpen)}
          language={language}
          onLanguageChange={setLanguage}
        />
      </div>
      {/* Navigation Menu */}
      <div className={navOpen ? "no-blur" : ""}>
        <NavigationMenu
          isOpen={navOpen}
          onClose={() => setNavOpen(false)}
          navData={data.nav}
          onNavigate={handleNavigate}
        />
      </div>
      {/* Contact Drawer */}
      <div className={contactOpen ? "no-blur" : ""}>
        <ContactDrawer
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          contactData={data}
        />
      </div>
      <div className="min-h-[95vh]">
        <Hero data={data.hero} />
      </div>

      <WhatIDo data={data.whatido} />
      <MyWork data={data.mywork} />
      <About data={data.about} />
      <Contact data={data.contact} />
      {(navOpen || contactOpen || settingsOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 transition-all duration-300"
          onClick={handleOverlayClick}
        ></div>
      )}
    </div>
  );
}

export default App;
