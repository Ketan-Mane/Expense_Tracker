import { Router } from "express";
import authController from "@controllers/auth.controller";
import userValidator from "@validators/user.validator";
import authMiddleware from "@middlewares/auth.middleware";
import { validate } from "@middlewares/validate.middleware";

const router = Router();

router.route("/signup").post(userValidator, validate, authController.register);
router.route("/login/:provider").get(authController.login);
router.route("/logout").get(authMiddleware, authController.logout);
router.route("/me").get(authMiddleware, authController.checkAuth);
export default router;
