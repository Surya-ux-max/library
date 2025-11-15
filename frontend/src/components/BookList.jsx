import React, { useState, useEffect } from 'react';

const BookList = ({ apiCall }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      setLoading(true);
      const data = await apiCall('/books');
      setBooks(data);
      console.log(`✅ Loaded ${data.length} books from database`);
    } catch (error) {
      console.error('❌ Error fetching books:', error);
      alert('Failed to load books. Please check backend connection.');
    } finally {
      setLoading(false);
    }
  };

  const deleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await apiCall(`/books/${id}`, { method: 'DELETE' });
        fetchBooks();
      } catch (error) {
        alert('Error deleting book: ' + error.message);
      }
    }
  };

  const updateBook = async (book) => {
    try {
      await apiCall(`/books/${book.id}`, {
        method: 'PUT',
        body: JSON.stringify(book),
      });
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      alert('Error updating book: ' + error.message);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <div className="d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
      <div className="text-center">
        <div className="spinner-border text-primary mb-3" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="text-muted">Loading books...</p>
      </div>
    </div>
  );

  return (
    <div className="fade-in">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-dark"><i className="fas fa-book me-2"></i>Books Management</h2>
        <a href="/add-book" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Add New Book
        </a>
      </div>

      <div className="card border-0 shadow-sm mb-4">
        <div className="card-body">
          <div className="input-group">
            <span className="input-group-text border-0 bg-light">
              <i className="fas fa-search text-muted"></i>
            </span>
            <input
              type="text"
              className="form-control border-0 bg-light"
              placeholder="Search books by title, author, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="bg-light">
              <tr>
                <th className="fw-bold text-dark"><i className="fas fa-hashtag me-1"></i>ID</th>
                <th className="fw-bold text-dark"><i className="fas fa-book me-1"></i>Title</th>
                <th className="fw-bold text-dark"><i className="fas fa-user me-1"></i>Author</th>
                <th className="fw-bold text-dark"><i className="fas fa-tag me-1"></i>Category</th>
                <th className="fw-bold text-dark"><i className="fas fa-circle me-1"></i>Status</th>
                <th className="fw-bold text-dark"><i className="fas fa-cogs me-1"></i>Actions</th>
              </tr>
            </thead>
          <tbody>
            {filteredBooks.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>
                  {editingBook?.id === book.id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingBook.title}
                      onChange={(e) => setEditingBook({...editingBook, title: e.target.value})}
                    />
                  ) : (
                    book.title
                  )}
                </td>
                <td>
                  {editingBook?.id === book.id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingBook.author}
                      onChange={(e) => setEditingBook({...editingBook, author: e.target.value})}
                    />
                  ) : (
                    book.author
                  )}
                </td>
                <td>
                  {editingBook?.id === book.id ? (
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      value={editingBook.category}
                      onChange={(e) => setEditingBook({...editingBook, category: e.target.value})}
                    />
                  ) : (
                    book.category
                  )}
                </td>
                <td>
                  <span className={`badge ${book.available ? 'bg-success' : 'bg-danger'} px-3 py-2`}>
                    <i className={`fas ${book.available ? 'fa-check' : 'fa-times'} me-1`}></i>
                    {book.available ? 'Available' : 'Issued'}
                  </span>
                </td>
                <td>
                  {editingBook?.id === book.id ? (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateBook(editingBook)}
                      >
                        <i className="fas fa-save me-1"></i>Save
                      </button>
                      <button
                        className="btn btn-secondary btn-sm"
                        onClick={() => setEditingBook(null)}
                      >
                        <i className="fas fa-times me-1"></i>Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-outline-warning btn-sm me-2"
                        onClick={() => setEditingBook(book)}
                        title="Edit Book"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => deleteBook(book.id)}
                        title="Delete Book"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        
        {filteredBooks.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-search fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">No books found</h5>
            <p className="text-muted">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookList;