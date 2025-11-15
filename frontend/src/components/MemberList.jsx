import React, { useState, useEffect } from 'react';

const MemberList = ({ apiCall }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const data = await apiCall('/members');
      setMembers(data);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteMember = async (id) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      try {
        await apiCall(`/members/${id}`, { method: 'DELETE' });
        fetchMembers();
      } catch (error) {
        alert('Error deleting member: ' + error.message);
      }
    }
  };

  const updateMember = async (member) => {
    try {
      await apiCall(`/members/${member.id}`, {
        method: 'PUT',
        body: JSON.stringify(member),
      });
      setEditingMember(null);
      fetchMembers();
    } catch (error) {
      alert('Error updating member: ' + error.message);
    }
  };

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    member.phone.includes(searchTerm)
  );

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="page-transition">
      <div className="text-center mb-4">
        <h1 className="brand-title">Survex</h1>
        <p className="brand-subtitle mb-4">Library Management System</p>
      </div>
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark"><i className="fas fa-users me-2"></i>Members Management</h2>
        <a href="/add-member" className="btn btn-primary">
          <i className="fas fa-user-plus me-2"></i>Add New Member
        </a>
      </div>

      <div className="modern-card mb-4">
        <div className="card-body p-4">
          <div className="input-group">
            <span className="input-group-text border-0 bg-light">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 bg-light"
              placeholder="Search members by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{borderRadius: '0 15px 15px 0'}}
            />
          </div>
        </div>
      </div>

      <div className="modern-card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map(member => (
              <tr key={member.id}>
                <td>{member.id}</td>
                <td>
                  {editingMember?.id === member.id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingMember.name}
                      onChange={(e) => setEditingMember({...editingMember, name: e.target.value})}
                    />
                  ) : (
                    member.name
                  )}
                </td>
                <td>
                  {editingMember?.id === member.id ? (
                    <input
                      type="email"
                      className="form-control form-control-sm"
                      value={editingMember.email}
                      onChange={(e) => setEditingMember({...editingMember, email: e.target.value})}
                    />
                  ) : (
                    member.email
                  )}
                </td>
                <td>
                  {editingMember?.id === member.id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingMember.phone}
                      onChange={(e) => setEditingMember({...editingMember, phone: e.target.value})}
                    />
                  ) : (
                    member.phone
                  )}
                </td>
                <td>
                  {editingMember?.id === member.id ? (
                    <select
                      className="form-control form-control-sm"
                      value={editingMember.active}
                      onChange={(e) => setEditingMember({...editingMember, active: e.target.value === 'true'})}
                    >
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  ) : (
                    <span className={`badge ${member.active ? 'bg-success' : 'bg-secondary'}`}>
                      {member.active ? 'Active' : 'Inactive'}
                    </span>
                  )}
                </td>
                <td>
                  {editingMember?.id === member.id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateMember(editingMember)}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingMember(null)}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => setEditingMember(member)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteMember(member.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        
        {filteredMembers.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-users fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">No members found</h5>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
      
      <footer className="survex-footer">
        <div className="container">
          <p className="mb-0">Survex – Group of Tech managed by Suryaprakash</p>
        </div>
      </footer>
    </div>
  );
};

export default MemberList;