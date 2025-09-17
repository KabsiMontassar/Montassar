import React, { useRef } from 'react';

const Panel = ({ isOpen, onClose, children, position = "start" }) => {
  const panelRef = useRef(null);

  const handleClickOutside = (event) => {
    if (panelRef.current && !panelRef.current.contains(event.target)) {
      onClose();
    }
  };

  const positionClasses = {
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
  };

  return (
    <div
      className={`fixed inset-0 flex items-center ${positionClasses[position]} z-60 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      onClick={handleClickOutside}
    >
      <div
        ref={panelRef}
        className={`bg-primary border-2 border-secondary rounded-2xl p-12 w-[45vw] h-[90vh] mx-4 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : position === "start" ? '-translate-x-full' : 'translate-x-full'} flex flex-col`}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl text-secondary hover:text-accent1"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Panel;