import mongoose, { Schema } from "mongoose";

const sectionSchema = new Schema(
    {
        branch: {
            type: Schema.Types.ObjectId,
            ref: "Branch",
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        section: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export const Section = mongoose.model("Section", sectionSchema);
