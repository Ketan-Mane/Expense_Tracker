import { Router } from "express";
import authController from "@controllers/auth.controller";
import userValidator from "@validators/user.validator";
import authMiddleware from "@middlewares/auth.middleware";

const router = Router();

router.route("/").post(userValidator, authController.register);
router.route("/login").post(userValidator, authController.login);
router.route("/logout").post(authMiddleware, authController.logout);
router.route("/me").get(authMiddleware, authController.checkAuth);
export default router;
