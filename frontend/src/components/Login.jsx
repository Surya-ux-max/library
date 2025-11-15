import React, { useState } from 'react';

const Login = ({ onLogin, apiCall }) => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const data = await apiCall('/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
      
      onLogin(data.access_token);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      position: 'relative'
    }}>
      {/* Animated background elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
        opacity: 0.3
      }}></div>
      
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-lg" style={{borderRadius: '20px'}}>
              <div className="card-body p-5">
                <div className="text-center mb-4">
                  <div className="bg-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3" 
                       style={{width: '80px', height: '80px'}}>
                    <i className="fas fa-book-open fa-2x text-white"></i>
                  </div>
                  <div className="brand-container mb-3">
                    <h2 className="brand-title mb-1" style={{fontSize: '3rem'}}>SURVEX</h2>
                    <p className="brand-subtitle mb-1">Library Management System</p>
                    <div className="brand-tagline" style={{fontSize: '0.85rem'}}>Technology Solutions Group</div>
                    <div className="brand-description" style={{fontSize: '0.75rem'}}>Enterprise Software Development</div>
                  </div>
                  <h4 className="fw-bold text-dark">Admin Login</h4>
                </div>
                
                {error && (
                  <div className="alert alert-danger border-0 rounded-3 fade-in" role="alert">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Username</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <i className="fas fa-user text-muted"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control border-0 bg-light"
                        placeholder="Enter your username"
                        value={credentials.username}
                        onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                        required
                        style={{borderRadius: '0 10px 10px 0'}}
                      />
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label fw-semibold text-dark">Password</label>
                    <div className="input-group">
                      <span className="input-group-text border-0 bg-light">
                        <i className="fas fa-lock text-muted"></i>
                      </span>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        className="form-control border-0 bg-light"
                        placeholder="Enter your password"
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        required
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary border-0 bg-light"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{borderRadius: '0 10px 10px 0'}}
                      >
                        <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} text-muted`}></i>
                      </button>
                    </div>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 py-3 fw-bold" 
                    disabled={loading}
                    style={{borderRadius: '10px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', border: 'none'}}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Signing in...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        Sign In
                      </>
                    )}
                  </button>
                </form>
                
                <div className="mt-4 text-center">
                  <div className="bg-light rounded-3 p-3">
                    <small className="text-muted d-block mb-1">
                      <i className="fas fa-info-circle me-1"></i>
                      Demo Credentials
                    </small>
                    <div className="d-flex justify-content-between align-items-center">
                      <span className="badge bg-secondary">admin</span>
                      <i className="fas fa-arrow-right text-muted"></i>
                      <span className="badge bg-secondary">admin123</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center mt-3">
                  <div className="text-center">
                    <div className="company-badge" style={{fontSize: '0.65rem', padding: '3px 8px'}}>Secure Enterprise Access</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;