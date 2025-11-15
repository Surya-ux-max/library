import React, { useState, useEffect } from 'react';

const TransactionList = ({ apiCall }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const data = await apiCall('/transactions');
      setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const returnBook = async (transactionId) => {
    if (window.confirm('Are you sure you want to return this book?')) {
      try {
        await apiCall(`/transactions/return/${transactionId}`, {
          method: 'PUT'
        });
        fetchTransactions();
        alert('Book returned successfully!');
      } catch (error) {
        alert('Error returning book: ' + error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not returned';
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="page-transition">
      <div className="text-center mb-4">
        <h1 className="brand-title">Survex</h1>
        <p className="brand-subtitle mb-4">Library Management System</p>
      </div>
      
      <h2 className="mb-4 text-center"><i className="fas fa-exchange-alt me-2 text-info"></i>Transaction History</h2>
      
      <div className="modern-card">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Member</th>
              <th>Issue Date</th>
              <th>Return Date</th>
              <th>Fine (₹)</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(transaction => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.book_title}</td>
                <td>{transaction.member_name}</td>
                <td>{formatDate(transaction.issue_date)}</td>
                <td>{formatDate(transaction.return_date)}</td>
                <td>{transaction.fine.toFixed(2)}</td>
                <td>
                  <span className={`badge ${transaction.return_date ? 'bg-success' : 'bg-warning'}`}>
                    {transaction.return_date ? 'Returned' : 'Issued'}
                  </span>
                </td>
                <td>
                  {!transaction.return_date && (
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => returnBook(transaction.id)}
                    >
                      Return Book
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
          </table>
        </div>
        
        {transactions.length === 0 && (
          <div className="text-center py-5">
            <i className="fas fa-exchange-alt fa-3x text-muted mb-3"></i>
            <h5 className="text-muted">No transactions found</h5>
            <p className="text-muted">Start issuing books to see transaction history</p>
          </div>
        )}
      </div>
      
      <div className="mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="modern-card">
              <div className="card-header bg-white border-0 py-3">
                <h5 className="mb-0 fw-bold text-center">
                  <i className="fas fa-chart-bar me-2 text-primary"></i>
                  Transaction Summary
                </h5>
              </div>
              <div className="card-body p-4">
                <div className="row text-center">
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3">
                      <h4 className="text-primary fw-bold">{transactions.length}</h4>
                      <small className="text-muted">Total Transactions</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3">
                      <h4 className="text-warning fw-bold">{transactions.filter(t => !t.return_date).length}</h4>
                      <small className="text-muted">Active Issues</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3">
                      <h4 className="text-success fw-bold">{transactions.filter(t => t.return_date).length}</h4>
                      <small className="text-muted">Completed Returns</small>
                    </div>
                  </div>
                  <div className="col-6 col-md-3 mb-3">
                    <div className="p-3">
                      <h4 className="text-danger fw-bold">₹{transactions.reduce((sum, t) => sum + t.fine, 0).toFixed(2)}</h4>
                      <small className="text-muted">Total Fines</small>
                    </div>
                  </div>
                </div>
              </div>
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

export default TransactionList;