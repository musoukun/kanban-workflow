import React from "react";
import JobCard from "./JobCard";
import { Board, JobCard as JobCardType } from "../types";

interface KanbanBoardProps {
	boards: Board[];
	boardResults: Record<string, { backgroundColor: string; message: string }>;
	onDrop: (jobCard: JobCardType, boardIndex: number) => void;
	onExecuteJob: (boardIndex: number, jobIndex: number) => void;
	onExecuteAllJobs: (boardIndex: number) => void;
	onJobDoubleClick: (job: JobCardType) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
	boards,
	boardResults,
	onDrop,
	onExecuteJob,
	onExecuteAllJobs,
	onJobDoubleClick,
}) => {
	const handleDragOver = (e: React.DragEvent) => {
		e.preventDefault();
	};

	const handleDrop = (e: React.DragEvent, boardIndex: number) => {
		e.preventDefault();
		const jsonData = e.dataTransfer.getData("application/json");
		if (jsonData) {
			try {
				const jobCard = JSON.parse(jsonData);
				onDrop(jobCard, boardIndex);
			} catch (error) {
				console.error("Error parsing job card data:", error);
			}
		}
	};

	return (
		<div className="flex space-x-4 pb-4">
			{boards.map((board, boardIndex) => (
				<div
					key={boardIndex}
					className="w-80 bg-white p-4 rounded-lg shadow-md flex flex-col"
					onDragOver={handleDragOver}
					onDrop={(e) => handleDrop(e, boardIndex)}
				>
					<h3 className="text-lg font-semibold mb-4 pb-2 border-b">
						{board.name}
					</h3>
					<div className="flex-grow overflow-y-auto">
						{board.jobs.map((job, jobIndex) => (
							<JobCard
								key={jobIndex}
								job={job}
								onExecute={() =>
									onExecuteJob(boardIndex, jobIndex)
								}
								onDoubleClick={() => onJobDoubleClick(job)}
								className={
									boardResults[`${boardIndex}-${jobIndex}`]
										?.backgroundColor || ""
								}
								message={
									boardResults[`${boardIndex}-${jobIndex}`]
										?.message
								}
							/>
						))}
					</div>
					<button
						onClick={() => onExecuteAllJobs(boardIndex)}
						className="mt-4 w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
					>
						Execute All Jobs
					</button>
				</div>
			))}
		</div>
	);
};

export default KanbanBoard;
