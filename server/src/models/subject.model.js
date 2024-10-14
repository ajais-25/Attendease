import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        code: {
            type: String,
            required: true,
        },
        section: {
            type: Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },
        semester: {
            type: Number,
            required: true,
        },
        assignedTo: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const Subject = mongoose.model("Subject", subjectSchema);
