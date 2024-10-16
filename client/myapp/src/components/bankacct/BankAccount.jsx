// src/components/AddBankAccount.js
import React, { useState } from "react";
import axios from "axios";
import "./BankAccount.css";

const AddBankAccount = () => {
  const [branchName, setBranchName] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [ifscCode, setIfscCode] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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

    if (accountNumber < 0) {
      setError("Account number cannot be negative");
      return;
    }

    try {
      await axios.post(
        "https://bankify-ztoj.onrender.com/acct/bank",
        {
          branchName,
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
      setBranchName("");
      setAccountHolderName("");
      setAccountNumber("");
      setBankName("");
      setIfscCode("");
    } catch (err) {
      console.error(err.response?.data);
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
              placeholder="Branch Name"
              value={branchName}
              onChange={(e) => setBranchName(e.target.value)}
              required
            />
            <input
              type="text"
              name="accountHolderName"
              placeholder="Account Holder Name"
              value={accountHolderName}
              onChange={(e) => setAccountHolderName(e.target.value)}
              required
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
