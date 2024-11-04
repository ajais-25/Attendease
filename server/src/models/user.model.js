import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        enrollment: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            required: true,
            enum: ["student", "teacher"],
        },
        branch: [
            {
                type: Schema.Types.ObjectId,
                ref: "Branch",
                required: true,
            },
        ],
        section: {
            // for student
            type: String,
        },
        semester: {
            // for student
            type: Number,
        },
        password: {
            type: String,
            required: true,
        },
        subjects: [
            {
                type: Schema.Types.ObjectId,
                ref: "Subject",
            },
        ],
        isVerified: {
            type: Boolean,
            default: false,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            name: this.name,
            email: this.email,
            enrollment: this.enrollment,
            role: this.role,
            branch: this.branch,
            year: this.year,
            section: this.section,
            semester: this.semester,
            subjects: this.subjects,
            isVerified: this.isVerified,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
        }
    );
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
        }
    );
};

export const User = mongoose.model("User", userSchema);
