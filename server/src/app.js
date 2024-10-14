import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes import
import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import sectionRoutes from "./routes/section.routes.js";

// routes implementation
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/branch", branchRoutes);
app.use("/api/v1/section", sectionRoutes);

export { app };
