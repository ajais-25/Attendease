import {
    createSubject,
    deleteSubject,
    getSubjects,
    assignTeacher,
} from "../controllers/subject.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyAdmin);

router.route("/").post(createSubject).get(getSubjects);
router.route("/:id").delete(deleteSubject);
router.route("/assign").post(assignTeacher);

export default router;
