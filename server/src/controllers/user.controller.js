import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Token } from "../models/token.model.js";
import { nodemailerTransport as sendEmail } from "../utils/Nodemailer.js";

const generateAccessAndRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        return res.status(500).json({
            message:
                "Something went wrong while genrating refresh and access token",
        });
    }
};

const register = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password,
        enrollment,
        role,
        branch,
        section,
        semester,
    } = req.body;

    if (!name || !email || !password || !enrollment || !role || !branch) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (role === "student" && (!section || !semester)) {
        return res.status(400).json({
            message: "All fields are required",
        });
    }

    const existingUser = await User.findOne({
        $or: [{ email }, { enrollment }],
    });

    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    let user;
    if (role === "teacher") {
        user = await User.create({
            name,
            email,
            password,
            enrollment,
            role,
            branch,
        });
    } else {
        user = await User.create({
            name,
            email,
            password,
            enrollment,
            role,
            branch,
            section,
            semester,
        });
    }

    const createdUser = await User.findById(user._id)
        .populate("branch")
        .select("-password -refreshToken");

    if (!createdUser) {
        return res
            .status(500)
            .json({ message: "Something went wrong while creating user" });
    }

    const token = await Token.create({
        userId: createdUser._id,
        token: jwt.sign(
            { _id: createdUser._id },
            process.env.VERIFY_EMAIL_TOKEN_SECRET,
            {
                expiresIn: "1d",
            }
        ),
    });

    const url = `${process.env.BASE_URL}/users/${createdUser._id}/verify-email/${encodeURIComponent(token.token)}`;
    await sendEmail(createdUser.email, "Verify Your Email", url);

    return res
        .status(201)
        .json(
            new ApiResponse(
                200,
                createdUser,
                "An email has been sent please verify your email. Also check spam folder if you don't see it in inbox"
            )
        );
});

const verifyEmail = asyncHandler(async (req, res) => {
    const { userId, token } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const hasToken = await Token.findOne({ userId, token });

    if (!hasToken) {
        return res.status(404).json({ message: "Invalid link" });
    }

    await User.findByIdAndUpdate(userId, { isVerified: true }, { new: true });
    await Token.findOneAndDelete({ userId, token }, { new: true });

    return res
        .status(200)
        .json(
            new ApiResponse(
                200,
                {},
                "Email verified successfully!! Now you can Login"
            )
        );
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res
            .status(400)
            .json({ message: "email or password is required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    if (!user.isVerified) {
        let token = await Token.findOne({ userId: user._id });

        if (!token) {
            token = await Token.create({
                userId: user._id,
                token: jwt.sign(
                    { _id: user._id },
                    process.env.VERIFY_EMAIL_TOKEN_SECRET,
                    {
                        expiresIn: "1d",
                    }
                ),
            });
        }

        const url = `${process.env.BASE_URL}/users/${user._id}/verify-email/${token.token}`;
        await sendEmail(user.email, "Verify Your Email", url);

        return res.status(400).json({
            message:
                "Please verify your email to login. Also check spam folder if you don't see it in inbox",
        });
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
        user._id
    );

    const loggedInUser = await User.findById(user._id).select(
        "-password -refreshToken"
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
            new ApiResponse(200, loggedInUser, "User logged In Successfully")
        );
});

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
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
        .json(new ApiResponse(200, {}, "User logged out successfully"));
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

        const user = await User.findById(decodedToken?._id);

        if (!user) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        if (incommingRefreshToken !== user?.refreshToken) {
            return res
                .status(401)
                .json({ message: "Refresh token is expired or used" });
        }

        const options = {
            httpOnly: true,
            secure: true,
        };

        const { accessToken, refreshToken } =
            await generateAccessAndRefreshTokens(user._id);

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

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if (!isPasswordCorrect) {
        return res.status(400).json({ message: "Invalid Password" });
    }

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User fetched successfully"));
});

// for teacher, but teacher can only see his/her teaching subjects
const getUserProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res
        .status(200)
        .json(new ApiResponse(200, user, "User fetched successfully"));
});

const sendPasswordResetEmail = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    const token = await Token.create({
        userId: user._id,
        token: jwt.sign({ _id: user._id }, process.env.RESET_PASSWORD_SECRET, {
            expiresIn: "1d",
        }),
    });

    const url = `${process.env.BASE_URL}/users/${user._id}/reset-password/${token.token}`;

    await sendEmail(user.email, "Password Reset Link", url);

    return res
        .status(200)
        .json(
            new ApiResponse(200, {}, "Password reset link sent successfully")
        );
});

const resetPassword = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { password } = req.body;

    const user = await User.findById(userId);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    user.password = password;
    await user.save({ validateBeforeSave: false });

    await Token.findOneAndDelete({ userId });

    await User.findByIdAndUpdate(
        userId,
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

export {
    register,
    verifyEmail,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    getUserProfile,
    sendPasswordResetEmail,
    resetPassword,
};
