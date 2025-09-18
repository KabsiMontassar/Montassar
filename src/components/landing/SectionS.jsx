import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionS = () => (
  <div className="relative w-full h-full bg-white overflow-hidden">
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
