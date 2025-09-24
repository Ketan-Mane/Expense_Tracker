import { Router } from "express";
import categoryController from "../controllers/category.controller";

const router = Router();

router.route("/").get(categoryController.getCategories).post(categoryController.createCategory);

router.route("/:id").put(categoryController.updateCategory).delete(categoryController.deleteCategory);

export default router;
