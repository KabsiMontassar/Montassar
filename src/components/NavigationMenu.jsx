import React from 'react';

const NavigationMenu = ({ isOpen, onClose, navData, onNavigate  }) => {
  const handleClick = (section) => {
    onNavigate(section);
    onClose();
  };




  return (
    <div className={`fixed inset-0 flex items-center justify-start z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-primary border-2 border-secondary rounded-2xl p-12 w-[45vw] h-[90vh] mx-4 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
        <button onClick={onClose} className="absolute top-6 right-6 text-3xl text-secondary hover:text-accent1">&times;</button>
        <nav className="flex-1 flex flex-col justify-center">
          <h3 className="text-4xl font-bold text-secondary mb-8 text-center">Navigation</h3>
          <ul className="space-y-6">
            {Object.entries(navData).map(([key, label]) => (
              <li key={key}>
                <button
                  onClick={() => handleClick(key)}
                  className="block w-full text-left text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default NavigationMenu;