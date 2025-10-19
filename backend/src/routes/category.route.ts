import { Router } from "express";
import categoryController from "../controllers/category.controller";
import categoryValidator from "../validators/category.validator";
import { validate } from "../middlewares/validate.middleware";

const router = Router();

router
	.route("/")
	.get(categoryController.getCategories)
	.post(categoryValidator, validate, categoryController.createCategory);

router
	.route("/:id")
	.put(categoryValidator, validate, categoryController.updateCategory)
	.delete(categoryController.deleteCategory);

export default router;
