import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionS = () => (
  <div className="relative w-full h-full bg-[#f4f4f4] overflow-hidden ">
    <div className="relative z-10 h-full flex items-center justify-center text-black">
      <div className="text-center w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1
            className="text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-tight max-w-5xl mx-auto text-gray-900"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1.0,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Building playful, tactile experiences with{" "}
            <span
              className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent inline-block align-baseline"
              style={{ lineHeight: "1.2", verticalAlign: "baseline" }}
            >
              AI
            </span>
            ,{" "}
            <span
              className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent inline-block align-baseline"
              style={{ lineHeight: "1.2", verticalAlign: "baseline" }}
            >
              Cloud
            </span>
            ,{" "}
            <span
              className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent inline-block align-baseline"
              style={{ lineHeight: "1.2", verticalAlign: "baseline" }}
            >
              DevOps
            </span>
            , and cutting-edge web technologies.
          </motion.h1>

          <motion.button
            className="mt-8 px-12 py-4 bg-black text-white font-semibold text-lg rounded-full hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.6,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View all Work
          </motion.button>
        </motion.div>
      </div>
    </div>
  </div>
);

export default SectionS;
