import { Router } from "express";
import authController from "@controllers/auth.controller";
import userValidator from "@validators/user.validator";
import authMiddleware from "@middlewares/auth.middleware";
import { requiresAuth } from "express-openid-connect";

const router = Router();

router.route("/signup").post(userValidator, authController.register);
router.route("/login/:provider").get(authController.login);
router.route("/logout").post(authMiddleware, requiresAuth(), authController.logout);
router.route("/me").get(authMiddleware, authController.checkAuth);
router.route("/callback").get(requiresAuth(), authController.auth0Callback);
export default router;
