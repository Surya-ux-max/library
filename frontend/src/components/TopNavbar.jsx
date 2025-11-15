import React from 'react';
import { useLocation } from 'react-router-dom';

const TopNavbar = ({ onMenuToggle, onLogout }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const routes = {
      '/': 'Dashboard',
      '/books': 'Books Management',
      '/add-book': 'Add New Book',
      '/members': 'Members Management', 
      '/add-member': 'Add New Member',
      '/issue-book': 'Issue Book',
      '/transactions': 'Transactions'
    };
    return routes[location.pathname] || 'Library Management';
  };

  const getBreadcrumb = () => {
    const path = location.pathname;
    if (path === '/') return ['Dashboard'];
    if (path.includes('book')) return ['Books', getPageTitle()];
    if (path.includes('member')) return ['Members', getPageTitle()];
    if (path.includes('transaction')) return ['Transactions'];
    if (path.includes('issue')) return ['Issue Book'];
    return [getPageTitle()];
  };

  return (
    <nav className="top-navbar sticky-top px-4 py-3">
      <div className="d-flex align-items-center justify-content-between">
        {/* Left Section */}
        <div className="d-flex align-items-center">
          <button 
            className="menu-toggle me-3"
            onClick={onMenuToggle}
            title="Toggle Menu"
          >
            <i className="fas fa-bars"></i>
          </button>
          
          <div>
            <h4 className="mb-0 fw-bold text-dark">{getPageTitle()}</h4>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 small">
                <li className="breadcrumb-item">
                  <i className="fas fa-home me-1"></i>Home
                </li>
                {getBreadcrumb().map((crumb, index) => (
                  <li 
                    key={index} 
                    className={`breadcrumb-item ${index === getBreadcrumb().length - 1 ? 'active' : ''}`}
                  >
                    {crumb}
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center">
          {/* Notifications */}
          <div className="dropdown me-3">
            <button 
              className="btn btn-link text-dark p-2 position-relative"
              data-bs-toggle="dropdown"
              title="Notifications"
            >
              <i className="fas fa-bell"></i>
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '10px'}}>
                3
              </span>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li><h6 className="dropdown-header">Notifications</h6></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-book text-primary me-2"></i>New book added</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-user text-success me-2"></i>New member registered</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-clock text-warning me-2"></i>Book return due</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item text-center" href="#">View all notifications</a></li>
            </ul>
          </div>

          {/* Search */}
          <div className="me-3">
            <div className="input-group" style={{width: '250px'}}>
              <input 
                type="text" 
                className="form-control form-control-sm border-0 bg-light" 
                placeholder="Quick search..."
              />
              <button className="btn btn-outline-secondary btn-sm border-0 bg-light" type="button">
                <i className="fas fa-search"></i>
              </button>
            </div>
          </div>

          {/* User Menu */}
          <div className="dropdown">
            <button 
              className="btn btn-link text-dark d-flex align-items-center p-0"
              data-bs-toggle="dropdown"
            >
              <div className="bg-primary rounded-circle p-2 me-2">
                <i className="fas fa-user text-white"></i>
              </div>
              <div className="text-start me-2 d-none d-md-block">
                <div className="fw-semibold small">Administrator</div>
                <div className="text-muted" style={{fontSize: '12px'}}>Online</div>
              </div>
              <i className="fas fa-chevron-down small"></i>
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow">
              <li><h6 className="dropdown-header">Account</h6></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-user me-2"></i>Profile</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-cog me-2"></i>Settings</a></li>
              <li><a className="dropdown-item" href="#"><i className="fas fa-question-circle me-2"></i>Help</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button className="dropdown-item text-danger" onClick={onLogout}>
                  <i className="fas fa-sign-out-alt me-2"></i>Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;