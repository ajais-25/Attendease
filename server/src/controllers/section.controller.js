import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Section } from "../models/section.model.js";
import { Branch } from "../models/branch.model.js";
import { Subject } from "../models/subject.model.js";
import { isHod, isTeacher } from "../utils/checkRole.js";

const createSection = asyncHandler(async (req, res) => {
    if (!isHod(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { branch, year, section } = req.body;

    if (!branch || !year || !section) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingSection = await Section.findOne({ branch, year, section });

    if (existingSection) {
        return res.status(400).json({ message: "Section already exists" });
    }

    const newSection = await Section.create({
        branch,
        year,
        section,
    });

    if (!newSection) {
        return res.status(500).json({
            message: "Something went wrong while creating Section",
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, newSection, "Section created successfully"));
});

const getSections = asyncHandler(async (req, res) => {
    if (!isHod(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const branch = await Branch.findOne({ hod: req.admin._id });

    const sections = await Section.find({ branch: branch._id });

    if (!sections) {
        return res.status(404).json({ message: "Sections not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, sections, "Sections fetched successfully"));
});

const deleteSection = asyncHandler(async (req, res) => {
    if (!isHod(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const section = await Section.findById(req.params.id);

    if (!section) {
        return res.status(404).json({ message: "Section not found" });
    }

    await Section.findByIdAndDelete(req.params.id);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Section deleted successfully"));
});

const getTeacherSections = asyncHandler(async (req, res) => {
    if (!isTeacher(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const sections = await Subject.aggregate([
        {
            $group: {
                _id: "$section",
            },
        },
    ]);

    if (!sections) {
        return res.status(404).json({ message: "Sections not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, sections, "Sections fetched successfully"));
});

export { createSection, getSections, deleteSection, getTeacherSections };
