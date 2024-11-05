import mongoose, { Schema } from "mongoose";

const attendanceSchema = new Schema(
    {
        section: {
            type: Schema.Types.ObjectId,
            ref: "Section",
            required: true,
        },
        subject: {
            type: Schema.Types.ObjectId,
            ref: "Subject",
            required: true,
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        time: {
            type: String,
            required: true,
        },
        // semester: {
        //     type: Number,
        //     required: true,
        // },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        studentsPresent: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
