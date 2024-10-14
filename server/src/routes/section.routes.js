import {
    createSection,
    getSections,
    deleteSection,
} from "../controllers/section.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyAdmin);

router.route("/").post(createSection).get(getSections);
router.route("/:id").delete(deleteSection);

export default router;
