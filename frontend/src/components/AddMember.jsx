import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddMember = ({ apiCall }) => {
  const [member, setMember] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiCall('/members', {
        method: 'POST',
        body: JSON.stringify(member),
      });
      
      alert('Member added successfully!');
      navigate('/members');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setMember({
      ...member,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="page-transition">
      <div className="text-center mb-4">
        <h1 className="brand-title">Survex</h1>
        <p className="brand-subtitle mb-4">Library Management System</p>
      </div>
      
      <h2 className="mb-4 text-center"><i className="fas fa-user-plus me-2 text-success"></i>Add New Member</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="modern-card mx-auto" style={{maxWidth: '600px'}}>
        <div className="card-body p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name *</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={member.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Email *</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={member.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Phone *</label>
              <input
                type="tel"
                className="form-control"
                name="phone"
                value={member.phone}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Member'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/members')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <footer className="survex-footer">
        <div className="container">
          <p className="mb-0">Survex – Group of Tech managed by Suryaprakash</p>
        </div>
      </footer>
    </div>
  );
};

export default AddMember;