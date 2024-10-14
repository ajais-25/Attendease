import {
    createSubject,
    deleteSubject,
} from "../controllers/subject.controller.js";
import { verifyAdmin } from "../middlewares/auth.middleware.js";
import { Router } from "express";
const router = Router();

router.use(verifyAdmin);

router.route("/").post(createSubject);
router.route("/:id").delete(deleteSubject);

export default router;
