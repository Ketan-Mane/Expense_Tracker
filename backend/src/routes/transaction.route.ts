import transactionController from "@controllers/transaction.controller";
import { Router } from "express";

const router = Router();

router.route("/").get(transactionController.getTransactions);
router.route("/").post(transactionController.createTransaction);
router.route("/:id").put(transactionController.updateTransaction);
router.route("/:id").delete(transactionController.deleteTransaction);

export default router;
