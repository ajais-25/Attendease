import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subject } from "../models/subject.model.js";
import { User } from "../models/user.model.js";
import { isHod } from "../utils/checkRole.js";
import { Branch } from "../models/branch.model.js";

const createSubject = asyncHandler(async (req, res) => {
    if (!isHod(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { name, code, section, semester } = req.body;

    if (!name || !code || !section || !semester) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingSubject = await Subject.findOne({
        name,
        code,
        section,
        semester,
    });

    if (existingSubject) {
        return res.status(400).json({ message: "Subject already exists" });
    }

    const subject = await Subject.create({
        name,
        code,
        section,
        semester,
    });

    if (!subject) {
        return res.status(500).json({
            message: "Something went wrong while creating Subject",
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, subject, "Subject created successfully"));
});

const deleteSubject = asyncHandler(async (req, res) => {
    if (!isHod(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const subject = await Subject.findById(req.params.id);

    if (!subject) {
        return res.status(404).json({ message: "Subject not found" });
    }

    await Subject.findByIdAndDelete(req.params.id);

    return res
        .status(200)
        .json(new ApiResponse(200, subject, "Subject deleted successfully"));
});

const getSubjects = asyncHandler(async (req, res) => {
    if (!isHod(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const branch = await Branch.findOne({ hod: req.admin._id });

    const subjects = await Subject.find()
        .populate("section")
        .populate("assignedTo");

    const branchSubjects = subjects.filter((subject) => {
        return subject.section.branch.toString() === branch._id.toString();
    });

    if (!branchSubjects) {
        return res.status(404).json({ message: "Subjects not found" });
    }

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                branchSubjects,
                "Subjects fetched successfully"
            )
        );
});

const assignTeacher = asyncHandler(async (req, res) => {
    if (!!isHod(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { teacherId, subjectId } = req.body;

    if (!teacherId || !subjectId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const teacher = await User.findById(teacherId);
    const subject = await Subject.findById(subjectId);

    if (!teacher || !subject) {
        return res
            .status(404)
            .json({ message: "Teacher or Subject not found" });
    }

    if (teacher.role !== "teacher") {
        return res.status(400).json({ message: "Invalid teacher" });
    }

    if (subject.assignedTo.includes(teacherId)) {
        return res.status(400).json({ message: "Subject already assigned" });
    }

    subject.assignedTo.push(teacherId);
    await subject.save({ validateBeforeSave: false });

    return res.status(200).json({
        message: "Subject assigned to teacher successfully",
    });
});

export { createSubject, deleteSubject, getSubjects, assignTeacher };
