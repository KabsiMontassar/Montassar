import React from 'react';

const SettingsPanel = ({ isOpen, onToggle, language, onLanguageChange, theme, onThemeChange }) => {
  return (
    <>
      {/* Settings Toggle Button - Creative positioning */}
      <button
        onClick={onToggle}
        className="fixed bottom-6 right-6 z-25 w-14 h-14 bg-secondary border-2 border-primary rounded-full shadow-lg hover:bg-primary hover:border-secondary transition-all duration-300 flex items-center justify-center group"
        style={{ zIndex: 20 }}
      >
        <span className="text-2xl text-primary group-hover:text-secondary transition-colors">⚙</span>
      </button>

      {/* Settings Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-35 transition-opacity duration-300"
            onClick={onToggle}
          />

          {/* Settings Card */}
          <div className="fixed bottom-20 right-6 z-50 w-80 bg-primary border-2 border-secondary rounded-2xl shadow-2xl transform transition-all duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-secondary">
              <h3 className="text-2xl font-bold text-secondary">Settings</h3>
              <button
                onClick={onToggle}
                className="w-8 h-8 flex items-center justify-center text-secondary hover:text-accent1 transition-colors text-xl"
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Language Setting */}
              <div>
                <label className="block text-secondary font-semibold mb-3 text-lg">Language</label>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => onLanguageChange(e.target.value)}
                    className="w-full bg-secondary text-primary border-2 border-primary rounded-lg px-4 py-3 text-lg appearance-none cursor-pointer hover:border-accent1 transition-colors"
                  >
                    <option value="en">🇺🇸 English</option>
                    <option value="fr">🇫🇷 Français</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>

              {/* Theme Setting */}
              <div>
                <label className="block text-secondary font-semibold mb-3 text-lg">Theme</label>
                <div className="relative">
                  <select
                    value={theme}
                    onChange={(e) => onThemeChange(e.target.value)}
                    className="w-full bg-secondary text-primary border-2 border-primary rounded-lg px-4 py-3 text-lg appearance-none cursor-pointer hover:border-accent1 transition-colors"
                  >
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                  </select>
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primary pointer-events-none">
                    ▼
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SettingsPanel;