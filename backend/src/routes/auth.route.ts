import { Router } from "express";
import authController from "@controllers/auth.controller";
import userValidator from "@validators/user.validator";
import authMiddleware from "@middlewares/auth.middleware";

const router = Router();

router.route("/signup").post(userValidator, authController.register);
router.route("/login/:provider").get(authController.login);
router.route("/logout").post(authMiddleware, authController.logout);
router.route("/me").get(authMiddleware, authController.checkAuth);
router.route("/callback").get(authController.auth0Callback);
export default router;
