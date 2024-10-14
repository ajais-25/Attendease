import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Admin } from "../models/admin.model.js";
import jwt from "jsonwebtoken";
import { Token } from "../models/token.model.js";
import { isAdmin, isHod } from "../utils/checkRole.js";
import { nodemailerTransport as sendEmail } from "../utils/Nodemailer.js";

const generateAccessAndRefreshTokens = async (adminId) => {
    try {
        const admin = await Admin.findById(adminId);
        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        admin.refreshToken = refreshToken;
        await admin.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            message:
                "Something went wrong while genrating refresh and access token",
        });
    }
};

// normal
const registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, role, password } = req.body;

    if (!name || !email || !role || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (role !== "admin") {
        return res.status(400).json({ message: "Invalid role" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
        name,
        email,
        role,
        password,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    );

    if (!createdAdmin) {
        return res.status(500).json({
            message: "Something went wrong while creating Admin",
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdAdmin, "Admin created successfully"));
});

const login = asyncHandler(async (req, res) => {
    const { role, email, password } = req.body;

    if (!role || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const admin = await Admin.findOne({ role, email });

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    const isPasswordCorrect = await admin.isPasswordCorrect(password);

    if (!isPasswordCorrect) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        admin._id
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, loggedInAdmin, "Admin logged In Successfully")
        );
});

const logout = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.admin._id);

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    admin.refreshToken = "";
    await admin.save({ validateBeforeSave: false });

    return res
        .status(200)
        .clearCookie("accessToken")
        .clearCookie("refreshToken")
        .json(new ApiResponse(200, {}, "Admin logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
    const incommingRefreshToken =
        req.cookies.refreshToken || req.body.refreshToken;

    if (!incommingRefreshToken) {
        return res.status(401).json({ message: "Unauthorized request" });
    }

    try {
        const decodedToken = jwt.verify(
            incommingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        );

        const admin = await Admin.findById(decodedToken?._id);

        if (!admin) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        if (incommingRefreshToken !== admin?.refreshToken) {
            return res
                .status(401)
                .json({ message: "Refresh token is expired or used" });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(admin._id);

        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken,
                        refreshToken,
                    },
                    "Access token refreshed successfully"
                )
            );
    } catch (error) {
        return res
            .status(401)
            .json({ message: error?.message || "Invalid refresh token" });
    }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const admin = await Admin.findById(req.admin?._id);

    const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    admin.password = newPassword;
    await admin.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getCurrentAdmin = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.admin, "Admin fetched successfully"));
});

const sendPasswordResetEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    const token = await Token.create({
        adminId: admin._id,
        token: jwt.sign({ _id: admin._id }, process.env.RESET_PASSWORD_SECRET, {
            expiresIn: "1d",
        }),
    });

    const url = `${process.env.BASE_URL}/admin/${admin._id}/reset-password/${token.token}`;

    await sendEmail(admin.email, "Password Reset Link", url);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password reset link sent successfully")
        );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { adminId } = req.params;
    const { password } = req.body;

    const admin = await Admin.findById(adminId);

    if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
    }

    admin.password = password;
    await admin.save({ validateBeforeSave: false });

    await Token.findOneAndDelete({ userId: adminId });

    await Admin.findByIdAndUpdate(
        adminId,
        {
            $unset: { refreshToken: 1 }, // this removes the field from the document
        },
        { new: true }
    );

    const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({ message: "Password reset successfully" });
});

// funtionality of admin
const registerHod = asyncHandler(async (req, res) => {
    if (!isAdmin(req.admin)) {
        return res.status(403).json({ message: "Unauthorized request" });
    }

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
    }

    const admin = await Admin.create({
        name,
        email,
        role: "hod",
        password,
    });

    const createdAdmin = await Admin.findById(admin._id).select(
        "-password -refreshToken"
    );

    if (!createdAdmin) {
        return res.status(500).json({
            message: "Something went wrong while creating Hod",
        });
    }

    return res
        .status(201)
        .json(new ApiResponse(201, createdAdmin, "Hod created successfully"));
});

export {
    registerAdmin,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    sendPasswordResetEmail,
    resetPassword,
    registerHod,
};
