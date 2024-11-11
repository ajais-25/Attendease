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

    const { section, subject, date, time } = req.body;

    if (!section || !subject || !date || !time) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const attendance = await Attendance.create({
        section,
        subject,
        teacher: req.user._id,
        date,
        time,
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

    const attendance = await Attendance.aggregate([
        {
            $match: {
                teacher: new mongoose.Types.ObjectId(req.user._id),
                isCompleted: true,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "teacher",
                foreignField: "_id",
                as: "teacher",
            },
        },
        {
            $unwind: "$teacher",
        },
        {
            $lookup: {
                from: "subjects",
                localField: "subject",
                foreignField: "_id",
                as: "subject",
            },
        },
        {
            $unwind: "$subject",
        },
        {
            $lookup: {
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "section",
                pipeline: [
                    {
                        $lookup: {
                            from: "branches",
                            localField: "branch",
                            foreignField: "_id",
                            as: "branch",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            year: 1,
                            section: 1,
                            branch: {
                                $arrayElemAt: ["$branch", 0],
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$section",
        },
        {
            $project: {
                _id: 1,
                date: 1,
                time: 1,
                isCompleted: 1,
                isActive: 1,
                studentsPresent: 1,
                teacher: {
                    _id: 1,
                    name: 1,
                    email: 1,
                },
                subject: {
                    _id: 1,
                    name: 1,
                    code: 1,
                },
                section: {
                    _id: 1,
                    branch: {
                        _id: 1,
                        name: 1,
                    },
                    year: 1,
                    section: 1,
                },
            },
        },
    ]).sort({ date: 1, time: 1 });

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

    const attendance = await Attendance.aggregate([
        {
            $match: {
                teacher: new mongoose.Types.ObjectId(req.user._id),
                isCompleted: false,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "teacher",
                foreignField: "_id",
                as: "teacher",
            },
        },
        {
            $unwind: "$teacher",
        },
        {
            $lookup: {
                from: "subjects",
                localField: "subject",
                foreignField: "_id",
                as: "subject",
            },
        },
        {
            $unwind: "$subject",
        },
        {
            $lookup: {
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "section",
                pipeline: [
                    {
                        $lookup: {
                            from: "branches",
                            localField: "branch",
                            foreignField: "_id",
                            as: "branch",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            year: 1,
                            section: 1,
                            branch: {
                                $arrayElemAt: ["$branch", 0],
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$section",
        },
        {
            $project: {
                _id: 1,
                date: 1,
                time: 1,
                isCompleted: 1,
                isActive: 1,
                studentsPresent: 1,
                teacher: {
                    _id: 1,
                    name: 1,
                    email: 1,
                },
                subject: {
                    _id: 1,
                    name: 1,
                    code: 1,
                },
                section: {
                    _id: 1,
                    branch: {
                        _id: 1,
                        name: 1,
                    },
                    year: 1,
                    section: 1,
                },
            },
        },
    ]).sort({ date: 1, time: 1 });

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
    attendance.isActive = false;
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

const changeActiveStatus = asyncHandler(async (req, res) => {
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

    attendance.isActive = !attendance.isActive;
    await attendance.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                attendance,
                "Attendance status changed successfully"
            )
        );
});

// for student
const getStudentAllAttendanceIncomplete = asyncHandler(async (req, res) => {
    if (!isStudent(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const attendance = await Attendance.aggregate([
        {
            $match: {
                section: new mongoose.Types.ObjectId(req.user.section),
                studentsPresent: {
                    $ne: new mongoose.Types.ObjectId(req.user._id),
                },
                isCompleted: false,
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "teacher",
                foreignField: "_id",
                as: "teacher",
            },
        },
        {
            $unwind: "$teacher",
        },
        {
            $lookup: {
                from: "subjects",
                localField: "subject",
                foreignField: "_id",
                as: "subject",
            },
        },
        {
            $unwind: "$subject",
        },
        {
            $lookup: {
                from: "sections",
                localField: "section",
                foreignField: "_id",
                as: "section",
                pipeline: [
                    {
                        $lookup: {
                            from: "branches",
                            localField: "branch",
                            foreignField: "_id",
                            as: "branch",
                        },
                    },
                    {
                        $project: {
                            _id: 1,
                            year: 1,
                            section: 1,
                            branch: {
                                $arrayElemAt: ["$branch", 0],
                            },
                        },
                    },
                ],
            },
        },
        {
            $unwind: "$section",
        },
        {
            $project: {
                _id: 1,
                date: 1,
                time: 1,
                isCompleted: 1,
                isActive: 1,
                studentsPresent: 1,
                teacher: {
                    _id: 1,
                    name: 1,
                    email: 1,
                },
                subject: {
                    _id: 1,
                    name: 1,
                    code: 1,
                },
                section: {
                    _id: 1,
                    branch: {
                        _id: 1,
                        name: 1,
                    },
                    year: 1,
                    section: 1,
                },
            },
        },
    ]).sort({ date: 1, time: 1 });

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

    if (!attendance.isActive) {
        return res.status(400).json({ message: "Attendance is not active" });
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
        {
            $lookup: {
                from: "subjects",
                localField: "_id",
                foreignField: "_id",
                as: "subject",
            },
        },
        {
            $unwind: "$subject",
        },
        {
            $project: {
                _id: 1,
                subject: "$subject.name",
                totalClasses: 1,
                totalPresent: 1,
                attendancePercentage: {
                    $multiply: [
                        {
                            $divide: ["$totalPresent", "$totalClasses"],
                        },
                        100,
                    ],
                },
            },
        },
    ]).sort({ attendancePercentage: -1 });

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

const getIndividualAttendanceAnalytics = asyncHandler(async (req, res) => {
    if (!isStudent(req.user)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { subjectId } = req.params;

    const attendanceAnalytics = await Attendance.find({
        section: new mongoose.Types.ObjectId(req.user.section),
        subject: new mongoose.Types.ObjectId(subjectId),
    })
        .populate("subject")
        .sort({ date: -1, time: -1 });

    if (!attendanceAnalytics) {
        return res.status(404).json({ message: "Attendance not found" });
    }

    // console.log(attendanceAnalytics);

    const totalClasses = attendanceAnalytics.length;
    const totalPresent = attendanceAnalytics.filter((attendance) =>
        attendance.studentsPresent.includes(req.user._id)
    ).length;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                attendanceAnalytics,
                totalClasses,
                totalPresent,
                subject: attendanceAnalytics[0].subject.name,
            },
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
    changeActiveStatus,
    getStudentAllAttendanceIncomplete,
    markStudentPresent,
    getEachSubjectAttendanceAnalytics,
    getIndividualAttendanceAnalytics,
};
