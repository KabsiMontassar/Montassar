import React from 'react';
import Panel from './Panel';

const ContactDrawer = ({ isOpen, onClose, contactData }) => {
  return (
    <Panel isOpen={isOpen} onClose={onClose} position="end">
      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-secondary mb-8 text-center">
          {contactData.buttons.letsTalk}
        </h3>
        <div className="space-y-6">
          <a
            href="https://linkedin.com"
            className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl"
          >
            LinkedIn
          </a>
          <a
            href="mailto:montassar@example.com"
            className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl"
          >
            Email
          </a>
          <a
            href="https://github.com"
            className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl"
          >
            GitHub
          </a>
          <a
            href="https://credly.com"
            className="block text-secondary hover:text-accent1 transition-colors py-4 px-6 rounded-lg hover:bg-secondary hover:bg-opacity-10 text-xl"
          >
            Credly
          </a>
          <button
            className="w-full bg-secondary text-primary py-4 px-6 rounded-lg hover:bg-accent1 transition-colors font-semibold text-xl"
          >
            {contactData.buttons.contactUs}
          </button>
        </div>
      </div>
    </Panel>
  );
};

export default ContactDrawer;