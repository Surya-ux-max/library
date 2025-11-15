import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { to: '/add-book', icon: 'fas fa-book', label: 'Add Book', color: '#3498db' },
    { to: '/add-member', icon: 'fas fa-user-plus', label: 'Add Member', color: '#2ecc71' },
    { to: '/issue-book', icon: 'fas fa-hand-holding', label: 'Issue Book', color: '#e74c3c' }
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 1000
    }}>
      {/* Action Buttons */}
      {isOpen && actions.map((action, index) => (
        <Link
          key={action.to}
          to={action.to}
          className="text-decoration-none"
          style={{
            position: 'absolute',
            bottom: `${(index + 1) * 70}px`,
            right: '0',
            animation: `slideUp 0.3s ease-out ${index * 0.1}s both`
          }}
        >
          <div
            className="btn rounded-circle shadow-lg d-flex align-items-center justify-content-center"
            style={{
              width: '50px',
              height: '50px',
              backgroundColor: action.color,
              color: 'white',
              border: 'none'
            }}
            title={action.label}
          >
            <i className={action.icon}></i>
          </div>
        </Link>
      ))}

      {/* Main FAB */}
      <button
        className="btn btn-primary rounded-circle shadow-lg d-flex align-items-center justify-content-center"
        style={{
          width: '60px',
          height: '60px',
          border: 'none',
          transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease'
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <i className="fas fa-plus fa-lg"></i>
      </button>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingActionButton;