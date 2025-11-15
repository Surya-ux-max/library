import React from 'react';

const PageTransition = ({ children, className = '' }) => {
  return (
    <div className={`fade-in ${className}`} style={{
      animation: 'fadeIn 0.4s ease-out',
      animationFillMode: 'both'
    }}>
      {children}
    </div>
  );
};

export default PageTransition;