import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Attendance } from "../models/attendance.model.js";
import { isStudent, isTeacher } from "../utils/checkRole.js";
import mongoose from "mongoose";

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

const getTeacherAllAttendanceComplete = asyncHandler(async (req, res) => {
    if (!isTeacher(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const attendance = await Attendance.find({
        teacher: req.user._id,
        isCompleted: true,
    })
        .sort({ createdAt: -1 })
        .populate("section")
        .populate("subject")
        .populate("studentsPresent");

    return res
        .status(200)
        .json(
            new ApiResponse(200, attendance, "Attendance fetched successfully")
        );
});

const getTeacherAllAttendanceIncomplete = asyncHandler(async (req, res) => {
    if (!isTeacher(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const attendance = await Attendance.find({
        teacher: req.user._id,
        isCompleted: false,
    })
        .sort({ createdAt: -1 })
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
const getStudentAllAttendanceIncomplete = asyncHandler(async (req, res) => {
    if (!isStudent(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const attendance = await Attendance.find({
        section: req.user.section,
        isCompleted: false,
    })
        .sort({ createdAt: -1 })
        .populate("section")
        .populate("subject")
        .populate("teacher");

    return res
        .status(200)
        .json(
            new ApiResponse(200, attendance, "Attendance fetched successfully")
        );
});

const markStudentPresent = asyncHandler(async (req, res) => {
    if (!isStudent(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { attendanceId } = req.params;

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
    }

    if (attendance.isCompleted) {
        return res
            .status(400)
            .json({ message: "Attendance is already completed" });
    }

    if (
        attendance.studentsPresent.includes(
            new mongoose.Types.ObjectId(req.user._id)
        )
    ) {
        return res
            .status(400)
            .json({ message: "You are already marked present" });
    }

    attendance.studentsPresent.push(req.user._id);
    await attendance.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, "", "Attendance marked successfully"));
});

const getEachSubjectAttendanceAnalytics = asyncHandler(async (req, res) => {
    if (!isStudent(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const attendanceAnalytics = await Attendance.aggregate([
        {
            $match: {
                section: new mongoose.Types.ObjectId(req.user.section),
            },
        },
        {
            $group: {
                _id: "$subject",
                totalClasses: { $sum: 1 },
                totalPresent: {
                    $sum: {
                        $cond: [
                            {
                                $in: [
                                    new mongoose.Types.ObjectId(req.user._id),
                                    "$studentsPresent",
                                ],
                            },
                            1,
                            0,
                        ],
                    },
                },
            },
        },
    ]);

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                attendanceAnalytics,
                "Attendance analytics fetched successfully"
            )
        );
});

export {
    createAttendance,
    getTeacherAllAttendanceComplete,
    getTeacherAllAttendanceIncomplete,
    getAttendance,
    completeAttendance,
    getStudentAllAttendanceIncomplete,
    markStudentPresent,
    getEachSubjectAttendanceAnalytics,
};
