import React from 'react';

const WhatIDo = ({ data, theme }) => {
  return (
    <section id="whatido" className="relative min-h-screen bg-black text-white">
      {/* Top Separator */}
      <div className="section-separator top">
        <div className="separator-line"></div>
        <div className="separator-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      </div>
      
      {/* Content */}
      <div className="flex items-center justify-center py-20 px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-10">{data.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {data.services.map((service, index) => (
              <div key={index} className="p-6 rounded-lg shadow-lg bg-gray-900 text-white border border-gray-700">
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p>{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Bottom Separator */}
      <div className="section-separator bottom">
        <div className="separator-dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
        <div className="separator-line"></div>
      </div>
    </section>
  );
};


export default WhatIDo;