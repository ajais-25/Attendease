import {
    createSubject,
    deleteSubject,
    getSubjects,
    assignTeacher,
    getTeacherSubjects,
} from "../controllers/subject.controller.js";
import { verifyAdmin, verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/").post(verifyAdmin, createSubject).get(getSubjects);
router.route("/:id").delete(verifyAdmin, deleteSubject);
router.route("/assign").post(verifyAdmin, assignTeacher);
router.route("/teacher-subjects").get(verifyJWT, getTeacherSubjects);

export default router;
