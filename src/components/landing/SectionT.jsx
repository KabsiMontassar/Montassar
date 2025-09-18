import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionT = () => (
  <div className="relative w-full h-full bg-gradient-to-r from-black to-[#222121] overflow-hidden">
    <div className="relative z-10 h-full flex items-center justify-center text-white">
      <div className="text-center max-w-6xl px-8">
        <motion.div
          initial={{ opacity: 0, rotateX: 45 }}
          animate={{ opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-wider bg-gradient-to-r from-green-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent"
            initial={{ opacity: 0, rotateX: 45 }}
            animate={{ opacity: 1, rotateX: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Let's Build Together
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-3xl mx-auto leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Ready to transform your vision into reality? Let's create something
            extraordinary together
          </motion.p>
          <motion.button
            className="mt-8 px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white font-semibold text-lg hover:from-green-600 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    </div>
  </div>
);

export default SectionT;
