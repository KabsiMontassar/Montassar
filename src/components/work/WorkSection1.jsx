import React from 'react';
import { motion } from 'framer-motion';
import Magnet from '../ui/Magnet';

const WorkSection1 = ({ currentSlide = 0 }) => {
  const slideNumber = String(currentSlide + 1).padStart(2, '0');

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-r from-black to-[#222121] overflow-hidden">
      {/* Main Content Container */}
      <div className="flex items-center justify-center min-h-screen px-8 lg:px-16 xl:px-20">

        {/* Left Side - Title and Content */}
        <div className="gap-5 flex-1 ml-24 lg:ml-32 flex flex-col justify-center items-start space-y-8 max-w-lg">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}

          >
            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-bold
            bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4]
                clip-text text-transparent bg-clip-text
             leading-tight">
              YieldStone
            </h1>

            {/* Subtitle */}
            <h1 className="text-5xl md:text-7xl
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
            className="space-y-3 ml-4"
          >
            <div className="w-20 h-1 bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4]  rounded-full ml-4"></div>
            <div className="w-20 h-1 bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4] rounded-full ml-16"></div>
          </motion.div>

          {/* Magnetic Button */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <Magnet padding={50} magnetStrength={3}>
              <button className="group relative px-12 py-8 bg-gradient-to-r from-[#f9f9f9] to-[#b6b6b6] rounded-full text-black  text-lg transition-all duration-300 overflow-hidden">
                <span className="relative z-10 flex items-center gap-3">
                  Show Me
                  <svg
                    width="20"
                    height="20"
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
                <div className="absolute inset-0  opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </Magnet>
          </motion.div>
        </div>

        {/* Right Side - Image with Slide Number */}
        <div className="flex-1 mr-20 lg:mr-20 flex justify-end items-center relative pr-8">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative max-w-2xl w-full"
          >
            <div
              className="relative 
                    w-[780px] h-[460px] 
                     rounded-3xl border border-[#e2e8f0]/5"
              style={{
                backgroundImage: `url(https://picsum.photos/200/300)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
            >




              {/* Slide Number Card */}
              <div className="absolute
              text-white
                 text-5xl
               w-[150px] h-[150px]
               justify-center items-center flex
               bottom-6 right-6 bg-black/60 backdrop-blur-md rounded-xl px-4 py-2 border border-white/20">
            
                  {slideNumber}
              </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default WorkSection1;