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
    <div>
      <h2 className="mb-4">Transactions</h2>
      
      <div className="table-responsive">
        <table className="table table-striped">
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
        <div className="text-center text-muted">
          No transactions found.
        </div>
      )}
      
      <div className="mt-4">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h6>Transaction Summary</h6>
              </div>
              <div className="card-body">
                <p>Total Transactions: {transactions.length}</p>
                <p>Active Issues: {transactions.filter(t => !t.return_date).length}</p>
                <p>Completed Returns: {transactions.filter(t => t.return_date).length}</p>
                <p>Total Fines Collected: ₹{transactions.reduce((sum, t) => sum + t.fine, 0).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;