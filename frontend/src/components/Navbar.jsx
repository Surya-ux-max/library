import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark gradient-bg shadow-sm">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          <i className="fas fa-book-open me-2"></i>
          Library Pro
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/') ? 'active fw-bold' : ''}`} to="/">
                <i className="fas fa-tachometer-alt me-1"></i> Dashboard
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-book me-1"></i> Books
              </a>
              <ul className="dropdown-menu shadow">
                <li><Link className="dropdown-item" to="/books"><i className="fas fa-list me-2"></i>View Books</Link></li>
                <li><Link className="dropdown-item" to="/add-book"><i className="fas fa-plus me-2"></i>Add Book</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                <i className="fas fa-users me-1"></i> Members
              </a>
              <ul className="dropdown-menu shadow">
                <li><Link className="dropdown-item" to="/members"><i className="fas fa-list me-2"></i>View Members</Link></li>
                <li><Link className="dropdown-item" to="/add-member"><i className="fas fa-user-plus me-2"></i>Add Member</Link></li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/issue-book') ? 'active fw-bold' : ''}`} to="/issue-book">
                <i className="fas fa-hand-holding me-1"></i> Issue Book
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${isActive('/transactions') ? 'active fw-bold' : ''}`} to="/transactions">
                <i className="fas fa-exchange-alt me-1"></i> Transactions
              </Link>
            </li>
          </ul>
          <button className="btn btn-outline-light" onClick={onLogout}>
            <i className="fas fa-sign-out-alt me-1"></i> Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;