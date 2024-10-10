import {
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
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { Router } from "express";

const router = Router();

router.route("/register").post(register);
router.route("/:userId/verify-email/:token").get(verifyEmail);
router.route("/login").post(login);

// secure routes
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-access-token").post(verifyJWT, refreshAccessToken);
router.route("/change-password").post(verifyJWT, changeCurrentPassword);
router.route("/current").get(verifyJWT, getCurrentUser);
router.route("/profile/:userId").get(verifyJWT, getUserProfile);

router.route("/send-password-reset-email").post(sendPasswordResetEmail);
router.route("/:userId/reset-password/:token").post(resetPassword);

export default router;
