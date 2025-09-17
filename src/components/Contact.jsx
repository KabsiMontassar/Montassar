import React from 'react';

const Contact = ({ data, theme }) => {
  return (
    <section id="contact" className={`min-h-screen flex items-center justify-center py-20 ${theme === 'dark' ? 'bg-secondary text-primary' : 'bg-primary text-secondary'}`}>
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10">{data.title}</h2>
        <p className="text-lg mb-4">{data.message}</p>
        <p>Email: {data.email}</p>
        <p>Phone: {data.phone}</p>
      </div>
    </section>
  );
};

export default Contact;