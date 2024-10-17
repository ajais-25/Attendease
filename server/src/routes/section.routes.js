import {
    createSection,
    getSections,
    deleteSection,
    getTeacherSections,
} from "../controllers/section.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/").post(verifyAdmin, createSection).get(getSections);
router.route("/:id").delete(verifyAdmin, deleteSection);
router.route("/teacher-sections").get(verifyJWT, getTeacherSections);

export default router;
