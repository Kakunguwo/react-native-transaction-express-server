import { Router } from "express";

import { checkHealth } from "../controllers/health.js";

const router = Router();

router.route("/").get(checkHealth);

export default router;
