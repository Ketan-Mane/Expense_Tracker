import transactionController from "@controllers/transaction.controller";
import { Router } from "express";
import validator from "@validators/transaction.validator";
import { validate } from "@middlewares/validate.middleware";

const router = Router();

router.route("/").get(transactionController.getTransactions);
router.route("/").post(validator, validate, transactionController.createTransaction);
router.route("/:id").put(validator, validate, transactionController.updateTransaction);
router.route("/:id").delete(transactionController.deleteTransaction);
router.route("/analytics/category").get(transactionController.getCategoryAnalytics);
router.route("/analytics/monthly").get(transactionController.getMonthlyAnalytics);

export default router;
