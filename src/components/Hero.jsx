import React from 'react';

const Hero = ({ data, theme }) => {
  return (
    <section id="hero" className={`min-h-screen flex items-center justify-center fade-in ${theme === 'dark' ? 'bg-secondary text-primary' : 'bg-primary text-secondary'}`}>
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4">{data.title}</h1>
        <h2 className="text-2xl mb-4">{data.subtitle}</h2>
        <p className="text-lg">{data.description}</p>
      </div>
    </section>
  );
};

export default Hero;