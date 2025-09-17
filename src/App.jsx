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
  const [theme, setTheme] = useState("light");
  const [navOpen, setNavOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [cursorSize, setCursorSize] = useState("small");
  const cursorRef = useRef(null);

  const data = translations[language];

  // Helper functions for cursor logic
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

  // Event handlers defined at component level
  const handleMouseMove = useCallback((e) => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    }
  }, []);

  const handleMouseEnter = useCallback(
    (e) => {
      const target = e.target;
      if (isInteractiveElement(target) || isIconElement(target)) {
        setCursorSize("large");
      } else {
        setCursorSize("small");
      }
    },
    [isInteractiveElement, isIconElement]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      const target = e.target;
      if (!isInteractiveElement(target)) {
        setCursorSize("small");
      }
    },
    [isInteractiveElement]
  );

  const handleMouseOver = useCallback(
    (e) => {
      const target = e.target;
      if (isInteractiveElement(target) || isIconElement(target)) {
        setCursorSize("medium");
      } else {
        setCursorSize("small");
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

  useEffect(() => {
    document.body.className =
      theme === "dark"
        ? "bg-secondary text-primary"
        : "bg-primary text-secondary";
  }, [theme]);

  // Custom cursor functionality
  useEffect(() => {
    // Initialize cursor visibility
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.display = "block";
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter, true);
    document.addEventListener("mouseleave", handleMouseLeave, true);
    document.addEventListener("mouseover", handleMouseOver, true);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter, true);
      document.removeEventListener("mouseleave", handleMouseLeave, true);
      document.removeEventListener("mouseover", handleMouseOver, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseOver,
    handleKeyDown,
  ]);

  return (
    <div
      className={`relative ${
        theme === "dark"
          ? "bg-secondary text-primary"
          : "bg-primary text-secondary"
      }`}
    >
      {/* Custom Cursor */}
      <div ref={cursorRef} className={`custom-cursor ${cursorSize}`}></div>
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
          theme={theme}
          onThemeChange={setTheme}
        />
      </div>
      {/* Navigation Menu */}
      <div className={navOpen ? "no-blur" : ""}>
        <NavigationMenu
          isOpen={navOpen}
          onClose={() => setNavOpen(false)}
          navData={data.nav}
          onNavigate={handleNavigate}
          theme={theme}
        />
      </div>
      {/* Contact Drawer */}
      <div className={contactOpen ? "no-blur" : ""}>
        <ContactDrawer
          isOpen={contactOpen}
          onClose={() => setContactOpen(false)}
          contactData={data}
          theme={theme}
        />
      </div>
      {/* Main Content */}{" "}
      {/* <Hero data={data.hero} theme={theme} />
      <WhatIDo data={data.whatido} theme={theme} />
      <MyWork data={data.mywork} theme={theme} />
      <About data={data.about} theme={theme} />
      <Contact data={data.contact} theme={theme} /> */}
      <div className="flex items-center justify-center min-h-screen">hello</div>
      {/* Overlay for drawers */}
      {(navOpen || contactOpen || settingsOpen) && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md z-50 transition-all duration-300"
          onClick={handleOverlayClick}
        ></div>
      )}
    </div>
  );
}

export default App;
