import React, { useState, useEffect } from 'react';

const ConnectionStatus = ({ apiCall }) => {
  const [status, setStatus] = useState({ connected: false, loading: true });

  useEffect(() => {
    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const checkConnection = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/health');
      const data = await response.json();
      setStatus({ 
        connected: response.ok, 
        loading: false, 
        message: data.message,
        database: data.database 
      });
    } catch (error) {
      setStatus({ 
        connected: false, 
        loading: false, 
        message: 'Backend server not reachable',
        error: error.message 
      });
    }
  };

  if (status.loading) return null;

  return (
    <div className={`alert ${status.connected ? 'alert-success' : 'alert-danger'} alert-dismissible fade show`} role="alert">
      <div className="d-flex align-items-center">
        <i className={`fas ${status.connected ? 'fa-check-circle' : 'fa-exclamation-triangle'} me-2`}></i>
        <div>
          <strong>{status.connected ? 'Connected' : 'Connection Error'}</strong>
          <div className="small">{status.message}</div>
          {status.database && (
            <div className="small">Database: {status.database}</div>
          )}
        </div>
        {!status.connected && (
          <button 
            className="btn btn-sm btn-outline-danger ms-auto"
            onClick={checkConnection}
          >
            <i className="fas fa-sync-alt me-1"></i>Retry
          </button>
        )}
      </div>
    </div>
  );
};

export default ConnectionStatus;