import React from 'react';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight: '300px'}}>
      <div className="spinner-border text-primary mb-3" style={{width: '3rem', height: '3rem'}} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <p className="text-muted fw-semibold">{message}</p>
    </div>
  );
};

export default LoadingSpinner;