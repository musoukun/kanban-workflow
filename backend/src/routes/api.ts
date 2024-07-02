import express from "express";
import { executeJob } from "../services/jobExecutor";

const router = express.Router();

router.post("/execute-job", async (req, res) => {
	try {
		const job = req.body;
		const result = await executeJob(job);
		res.json({ success: result });
	} catch (error) {
		res.status(500).json({ error: "Failed to execute job" });
	}
});

export default router;
