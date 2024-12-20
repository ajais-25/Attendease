import {
    createAttendance,
    getTeacherAllAttendanceComplete,
    getTeacherAllAttendanceIncomplete,
    getAttendance,
    completeAttendance,
    changeActiveStatus,
    getStudentAllAttendanceIncomplete,
    markStudentPresent,
    getEachSubjectAttendanceAnalytics,
    getIndividualAttendanceAnalytics,
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
router.route("/t/:attendanceId/active").put(changeActiveStatus);

// for student
router.route("/s/student").get(getStudentAllAttendanceIncomplete);
router.route("/s/:attendanceId/mark").put(markStudentPresent);
router.route("/s/analytics").get(getEachSubjectAttendanceAnalytics);
router.route("/s/analytics/:subjectId").get(getIndividualAttendanceAnalytics);

export default router;
