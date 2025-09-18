import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionS = () => (
  <div className="relative w-full h-full bg-gradient-to-br from-orange-900 via-red-900 to-yellow-900 overflow-hidden">
    {/* Animated geometric shapes */}
    <div className="absolute inset-0">
      <motion.div
        className="absolute top-16 right-32 w-16 h-16 border-2 border-orange-400/30 rotate-45"
        animate={{
          rotate: [45, 135, 45],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-24 left-24 w-12 h-12 bg-red-400/20 rounded-full"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 border border-yellow-400/20 rotate-12"
        animate={{
          rotate: [12, 72, 12],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </div>

    <div className="absolute inset-0 bg-black/30" />
    <div className="relative z-10 h-full flex items-center justify-center text-white">
      <div className="text-center max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-wider bg-gradient-to-r from-orange-200 via-red-200 to-yellow-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Creative Solutions
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            We blend technology and creativity to deliver exceptional digital
            experiences that captivate and inspire
          </motion.p>
        </motion.div>
      </div>
    </div>
  </div>
);

export default SectionS;
