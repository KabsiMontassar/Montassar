import React, { useRef } from 'react';

const SettingsPanel = ({ isOpen, onToggle, language, onLanguageChange, theme, onThemeChange }) => {
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      onToggle();
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-25 w-14 h-14 bg-secondary border-2 border-primary rounded-full shadow-lg hover:bg-primary hover:border-secondary transition-all duration-300 flex items-center justify-center group"
        style={{ zIndex: 20 }}
      >
        <span className="text-2xl text-primary group-hover:text-secondary transition-colors">⚙</span>
      </button>
      {isOpen && (
        <div
          className="fixed bottom-20 right-6 z-60 w-64 bg-primary border-2 border-secondary rounded-2xl shadow-2xl transform transition-all duration-300"
          ref={menuRef}
          onClick={handleClickOutside}
        >
          <div className="p-6 space-y-6">
            {/* Language Setting */}
            <div>
              <h4 className="text-xl font-bold text-secondary mb-2">Language</h4>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="w-full p-2 border border-secondary rounded-lg"
              >
                <option value="en">English</option>
                <option value="fr">French</option>
              </select>
            </div>
            {/* Theme Setting */}
            <div>
              <h4 className="text-xl font-bold text-secondary mb-2">Theme</h4>
              <button
                onClick={() => onThemeChange(theme === 'light' ? 'dark' : 'light')}
                className="w-full bg-secondary text-primary py-2 px-4 rounded-lg hover:bg-accent1 transition-colors font-semibold"
              >
                Toggle Theme
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsPanel;