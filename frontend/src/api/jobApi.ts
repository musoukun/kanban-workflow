import axiosClient from "./axiosClient";
import { JobCard } from "../types";

const jobApi = {
	// headersとbodyを指定してPOSTリクエストを送信
	// リクエストの結果を返す
	executeJob: async (job: JobCard) =>
		await axiosClient.post("/execute-job", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(job),
		}),
};

export default jobApi;
