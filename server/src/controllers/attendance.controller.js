import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Attendance } from "../models/attendance.model.js";
import { isStudent, isTeacher } from "../utils/checkRole.js";

// for teacher
const createAttendance = asyncHandler(async (req, res) => {
    if (!isTeacher(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { section, subject, date, semester } = req.body;

    if (!section || !subject || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const attendance = await Attendance.create({
        section,
        subject,
        teacher: req.user._id,
        date,
    });

    if (!attendance) {
        return res.status(500).json({
            message: "Something went wrong while creating attendance",
        });
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, attendance, "Attendance created successfully")
        );
});

const getTeacherAttendance = asyncHandler(async (req, res) => {
    if (!isTeacher(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const attendance = await Attendance.find({ teacher: req.user._id })
        .populate("section")
        .populate("subject")
        .populate("studentsPresent");

    return res
        .status(200)
        .json(
            new ApiResponse(200, attendance, "Attendance fetched successfully")
        );
});

const getAttendance = asyncHandler(async (req, res) => {
    console.log("Here");
    if (!isTeacher(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { attendanceId } = req.params;

    const attendance = await Attendance.findById(attendanceId)
        .populate("section")
        .populate("subject")
        .populate("studentsPresent");

    if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(200, attendance, "Attendance fetched successfully")
        );
});

const completeAttendance = asyncHandler(async (req, res) => {
    if (!isTeacher(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { attendanceId } = req.params;

    const attendance = await Attendance.findOne({
        _id: attendanceId,
        teacher: req.user._id,
    });

    if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
    }

    attendance.isCompleted = true;
    await attendance.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                attendance,
                "Attendance completed successfully"
            )
        );
});

// for student
const getStudentAttendance = asyncHandler(async (req, res) => {
    if (!isStudent(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const attendance = await Attendance.find({
        section: req.user.section,
    })
        .populate("section")
        .populate("subject")
        .populate("teacher");

    return res
        .status(200)
        .json(
            new ApiResponse(200, attendance, "Attendance fetched successfully")
        );
});

export {
    createAttendance,
    getTeacherAttendance,
    getAttendance,
    completeAttendance,
    getStudentAttendance,
};
