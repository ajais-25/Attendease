import {
    createAttendance,
    getAllAttendance,
    getAttendance,
    completeAttendance,
} from "../controllers/attendance.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyJWT);

router.post("/create", createAttendance);
router.get("/all", getAllAttendance);
router.get("/:id", getAttendance);
router.post("/:id/complete", completeAttendance);

export default router;
