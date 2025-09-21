import { body } from "express-validator";

const validator = [
	body("name").isString().withMessage("Name must be a string"),
	body("email").isEmail().withMessage("Email must be a valid email"),
	body("password")
		.exists({ checkFalsy: true })
		.withMessage("Password is required")
		.isLength({ min: 8 })
		.withMessage("Password must be at least 8 characters")
		.matches(/[A-Z]/)
		.withMessage("Password must contain at least one uppercase letter")
		.matches(/[a-z]/)
		.withMessage("Password must contain at least one lowercase letter")
		.matches(/[0-9]/)
		.withMessage("Password must contain at least one number")
		.matches(/[!@#$%^&*(),.?":{}|<>]/)
		.withMessage("Password must contain at least one special character"),
];

export default validator;
