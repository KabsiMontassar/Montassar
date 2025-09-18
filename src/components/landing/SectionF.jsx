import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import CurvedLoop from "../CurvedLoop";

// Register GSAP plugins
gsap.registerPlugin(Observer);

const SectionF = () => (
  <div className="relative w-full h-full bg-gradient-to-r from-black to-[#222121] overflow-hidden">
    {/* Main content - centered */}
    <div className="relative z-10 h-full flex items-center justify-center text-white pb-32">
      <div className="text-center w-full px-4 md:px-8 lg:px-16">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.h1
            className="text-6xl md:text-8xl font-bold mb-8 uppercase tracking-wider bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Welcome to Innovation
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl max-w-5xl mx-auto leading-relaxed text-gray-300"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            Experience the future of web design with our cutting-edge parallax
            effects and seamless animations
          </motion.p>
        </motion.div>
      </div>
    </div>

    <div
      className="flex items-end justify-end absolute bottom-0 left-0 right-0 z-20"
      style={{ height: "120px" }}
    >
      <CurvedLoop
        marqueeText="Kebsi Montassar ✦ Creative Developer ✦ Software Engineer ✦"
        speed={0.8}
        curveAmount={150}
        direction="left"
        interactive={true}
      />
    </div>
  </div>
);

export default SectionF;
