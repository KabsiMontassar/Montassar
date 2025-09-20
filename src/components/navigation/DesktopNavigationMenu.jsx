import React from "react";
import { motion } from "framer-motion";
import YinYang from "../ui/shapes/YinYang";
import Magnet from "../ui/Magnet";
import { MENU_TRANSITION, NAVIGATION_ITEMS, SOCIAL_LINKS } from "../../utils/constants";

/**
 * Desktop full-screen navigation menu
 */
const DesktopNavigationMenu = ({ 
  isMenuOpen, 
  onClose, 
  navigateToSection, 
  sectionStyles, 
  formattedTime,
  yinYangSvg,
  isMontassarHovered,
  setIsMontassarHovered
}) => {
  return (
    <motion.div
      initial={{ y: "-100%" }}
      animate={{ y: isMenuOpen ? 0 : "-100%" }}
      transition={MENU_TRANSITION}
      className={`fixed inset-0 z-40 ${sectionStyles.menuBackground} hidden md:block`}
      onClick={onClose}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Header with Yin-Yang */}
        <div className="absolute top-8 left-8 tablet-yin-yang">
          <motion.div className="flex items-center">
            <h1 className={`text-2xl p-0 font-light ${sectionStyles.textColor}`}></h1>
            <Magnet padding={100} disabled={false} magnetStrength={3}>
              <YinYang 
                src={yinYangSvg}
                isHovered={isMontassarHovered}
                size="w-10 h-10"
                filterClass={sectionStyles.filterClass}
                className="space-x-1"
                onMouseEnter={() => setIsMontassarHovered(true)}
                onMouseLeave={() => setIsMontassarHovered(false)}
              />
            </Magnet>
          </motion.div>
        </div>

        {/* Main Navigation */}
        <div
          className="flex-1 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: isMenuOpen ? 1 : 0,
                y: isMenuOpen ? 0 : 20,
              }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-8"
            >
              {NAVIGATION_ITEMS.map((item) => (
                <button
                  key={item.name}
                  onClick={() => navigateToSection(item.index)}
                  className={`block text-6xl md:text-8xl font-light ${sectionStyles.textColor} ${sectionStyles.hoverColor} transition-colors duration-300 tablet-menu-nav laptop-menu-nav large-menu-nav`}
                >
                  {item.name}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div
          className="absolute bottom-8 left-8 right-8 flex justify-between items-end tablet-bottom-section"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Time Display */}
          <div className={`text-center ${sectionStyles.textColor}`}>
            <div className="text-2xl font-bold mb-1">Local time</div>
            <div className="text-3xl font-bold">{formattedTime}</div>
          </div>

          {/* Social Links */}
          <div className={`text-left ${sectionStyles.textColor}`}>
            <div className="text-3xl font-bold mb-2">Socials</div>
            <div className="flex space-x-6 justify-end">
              {SOCIAL_LINKS.map(({ name, href, external }) => (
                <a
                  key={name}
                  href={href}
                  {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                  className={`text-2xl font-bold ${sectionStyles.hoverColor} transition-colors duration-300`}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default DesktopNavigationMenu;