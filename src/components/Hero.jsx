import React from "react";

const Hero = ({ data }) => {
  return (
    <section id="hero" className=" flex fade-in bg-primary text-secondary">
      <div className="hero-container">
        <div className="hero-text">
          <div className="hero-title">
            <div >
              <span className="text-black">A tech and cloud workshop</span>
            </div>
            <div >
              <span className="text-black">creating </span>
              <div className="colorful-text">
                <div className="char char-1">F</div>
                <div className="char char-2">L</div>
                <div className="char char-3">O</div>
                <div className="char char-4">W</div>
                <div className="char char-5">I</div>
                <div className="char char-6">N</div>
                <div className="char char-7">G</div>
              </div>
              <span className="text-black"> and </span>
              <span className="colorful-text-alt">efficient</span>
            </div>
            <div >
              <span className="text-black">web experiences</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
