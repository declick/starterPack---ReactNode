// ScrollApp.jsx

import React from 'react'
import { useState, useEffect } from "react"

const ScrollApp = () => {
    const [showTopBtn, setShowTopBtn] = useState(false);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 400) {
          setShowTopBtn(true);
        } else {
          setShowTopBtn(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
   return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
  
    const goToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };

    return (
      <div className={`top_button ${showTopBtn ? 'show' : ''}`}>
        {showTopBtn && (
          <div className="button_position button_style" onClick={goToTop}>
         <i className="fa fa-chevron-up"></i> </div>
        )}
      </div>
    );
  };
  
  export default ScrollApp;
  