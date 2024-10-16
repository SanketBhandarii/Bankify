import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BankAccountList.css"; // Import CSS for styling
import { NavLink } from "react-router-dom";

const BankAccountsList = () => {
  const [bankAccounts, setBankAccounts] = useState([]);
  const [editingAccountId, setEditingAccountId] = useState(null); // Track which account is being edited
  const [editingDetails, setEditingDetails] = useState({
    ifscCode: "",
    branchName: "",
    bankName: "",
    accountNumber: "",
    accountHolderName: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        const response = await axios.get(" https://bankify-ztoj.onrender.com/acct/bank", {
          withCredentials: true,
        });
        setBankAccounts(response.data);
      } catch (err) {
        console.error("Error fetching bank accounts", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBankAccounts();
  }, []);

  const handleEditClick = (account) => {
    setEditingAccountId(account._id);
    setEditingDetails(account);
  };

  const handleInputChange = (e) => {
    setEditingDetails({
      ...editingDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdateSubmit = async (accountId) => {

    try {
      const response = await axios.put(
        ` https://bankify-ztoj.onrender.com/acct/bank/${accountId}`,
        editingDetails,
        {
          withCredentials: true,
        }
      );

      // Update the bank account list with the new data
      setBankAccounts((prevAccounts) =>
        prevAccounts.map((acc) =>
          acc._id === accountId ? { ...acc, ...editingDetails } : acc
        )
      );
      setEditingAccountId(null); // Exit edit mode
      alert("Account updated successfully");
    } catch (err) {
      console.error("Error updating account", err);
      alert("Failed to update account");
    }
  };

  // Handle delete account
  const handleDeleteClick = async (accountId) => {
    if (window.confirm("Are you sure you want to delete this account?")) {
      try {
        await axios.delete(` https://bankify-ztoj.onrender.com/acct/bank/${accountId}`, {
          withCredentials: true,
        });

        // Remove the account from the state
        setBankAccounts((prevAccounts) =>
          prevAccounts.filter((acc) => acc._id !== accountId)
        );
        alert("Account deleted successfully");
      } catch (err) {
        console.error("Error deleting account", err);
        alert("Failed to delete account");
      }
    }
  };

  return (
    <div className="container">
      <h2>Your Bank Accounts</h2>
      <NavLink
        to={"/createAccount"}
        style={{ textDecoration: "none", color: "white" }}
      >
        <button className="create-btn">Create New Bank Account</button>
      </NavLink>

      {loading ? (
        <p>Loading accounts...</p>
      ) : (
        <div className="accounts-list">
          {bankAccounts.length > 0 ? (
            bankAccounts.map((account) => (
              <div className="account-card" key={account._id}>
                {editingAccountId === account._id ? (
                  // Show editable fields when in edit mode
                  <div>
                    <input
                      type="text"
                      name="bankName"
                      value={editingDetails.bankName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="branchName"
                      value={editingDetails.branchName}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="ifscCode"
                      value={editingDetails.ifscCode}
                      onChange={handleInputChange}
                    />
                    <input
                      type="number"
                      name="accountNumber"
                      value={editingDetails.accountNumber}
                      onChange={handleInputChange}
                    />
                    <input
                      type="text"
                      name="accountHolderName"
                      value={editingDetails.accountHolderName}
                      onChange={handleInputChange}
                    />
                    <div className="account-actions">
                      <button
                        className="save-btn"
                        onClick={() => handleUpdateSubmit(account._id)}
                      >
                        Save
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setEditingAccountId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  // Show account details in read-only mode
                  <div>
                    <h3>{account.bankName}</h3>
                    <p>Branch: {account.branchName}</p>
                    <p>IFSC Code: {account.ifscCode}</p>
                    <p>Account Number: {account.accountNumber}</p>
                    <p>Account Holder: {account.accountHolderName}</p>
                    <div className="account-actions">
                      <button
                        className="edit-btn"
                        onClick={() => handleEditClick(account)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteClick(account._id)} // Call delete handler
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No bank accounts found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BankAccountsList;
