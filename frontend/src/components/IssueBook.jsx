import React, { useState, useEffect } from 'react';

const IssueBook = ({ apiCall }) => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [booksData, membersData] = await Promise.all([
        apiCall('/books'),
        apiCall('/members')
      ]);
      
      setBooks(booksData.filter(book => book.available));
      setMembers(membersData.filter(member => member.active));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiCall('/transactions/issue', {
        method: 'POST',
        body: JSON.stringify({
          book_id: parseInt(selectedBook),
          member_id: parseInt(selectedMember)
        }),
      });
      
      alert('Book issued successfully!');
      setSelectedBook('');
      setSelectedMember('');
      fetchData(); // Refresh available books
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-transition">
      <div className="text-center mb-4">
        <h1 className="brand-title">Survex</h1>
        <p className="brand-subtitle mb-4">Library Management System</p>
      </div>
      
      <h2 className="mb-4 text-center"><i className="fas fa-hand-holding me-2 text-warning"></i>Issue Book</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="modern-card mx-auto" style={{maxWidth: '700px'}}>
        <div className="card-body p-5">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Select Book *</label>
              <select
                className="form-control"
                value={selectedBook}
                onChange={(e) => setSelectedBook(e.target.value)}
                required
              >
                <option value="">Choose a book...</option>
                {books.map(book => (
                  <option key={book.id} value={book.id}>
                    {book.title} - {book.author} ({book.category})
                  </option>
                ))}
              </select>
              {books.length === 0 && (
                <small className="text-muted">No available books to issue</small>
              )}
            </div>
            
            <div className="mb-3">
              <label className="form-label">Select Member *</label>
              <select
                className="form-control"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                required
              >
                <option value="">Choose a member...</option>
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} - {member.email}
                  </option>
                ))}
              </select>
              {members.length === 0 && (
                <small className="text-muted">No active members available</small>
              )}
            </div>
            
            <button 
              type="submit" 
              className="btn btn-primary" 
              disabled={loading || books.length === 0 || members.length === 0}
            >
              {loading ? 'Issuing...' : 'Issue Book'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="mt-5">
        <div className="modern-card">
          <div className="card-header bg-white border-0 py-3">
            <h5 className="mb-0 fw-bold text-center">
              <i className="fas fa-books me-2 text-info"></i>
              Available Books ({books.length})
            </h5>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-hover mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="fw-bold">Title</th>
                    <th className="fw-bold">Author</th>
                    <th className="fw-bold">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {books.slice(0, 10).map(book => (
                    <tr key={book.id}>
                      <td>{book.title}</td>
                      <td>{book.author}</td>
                      <td><span className="badge bg-secondary">{book.category}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {books.length > 10 && (
                <div className="text-center mt-3">
                  <small className="text-muted">Showing first 10 books...</small>
                </div>
              )}
            </div>
          </div>
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

export default IssueBook;