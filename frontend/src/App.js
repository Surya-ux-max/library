import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import TopNavbar from './components/TopNavbar';
import FloatingActionButton from './components/FloatingActionButton';
import ConnectionStatus from './components/ConnectionStatus';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import BookList from './components/BookList';
import AddBook from './components/AddBook';
import MemberList from './components/MemberList';
import AddMember from './components/AddMember';
import IssueBook from './components/IssueBook';
import TransactionList from './components/TransactionList';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const apiCall = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Network error' }));
        throw new Error(errorData.error || 'Request failed');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === 'TypeError' && error.message.includes('fetch')) {
        throw new Error('Backend server not reachable');
      }
      
      throw error;
    }
  };

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [window.location.pathname]);

  if (!token) {
    return <Login onLogin={login} apiCall={apiCall} />;
  }

  return (
    <Router>
      <div className="App d-flex">
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
        
        {/* Main Content */}
        <div className={`main-content flex-grow-1 ${sidebarOpen ? 'shifted' : ''}`}>
          {/* Top Navigation */}
          <TopNavbar onMenuToggle={toggleSidebar} onLogout={logout} />
          
          {/* Page Content */}
          <div className="container-fluid p-4">
            {/* Connection Status */}
            <ConnectionStatus apiCall={apiCall} />
            
            <Routes>
              <Route path="/" element={<Dashboard apiCall={apiCall} />} />
              <Route path="/books" element={<BookList apiCall={apiCall} />} />
              <Route path="/add-book" element={<AddBook apiCall={apiCall} />} />
              <Route path="/members" element={<MemberList apiCall={apiCall} />} />
              <Route path="/add-member" element={<AddMember apiCall={apiCall} />} />
              <Route path="/issue-book" element={<IssueBook apiCall={apiCall} />} />
              <Route path="/transactions" element={<TransactionList apiCall={apiCall} />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
          
          {/* Floating Action Button */}
          <FloatingActionButton />
        </div>
      </div>
    </Router>
  );
}

export default App;