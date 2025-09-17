import React from 'react';
import Panel from './Panel';

const NavigationMenu = ({ isOpen, onClose, navData, onNavigate }) => {
  return (
    <Panel isOpen={isOpen} onClose={onClose} position="start">
      <nav className="flex-1 flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-secondary mb-8 text-center">
          Navigation
        </h3>
        <ul className="space-y-6">
          {Object.entries(navData).map(([key, label]) => (
            <li key={key}>
              <button
                onClick={() => {
                  onNavigate(key);
                  onClose();
                }}
                className="block w-full text-left text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl"
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </Panel>
  );
};

export default NavigationMenu;