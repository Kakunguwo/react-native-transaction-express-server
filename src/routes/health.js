import { Router } from "express";

import { checkHealth } from "../controllers/health.js";

router.get("/", checkHealth);

const router = Router();
