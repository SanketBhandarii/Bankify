import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllAccounts.css";

const AllAccounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [filteredAccounts, setFilteredAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/acct/admin/accounts",
          {
            withCredentials: true,
          }
        );
        setAccounts(response.data);
        setFilteredAccounts(response.data);
      } catch (err) {
        setError("Error fetching bank accounts");
      } finally {
        setLoading(false);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const results = accounts.filter(
      (account) =>
        account.accountHolderName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        account.bankName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAccounts(results);
  }, [searchTerm, accounts]);

  if (loading) {
    return (
      <div className="loading-overlay">
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container">
      <h1 className="title">Bank Accounts</h1>
      <input
        type="text"
        placeholder="Search by name or bank..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-input"
      />
      <table className="accounts-table">
        <thead>
          <tr>
            <th>IFSC Code</th>
            <th>Branch Name</th>
            <th>Bank Name</th>
            <th>Account Number</th>
            <th>Account Holder</th>
          </tr>
        </thead>
        <tbody>
          {filteredAccounts.length > 0 ? (
            filteredAccounts.map((account) => (
              <tr key={account._id}>
                <td>{account.ifscCode}</td>
                <td>{account.branchName}</td>
                <td>{account.bankName}</td>
                <td>{account.accountNumber}</td>
                <td>{account.accountHolderName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No accounts found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllAccounts;
