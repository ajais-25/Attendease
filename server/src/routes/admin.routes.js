import {
    registerAdmin,
    login,
    logout,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentAdmin,
    sendPasswordResetEmail,
    resetPassword,
    registerHod,
    getHods,
} from "../controllers/admin.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/register").post(registerAdmin);
router.route("/login").post(login);

// secure routes
router.route("/logout").post(verifyAdmin, logout);
router.route("/refresh-token").post(verifyAdmin, refreshAccessToken);
router.route("/change-password").post(verifyAdmin, changeCurrentPassword);
router.route("/current").get(verifyAdmin, getCurrentAdmin);
router.route("/register-hod").post(verifyAdmin, registerHod);
router.route("/get-hods").get(verifyAdmin, getHods);

router.route("/send-password-reset-email").post(sendPasswordResetEmail);
router.route("/:userId/reset-password/:token").post(resetPassword);

export default router;
