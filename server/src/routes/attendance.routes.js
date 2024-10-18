import {
    createAttendance,
    getTeacherAttendance,
    getAttendance,
    completeAttendance,
    getStudentAttendance,
} from "../controllers/attendance.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

// for teacher
router.post("/create", createAttendance);
router.get("/teacher", getTeacherAttendance);
router.get("/:attendanceId", getAttendance);
router.put("/:attendanceId/complete", completeAttendance);

// for student
router.get("/a/student", getStudentAttendance);

export default router;
