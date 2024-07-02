import React from "react";
import JobCard from "./JobCard";
import { Board, JobCard as JobCardType } from "../types";

interface KanbanBoardProps {
	boards: Board[];
	boardResults: Record<string, string>;
	onDrop: (jobCard: JobCardType, boardIndex: number) => void;
	onExecuteJob: (boardIndex: number, jobIndex: number) => void;
	onExecuteAllJobs: (boardIndex: number) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
	boards,
	boardResults,
	onDrop,
	onExecuteJob,
	onExecuteAllJobs,
}) => {
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent, boardIndex: number) => {
		e.preventDefault();
		const jsonData = e.dataTransfer.getData("application/json");
		console.log("Received data:", jsonData); // デバッグ用ログ
		if (jsonData) {
			try {
				const jobCard = JSON.parse(jsonData);
				onDrop(jobCard, boardIndex);
			} catch (error) {
				console.error("Error parsing job card data:", error);
			}
		} else {
			console.error("No data received on drop");
		}
	};

	return (
		<div className="flex space-x-4">
			{boards.map((board, boardIndex) => (
				<div
					key={boardIndex}
					className="w-64 bg-gray-100 p-4 rounded"
					onDragOver={handleDragOver}
					onDrop={(e) => handleDrop(e, boardIndex)}
				>
					<h3 className="text-lg font-semibold mb-2">{board.name}</h3>
					{board.jobs.map((job, jobIndex) => (
						<JobCard
							key={jobIndex}
							job={job}
							onClick={() => onExecuteJob(boardIndex, jobIndex)}
							className={
								boardResults[`${boardIndex}-${jobIndex}`] || ""
							}
						/>
					))}
					<button
						onClick={() => onExecuteAllJobs(boardIndex)}
						className="mt-4 w-full py-2 bg-blue-500 text-white rounded"
					>
						Execute All Jobs
					</button>
				</div>
			))}
		</div>
	);
};

export default KanbanBoard;
