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
        semester: {
            type: Number,
            required: true,
        },
        isCompleted: {
            type: Boolean,
            default: false,
        },
        students: [
            {
                student: {
                    type: Schema.Types.ObjectId,
                    ref: "User",
                    required: true,
                },
                status: {
                    type: String,
                    required: true,
                    enum: ["present", "absent"],
                },
            },
        ],
    },
    { timestamps: true }
);

export const Attendance = mongoose.model("Attendance", attendanceSchema);
