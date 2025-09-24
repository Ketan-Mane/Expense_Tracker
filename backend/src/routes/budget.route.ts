import budgetController from "@controllers/budget.controller";
import { Router } from "express";

const router = Router();

router.get("/", budgetController.getBudgets).post("/", budgetController.createBudget);
router.put("/:id", budgetController.updateBudget).delete("/:id", budgetController.deleteBudget);

export default router;
