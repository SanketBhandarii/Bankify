import { BankAccount } from "../models/bankAccSchema.js";
import { jwtDecode } from "jwt-decode";

const checkForMissingFields = (fields) => {
  for (const field of fields) {
    if (!field) {
      return true;
    }
  }
  return false;
};

export const createBankAccount = async (req, res) => {
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } =
    req.body;
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ msg: "Authorization token is missing" });
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }

  if (
    checkForMissingFields([
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    ])
  ) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  try {
    const existingAccount = await BankAccount.findOne({ accountNumber });
    if (existingAccount) {
      return res.status(400).json({ msg: "Account number already exists" });
    }
    const newAccount = await BankAccount.create({
      user: decoded._id,
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    });

    res.status(201).json(newAccount);
  } catch (err) {
    res.status(500).json({ msg: "Error adding bank account" });
  }
};

export const getBankAccounts = async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ msg: "Authorization token is missing" });
  }

  let decoded;
  try {
    decoded = jwtDecode(token);
  } catch (err) {
    return res.status(401).json({ msg: "Invalid token" });
  }

  try {
    const accounts = await BankAccount.find({ user: decoded._id });
    res.json(accounts);
  } catch (err) {
    res.status(500).json({ msg: "Error retrieving bank accounts" });
  }
};

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await BankAccount.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ msg: "Error retrieving bank accounts" });
  }
};

export const updateBankAccount = async (req, res) => {
  const { id } = req.params;
  const { ifscCode, branchName, bankName, accountNumber, accountHolderName } =
    req.body;

  if (
    checkForMissingFields([
      ifscCode,
      branchName,
      bankName,
      accountNumber,
      accountHolderName,
    ])
  ) {
    return res.status(400).json({ msg: "Please fill in all fields" });
  }

  try {
    const updatedAccount = await BankAccount.findByIdAndUpdate(
      id,
      { ifscCode, branchName, bankName, accountNumber, accountHolderName },
      { new: true }
    );

    if (!updatedAccount) {
      return res.status(404).json({ msg: "Account not found" });
    }

    res.json(updatedAccount);
  } catch (err) {
    res.status(500).json({ msg: "Error updating bank account" });
  }
};

export const deleteBankAccount = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ msg: "Account ID is missing" });
  }

  try {
    const deletedAccount = await BankAccount.findByIdAndDelete(id);
    if (!deletedAccount) {
      return res.status(404).json({ msg: "Account not found" });
    }

    res.json({ msg: "Account deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting bank account" });
  }
};
