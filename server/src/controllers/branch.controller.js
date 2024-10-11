import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import { Branch } from "../models/branch.model.js";

const isAdmin = (admin) => {
    if (admin.role === "admin") {
        return true;
    }
    return false;
};

const createBranch = asyncHandler(async (req, res) => {
    if (!isAdmin(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { name, hodId } = req.body;

    if (!name || !hodId) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const hod = await Admin.findById(hodId);

    if (!hod) {
        return res.status(404).json({ message: "Hod not found" });
    }

    const existingBranch = await Branch.findOne({ name });

    if (existingBranch) {
        return res.status(400).json({ message: "Branch already exists" });
    }

    const branch = await Branch.create({
        name,
        hod: hodId,
    });

    const createdBranch = await Branch.findById(branch._id).populate("hod");

    if (!createdBranch) {
        return res.status(500).json({
            message: "Something went wrong while creating Branch",
        });
    }

    return res
        .status(201)
        .json(
            new ApiResponse(201, createdBranch, "Branch created successfully")
        );
});

const getBranches = asyncHandler(async (req, res) => {
    if (!isAdmin(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const branches = await Branch.find().populate("hod");

    return res
        .status(200)
        .json(new ApiResponse(200, branches, "Branches fetched successfully"));
});

const getBranch = asyncHandler(async (req, res) => {
    if (!isAdmin(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { branchId } = req.params;

    const branch = await Branch.findById(branchId).populate("hod");

    if (!branch) {
        return res.status(404).json({ message: "Branch not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, branch, "Branch fetched successfully"));
});

const updateBranch = asyncHandler(async (req, res) => {
    if (!isAdmin(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { branchId } = req.params;
    const { name, hodId } = req.body;

    const branch = await Branch.findById(branchId);

    if (!branch) {
        return res.status(404).json({ message: "Branch not found" });
    }

    if (name) {
        branch.name = name;
    }

    if (hodId) {
        const hod = await Admin.findById(hodId);

        if (!hod) {
            return res.status(404).json({ message: "Hod not found" });
        }

        branch.hod = hodId;
    }

    await branch.save();

    const updatedBranch = await Branch.findById(branchId).populate("hod");

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedBranch, "Branch updated successfully")
        );
});

const deleteBranch = asyncHandler(async (req, res) => {
    if (!isAdmin(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { branchId } = req.params;

    const branch = await Branch.findById(branchId);

    if (!branch) {
        return res.status(404).json({ message: "Branch not found" });
    }

    await Branch.findByIdAndDelete(branchId);

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Branch deleted successfully"));
});

export { createBranch, getBranches, getBranch, updateBranch, deleteBranch };
