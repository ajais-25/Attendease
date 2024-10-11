import mongoose, { Schema } from "mongoose";

const branchSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        hod: {
            type: Schema.Types.ObjectId,
            ref: "Admin",
            required: true,
        },
    },
    { timestamps: true }
);

export const Branch = mongoose.model("Branch", branchSchema);
