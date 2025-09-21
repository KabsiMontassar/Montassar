import { motion } from "framer-motion";

const variants = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0,
    },
};

const PageTransition = ({ children }) => {
    return (
        <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{
                duration: 0.5,
                ease: "easeInOut"
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 1
            }}
        >
            {children}
        </motion.div>
    );
};

export default PageTransition;