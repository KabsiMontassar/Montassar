import React from 'react';
import { motion } from 'framer-motion';
import Magnet from '../ui/Magnet';

const WorkSection1 = ({ currentSlide = 0 }) => {
  const slideNumber = String(currentSlide + 1).padStart(2, '0');

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-black to-[#222121] overflow-hidden">
      {/* Background Index Number */}
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
        <span className="text-[12rem] md:text-[18rem] font-extrabold text-white/5 select-none leading-none">
          {slideNumber}
        </span>
      </div>

      {/* Main Content Container */}
      <div className="relative z-10  flex flex-col lg:flex-row items-center justify-between min-h-screen px-4 sm:px-6 lg:px-8 xl:px-16 py-8 lg:py-0">

        {/* Left Side - Title and Content */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-6 lg:space-y-8 max-w-lg mb-8 lg:mb-0 lg:ml-16 xl:ml-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold
            bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4]
                clip-text text-transparent bg-clip-text
             leading-tight mb-2">
              YieldStone
            </h1>

            {/* Subtitle */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
             font-bold bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4]
                clip-text text-transparent bg-clip-text
              leading-tight">
              Page
            </h1>
          </motion.div>

          {/* Decorative Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col space-y-3"
          >
            <div className="w-12 sm:w-16 lg:w-20 h-1 bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4] rounded-full"></div>
            <div className="w-8 sm:w-12 lg:w-16 h-1 bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4] rounded-full ml-4"></div>
          </motion.div>

          {/* Magnetic Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Magnet padding={30} magnetStrength={2}>
              <button className="group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 bg-gradient-to-r from-[#f9f9f9] to-[#b6b6b6] rounded-full text-black text-sm sm:text-base lg:text-lg transition-all duration-300 overflow-hidden hover:shadow-lg">
                <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                  Show Me
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-black/10"></div>
              </button>
            </Magnet>
          </motion.div>
        </div>

        {/* Right Side - Card */}
        <div className="flex-1 flex justify-center lg:justify-end items-center relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full"
          >
            <div
              className="relative w-full aspect-[4/3] rounded-2xl lg:rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
              style={{
                backgroundImage: `url(https://picsum.photos/800/600)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10"></div>

            
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkSection1;