import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Subject } from "../models/subject.model.js";
import { isHod } from "../utils/checkRole.js";

const createSection = asyncHandler(async (req, res) => {
    if (isHod(req.user)) {
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
    if (isHod(req.user)) {
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

export { createSubject, deleteSubject };
