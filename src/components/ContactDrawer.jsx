import React from 'react';

const ContactDrawer = ({ isOpen, onClose, contactData, theme }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-end z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-primary border-2 border-secondary rounded-2xl p-12 w-[45vw] h-[90vh] mx-4 transform transition-transform duration-500 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <button onClick={onClose} className="absolute top-6 right-6 text-3xl text-secondary hover:text-accent1">&times;</button>
        <div className="flex-1 flex flex-col justify-center">
          <h3 className="text-4xl font-bold text-secondary mb-8 text-center">{contactData.buttons.letsTalk}</h3>
          <div className="space-y-6">
            <a href="https://linkedin.com" className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl">
              LinkedIn
            </a>
            <a href="mailto:montassar@example.com" className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl">
              Email
            </a>
            <a href="https://github.com" className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl">
              GitHub
            </a>
            <a href="https://credly.com" className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl">
              Credly
            </a>
            <button className="w-full bg-secondary text-primary py-4 px-6 rounded-lg hover:bg-accent1 transition-colors font-semibold text-xl">
              {contactData.buttons.contactUs}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactDrawer;