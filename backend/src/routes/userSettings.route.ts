import { Router } from "express";
import userSettingsController from "@controllers/userSettings.controller";
import authMiddleware from "@middlewares/auth.middleware";
import { validator } from "@validators/userSettings.validator";
import { validate } from "@middlewares/validate.middleware";

const router = Router();

router.get("/", authMiddleware, validator, validate, userSettingsController.getSettings);
router.put("/", authMiddleware, validator, validate, userSettingsController.updateSettings);
// router.post("/initialize", authMiddleware, userSettingsController.initializeSettings);

export default router;
