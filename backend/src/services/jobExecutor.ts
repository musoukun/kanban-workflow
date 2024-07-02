import axios from "axios";
import { Job } from "../types";

export const executeJob = async (job: Job): Promise<boolean> => {
	if (job.type === "rest") {
		try {
			const response = await axios({
				method: job.config.method,
				url: job.config.url,
				data: job.config.data,
			});
			return response.status >= 200 && response.status < 300;
		} catch (error) {
			console.error("Error executing REST job:", error);
			return false;
		}
	}

	// Add more job types here as needed

	return false;
};
