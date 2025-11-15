import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ apiCall }) => {
  const [stats, setStats] = useState({
    total_books: 0,
    available_books: 0,
    issued_books: 0,
    active_members: 0
  });
  const [loading, setLoading] = useState(true);
  const [animatedStats, setAnimatedStats] = useState({
    total_books: 0,
    available_books: 0,
    issued_books: 0,
    active_members: 0
  });

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    if (!loading) {
      // Animate numbers
      Object.keys(stats).forEach(key => {
        let start = 0;
        const end = stats[key];
        const duration = 1000;
        const increment = end / (duration / 16);
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            start = end;
            clearInterval(timer);
          }
          setAnimatedStats(prev => ({ ...prev, [key]: Math.floor(start) }));
        }, 16);
      });
    }
  }, [stats, loading]);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/dashboard');
      setStats(data);
      console.log('✅ Dashboard data loaded:', data);
    } catch (error) {
      console.error('❌ Error fetching dashboard stats:', error);
      alert('Failed to load dashboard data. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{height: '60vh'}}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const statCards = [
    { key: 'total_books', title: 'Total Books', icon: 'fas fa-book', color: 'primary', gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
    { key: 'available_books', title: 'Available Books', icon: 'fas fa-check-circle', color: 'success', gradient: 'linear-gradient(135deg, #56ab2f 0%, #a8e6cf 100%)' },
    { key: 'issued_books', title: 'Issued Books', icon: 'fas fa-hand-holding', color: 'warning', gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
    { key: 'active_members', title: 'Active Members', icon: 'fas fa-users', color: 'info', gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }
  ];

  const quickActions = [
    { to: '/add-book', title: 'Add New Book', icon: 'fas fa-plus', color: 'primary' },
    { to: '/add-member', title: 'Add New Member', icon: 'fas fa-user-plus', color: 'success' },
    { to: '/issue-book', title: 'Issue Book', icon: 'fas fa-hand-holding', color: 'warning' },
    { to: '/books', title: 'Manage Books', icon: 'fas fa-cogs', color: 'info' },
    { to: '/members', title: 'Manage Members', icon: 'fas fa-users-cog', color: 'secondary' },
    { to: '/transactions', title: 'View Transactions', icon: 'fas fa-exchange-alt', color: 'dark' }
  ];

  return (
    <div className="slide-in-right">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1"><i className="fas fa-tachometer-alt me-2 text-primary"></i>Dashboard Overview</h2>
          <p className="text-muted mb-0">Welcome back! Here's what's happening in your library today.</p>
        </div>
        <button onClick={fetchStats} className="btn btn-outline-primary">
          <i className="fas fa-sync-alt me-2"></i> Refresh Data
        </button>
      </div>
      
      <div className="row g-4 mb-5">
        {statCards.map((card, index) => (
          <div key={card.key} className="col-lg-3 col-md-6 fade-in" style={{animationDelay: `${index * 0.15}s`}}>
            <div className="card border-0 h-100 pulse" style={{background: card.gradient, borderRadius: '15px'}}>
              <div className="card-body text-white p-4">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <h2 className="fw-bold mb-2 display-6">{animatedStats[card.key]}</h2>
                    <p className="mb-0 opacity-90 fw-semibold">{card.title}</p>
                  </div>
                  <div className="opacity-80">
                    <i className={`${card.icon} fa-3x`}></i>
                  </div>
                </div>
                <div className="mt-3">
                  <div className="progress" style={{height: '4px', background: 'rgba(255,255,255,0.3)'}}>
                    <div className="progress-bar bg-white" style={{width: '75%'}}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="row">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold"><i className="fas fa-bolt me-2 text-warning"></i>Quick Actions</h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {quickActions.map((action, index) => (
                  <div key={action.to} className="col-lg-4 col-md-6">
                    <Link to={action.to} className="text-decoration-none">
                      <div className={`card border-0 bg-${action.color} text-white h-100 hover-lift`}>
                        <div className="card-body text-center py-4">
                          <i className={`${action.icon} fa-2x mb-3`}></i>
                          <h6 className="mb-0 fw-bold">{action.title}</h6>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h6 className="mb-0 fw-bold"><i className="fas fa-chart-pie me-2 text-primary"></i>Library Overview</h6>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span>Books Utilization</span>
                <span className="fw-bold">{stats.total_books > 0 ? Math.round((stats.issued_books / stats.total_books) * 100) : 0}%</span>
              </div>
              <div className="progress mb-3" style={{height: '8px'}}>
                <div className="progress-bar bg-gradient" style={{width: `${stats.total_books > 0 ? (stats.issued_books / stats.total_books) * 100 : 0}%`}}></div>
              </div>
              <small className="text-muted">{stats.issued_books} out of {stats.total_books} books are currently issued</small>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0">
              <h6 className="mb-0 fw-bold"><i className="fas fa-clock me-2 text-success"></i>Recent Activity</h6>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-2">
                <div className="bg-success rounded-circle p-2 me-3">
                  <i className="fas fa-plus text-white"></i>
                </div>
                <div>
                  <div className="fw-bold">System Ready</div>
                  <small className="text-muted">All services are operational</small>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <div className="bg-info rounded-circle p-2 me-3">
                  <i className="fas fa-database text-white"></i>
                </div>
                <div>
                  <div className="fw-bold">Database Connected</div>
                  <small className="text-muted">MySQL connection established</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;