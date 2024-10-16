import express from "express";
import {
  createBankAccount,
  getBankAccounts,
  updateBankAccount,
  deleteBankAccount,
  getAllAccounts,
} from "../controllers/bankAcctController.js";

const router = express.Router();

router.post("/bank", createBankAccount);
router.get("/bank", getBankAccounts);
router.get("/admin/accounts", getAllAccounts);
router.put("/bank/:id", updateBankAccount);
router.delete("/bank/:id", deleteBankAccount);

const bankRouter = router;

export default bankRouter;
