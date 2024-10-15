import {
    createSection,
    getSections,
    deleteSection,
    getTeacherSections,
} from "../controllers/section.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyAdmin);

router.route("/").post(createSection).get(getSections);
router.route("/:id").delete(deleteSection);
router.route("/teacher").get(getTeacherSections);

export default router;
