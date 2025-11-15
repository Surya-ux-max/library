import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ isOpen, onClose }) => {
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);

  const isActive = (path) => location.pathname === path;
  
  const toggleSubmenu = (menu) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  const menuItems = [
    {
      id: 'dashboard',
      title: 'Dashboard',
      icon: 'fas fa-tachometer-alt',
      path: '/',
      color: '#3498db'
    },
    {
      id: 'books',
      title: 'Books',
      icon: 'fas fa-book',
      color: '#e74c3c',
      submenu: [
        { title: 'View All Books', path: '/books', icon: 'fas fa-list' },
        { title: 'Add New Book', path: '/add-book', icon: 'fas fa-plus' }
      ]
    },
    {
      id: 'members',
      title: 'Members',
      icon: 'fas fa-users',
      color: '#2ecc71',
      submenu: [
        { title: 'View All Members', path: '/members', icon: 'fas fa-list' },
        { title: 'Add New Member', path: '/add-member', icon: 'fas fa-user-plus' }
      ]
    },
    {
      id: 'transactions',
      title: 'Transactions',
      icon: 'fas fa-exchange-alt',
      path: '/transactions',
      color: '#f39c12'
    },
    {
      id: 'issue',
      title: 'Issue Book',
      icon: 'fas fa-hand-holding',
      path: '/issue-book',
      color: '#9b59b6'
    }
  ];

  return (
    <>
      {/* Overlay */}
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`}
        onClick={onClose}
      ></div>
      
      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? 'active' : ''}`}>
        {/* Header */}
        <div className="p-4 border-bottom border-secondary">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center">
              <div className="bg-primary rounded-circle p-2 me-3">
                <i className="fas fa-book-open text-white"></i>
              </div>
              <div>
                <h5 className="text-white mb-0 fw-bold">Library Pro</h5>
                <small className="text-light opacity-75">Management System</small>
              </div>
            </div>
            <button 
              className="btn btn-link text-white p-0"
              onClick={onClose}
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="p-3 border-bottom border-secondary">
          <div className="d-flex align-items-center">
            <div className="bg-success rounded-circle p-2 me-3">
              <i className="fas fa-user text-white"></i>
            </div>
            <div>
              <div className="text-white fw-semibold">Administrator</div>
              <small className="text-light opacity-75">admin@library.com</small>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-grow-1">
          <ul className="sidebar-menu">
            {menuItems.map((item) => (
              <li key={item.id}>
                {item.submenu ? (
                  <>
                    <a
                      href="#"
                      className={openSubmenu === item.id ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleSubmenu(item.id);
                      }}
                    >
                      <i className={item.icon} style={{color: item.color}}></i>
                      <span className="flex-grow-1">{item.title}</span>
                      <i className={`fas fa-chevron-${openSubmenu === item.id ? 'up' : 'down'} ms-auto`}></i>
                    </a>
                    <ul className={`submenu ${openSubmenu === item.id ? 'active' : ''}`}>
                      {item.submenu.map((subItem, index) => (
                        <li key={index}>
                          <Link
                            to={subItem.path}
                            className={isActive(subItem.path) ? 'active' : ''}
                            onClick={onClose}
                          >
                            <i className={subItem.icon}></i>
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={item.path}
                    className={isActive(item.path) ? 'active' : ''}
                    onClick={onClose}
                  >
                    <i className={item.icon} style={{color: item.color}}></i>
                    {item.title}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-3 border-top border-secondary">
          <div className="text-center">
            <small className="text-light opacity-75">
              <i className="fas fa-shield-alt me-1"></i>
              Secure & Reliable
            </small>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;