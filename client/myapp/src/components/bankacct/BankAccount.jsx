// src/components/AddBankAccount.js
import React, { useState } from "react";
import axios from "axios"; // Import axios to handle API requests
import "./BankAccount.css";

const AddBankAccount = () => {
  const [branchName, setBranchName] = useState(""); // State for account name
  const [accountHolderName, setAccountHolderName] = useState(""); // State for account holder's name
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Check for empty fields
    if (
      !branchName ||
      !accountHolderName ||
      !accountNumber ||
      !bankName ||
      !ifscCode
    ) {
      setError("Please fill in all fields");
      return;
    }

    try {
      // Send the data to the backend API
      await axios.post(
        "http://localhost:8000/acct/bank",
        {
          branchName, // Correctly send branchName
          accountHolderName,
          accountNumber,
          bankName,
          ifscCode,
        },
        {
          withCredentials: true,
        }
      );

      setSuccess("Bank account details submitted successfully!");
      // Reset form fields
      setBranchName("");
      setAccountHolderName("");
      setAccountNumber("");
      setBankName("");
      setIfscCode("");
    } catch (err) {
      console.error(err.response?.data); // Log error response
      setError("Failed to submit bank account details. Please try again.");
    }
  };

  return (
    <div className="bank-account-container">
      <div className="bank-account-box">
        <h2 className="bank-account-title">Add Bank Account</h2>
        <form onSubmit={handleFormSubmit}>
          <div className="bank-account-inputs">
            <input
              type="text"
              name="accountName"
              placeholder="Branch Name" // Placeholder for the account name
              value={branchName} // Value of the account name input
              onChange={(e) => setBranchName(e.target.value)} // Update state on change
              required // Ensure this field is required
            />
            <input
              type="text"
              name="accountHolderName"
              placeholder="Account Holder Name" // Placeholder for the account holder's name
              value={accountHolderName} // Value of the account holder's name input
              onChange={(e) => setAccountHolderName(e.target.value)} // Update state on change
              required // Ensure this field is required
            />
            <input
              type="number"
              name="accountNumber"
              placeholder="Account Number"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
            />
            <input
              type="text"
              name="bankName"
              placeholder="Bank Name"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              required
            />
            <input
              type="text"
              name="ifscCode"
              placeholder="IFSC Code"
              value={ifscCode}
              onChange={(e) => setIfscCode(e.target.value)}
              required
            />
            <button type="submit" className="bank-account-button">
              Add Account
            </button>
          </div>
        </form>
        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default AddBankAccount;
