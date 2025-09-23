import { Router } from "express";
import monthController from "@controllers/month.controller";

const router = Router();

router.route("/").get(monthController.getMonths).post(monthController.createMonth);
router.route("/:id").get(monthController.getMonth).put(monthController.updateMonth).delete(monthController.deleteMonth);
router.route("/:id/archive").post(monthController.archiveMonth);
router.route("/:id/unarchive").post(monthController.unarchiveMonth);

export default router;
