import React from 'react';
import { motion } from 'framer-motion';
import Magnet from '../ui/Magnet';
import Counter from '../ui/typography/Counter';

const WorkSection = ({ currentSlide = 0, sectionIndex = 0 }) => {
    // Determine variant based on section index (odd = black, even = white)
    const isBlackVariant = sectionIndex % 2 === 0;

    // Section-specific content
    const getSectionContent = (index) => {
        const sections = [
            {
                title: "YieldStone",
                subtitle: "Page",
                description: "Web Development Solutions",
                buttonText: "Show Me",
                imageUrl: "https://picsum.photos/800/600"
            },
            {
                title: "TechFlow",
                subtitle: "Platform",
                description: "Modern Tech Infrastructure",
                buttonText: "Explore",
                imageUrl: "https://picsum.photos/801/601"
            },
            {
                title: "DataSync",
                subtitle: "Analytics",
                description: "Data-Driven Insights",
                buttonText: "Discover",
                imageUrl: "https://picsum.photos/802/602"
            },
            {
                title: "CloudHub",
                subtitle: "Services",
                description: "Scalable Cloud Solutions",
                buttonText: "Launch",
                imageUrl: "https://picsum.photos/803/603"
            },
            {
                title: "DevOps Pro",
                subtitle: "Automation",
                description: "Streamlined Development",
                buttonText: "Optimize",
                imageUrl: "https://picsum.photos/804/604"
            }
        ];
        return sections[index] || sections[0];
    };

    const content = getSectionContent(sectionIndex);

    return (
        <div className={`relative w-full min-h-screen overflow-hidden ${isBlackVariant
            ? 'bg-gradient-to-r from-black to-[#222121] text-white'
            : 'bg-gradient-to-r from-white to-gray-50 text-black'
            }`}>
            {/* Background Index Number */}
            <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
                <span className={`text-[12rem] md:text-[18rem] font-extrabold select-none leading-none ${isBlackVariant ? 'text-white/5' : 'text-black/5'
                    }`}>
                    0{currentSlide + 1}
                </span>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex flex-col lg:flex-row min-h-screen">

                {/* Left Half - Title and Content */}
                <div className="flex-1 flex items-center justify-center min-h-screen lg:min-h-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-0">
                    <div className="flex flex-col justify-center items-center space-y-6 lg:space-y-8 max-w-lg text-center lg:text-left lg:items-start">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Title */}
                            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-2 ${isBlackVariant
                                ? 'bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4] clip-text text-transparent bg-clip-text'
                                : 'bg-gradient-to-r from-black to-gray-800 clip-text text-transparent bg-clip-text'
                                }`}>
                                {content.title.split(" ").map((word, i) => (
                                    <span key={i}>
                                        {word}
                                    </span>
                                ))}
                            </h1>

                            {/* Subtitle */}
                            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight ${isBlackVariant
                                ? 'bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4] clip-text text-transparent bg-clip-text'
                                : 'bg-gradient-to-r from-black to-gray-800 clip-text text-transparent bg-clip-text'
                                }`}>
                                {content.subtitle}
                            </h1>
                        </motion.div>

                        {/* Decorative Lines */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="inline-block space-y-4 justify-center lg:justify-start"
                        >
                            <div className={`w-12 sm:w-16 lg:w-20 h-1 rounded-full ${isBlackVariant
                                ? 'bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4]'
                                : 'bg-gradient-to-r from-black to-gray-800'
                                }`}></div>
                            <div className={`w-8 ml-4 sm:w-12 lg:w-16 h-1 rounded-full ${isBlackVariant
                                ? 'bg-gradient-to-r from-[#fcfcfc] to-[#d4d4d4]'
                                : 'bg-gradient-to-r from-black to-gray-800'
                                }`}></div>
                        </motion.div>

                        {/* Magnetic Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            <Magnet padding={30} magnetStrength={2}>
                                <button className={`group relative px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full font-semibold text-sm sm:text-base lg:text-lg transition-all duration-300 overflow-hidden ${isBlackVariant
                                    ? 'bg-gradient-to-r from-[#f9f9f9] to-[#b6b6b6] text-black hover:shadow-lg'
                                    : 'bg-gradient-to-r from-black to-gray-800 text-white hover:shadow-lg'
                                    }`}>
                                    <span className="relative z-10 flex items-center gap-2 sm:gap-3">
                                        {content.buttonText}
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
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ${isBlackVariant ? 'bg-black/10' : 'bg-white/10'
                                        }`}></div>
                                </button>
                            </Magnet>
                        </motion.div>
                    </div>
                </div>

                {/* Right Half - Card */}
                <div className="flex-1  flex items-center justify-center min-h-screen lg:min-h-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8 lg:py-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg xl:max-w-xl"
                    >
                        <div
                            className="ml-25 relative w-full aspect-[4/3] rounded-2xl lg:rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
                            style={{
                                backgroundImage: `url(${content.imageUrl})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                            {/* Overlay */}
                            <div className={`absolute inset-0 ${isBlackVariant
                                ? 'bg-gradient-to-t from-black/30 via-transparent to-black/10'
                                : 'bg-gradient-to-t from-white/30 via-transparent to-white/10'
                                }`}></div>


                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default WorkSection;