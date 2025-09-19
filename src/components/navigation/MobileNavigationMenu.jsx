import React from "react";
import { motion } from "framer-motion";
import YinYang from "../ui/YinYang";
import Magnet from "../ui/Magnet";
import { NAVIGATION_ITEMS, SOCIAL_LINKS } from "../../utils/constants";

/**
 * Mobile drawer navigation menu
 */
const MobileNavigationMenu = ({ 
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
    <div className="md:hidden">
      {/* Overlay */}
      <motion.div 
        initial={{ opacity: 0, visibility: "hidden" }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0,
          visibility: isMenuOpen ? "visible" : "hidden"
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="mobile-drawer-overlay"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isMenuOpen ? 0 : "100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`mobile-drawer ${sectionStyles.menuBackground}`}
      >
        <div className="mobile-drawer-content">
          {/* Header */}
          <div className="mobile-drawer-header">
            <Magnet padding={80} disabled={false} magnetStrength={2}>
              <YinYang 
                src={yinYangSvg}
                isHovered={isMontassarHovered}
                size="w-8 h-8"
                filterClass={sectionStyles.filterClass}
                onMouseEnter={() => setIsMontassarHovered(true)}
                onMouseLeave={() => setIsMontassarHovered(false)}
              />
            </Magnet>
            <button 
              onClick={onClose}
              className={`mobile-drawer-close ${sectionStyles.textColor}`}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <div className="mobile-drawer-nav">
            {NAVIGATION_ITEMS.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => navigateToSection(item.index)}
                className={`${sectionStyles.textColor} ${sectionStyles.hoverColor} transition-colors duration-300`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ 
                  opacity: isMenuOpen ? 1 : 0,
                  x: isMenuOpen ? 0 : 20 
                }}
                transition={{ delay: 0.1 + index * 0.1, duration: 0.3 }}
              >
                {item.name}
              </motion.button>
            ))}
          </div>

          {/* Footer */}
          <div className="mobile-drawer-footer">
            <div className={`${sectionStyles.textColor} mobile-time-section`}>
              <div className="mobile-time-text">Local time</div>
              <div className="mobile-time-value">{formattedTime}</div>
            </div>

            <div className={`${sectionStyles.textColor} mobile-social-section`}>
              <div className="mobile-social-text">Socials</div>
              <div className="mobile-social-links">
                {SOCIAL_LINKS.map(({ name, href, external }) => (
                  <a
                    key={name}
                    href={href}
                    {...(external && { target: "_blank", rel: "noopener noreferrer" })}
                    className={`${sectionStyles.hoverColor} transition-colors duration-300 m-1`}
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MobileNavigationMenu;