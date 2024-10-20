import {
    createAttendance,
    getTeacherAllAttendanceComplete,
    getTeacherAllAttendanceIncomplete,
    getAttendance,
    completeAttendance,
    getStudentAllAttendanceIncomplete,
    markStudentPresent,
    getEachSubjectAttendanceAnalytics,
} from "../controllers/attendance.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

// for teacher
router.route("/create").post(createAttendance);
router.route("/t/complete").get(getTeacherAllAttendanceComplete);
router.route("/t/incomplete").get(getTeacherAllAttendanceIncomplete);
router.route("/t/:attendanceId").get(getAttendance);
router.route("/t/:attendanceId/complete").put(completeAttendance);

// for student
router.route("/s/student").get(getStudentAllAttendanceIncomplete);
router.route("/s/:attendanceId/mark").put(markStudentPresent);
router.route("/s/analytics").get(getEachSubjectAttendanceAnalytics);

export default router;
