import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            // ask if it is required or not
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
            enum: ["student", "teacher", "admin"],
        },
        branch: [
            // 1 for student, many for teacher
            {
                type: Schema.Types.ObjectId,
                ref: "Branch",
                required: true,
            },
        ],
        year: {
            // for student
            type: Number,
        },
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
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
