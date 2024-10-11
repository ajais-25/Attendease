import {
    createBranch,
    getBranches,
    getBranch,
    updateBranch,
    deleteBranch,
} from "../controllers/branch.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.route("/").post(verifyAdmin, createBranch).get(verifyAdmin, getBranches);
router
    .route("/:branchId")
    .get(verifyAdmin, getBranch)
    .put(verifyAdmin, updateBranch)
    .delete(verifyAdmin, deleteBranch);

export default router;
