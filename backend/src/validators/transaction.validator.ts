import { body } from "express-validator";

const validator = [
	body("amount").isNumeric().trim().withMessage("Amount must be a number"),
	body("category").custom((value) => {
		if (!value || !value.id) {
			throw new Error("Category is required");
		}
		return true;
	}),
	body("description").isString().trim().notEmpty().withMessage("Description is required"),
	body("date").isISO8601().trim().withMessage("Date must be a valid date"),
	body("type").isString().trim().notEmpty().withMessage("Type is required"),
];

export default validator;
