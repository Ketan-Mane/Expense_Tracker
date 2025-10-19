import { body } from "express-validator";

const validator = [
	body("name").isString().trim().withMessage("Name must be a string"),
	body("color").isString().trim().withMessage("Color must be a string"),
];

export default validator;
