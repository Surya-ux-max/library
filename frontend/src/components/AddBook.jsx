import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBook = ({ apiCall }) => {
  const [book, setBook] = useState({
    title: '',
    author: '',
    category: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await apiCall('/books', {
        method: 'POST',
        body: JSON.stringify(book),
      });
      
      alert('Book added successfully!');
      navigate('/books');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <h2 className="mb-4">Add New Book</h2>
      
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={book.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Author *</label>
              <input
                type="text"
                className="form-control"
                name="author"
                value={book.author}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="mb-3">
              <label className="form-label">Category *</label>
              <select
                className="form-control"
                name="category"
                value={book.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Science">Science</option>
                <option value="Technology">Technology</option>
                <option value="History">History</option>
                <option value="Biography">Biography</option>
                <option value="Romance">Romance</option>
                <option value="Mystery">Mystery</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Educational">Educational</option>
              </select>
            </div>
            
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Book'}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/books')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddBook;