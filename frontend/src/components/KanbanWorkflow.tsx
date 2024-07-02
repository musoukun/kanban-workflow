import React, { useState } from "react";
import SideMenu from "./SideMenu";
import KanbanBoard from "./KanbanBoard";
import JobSettingsModal from "./JobSettingsModal";
import { Board, JobCard } from "../types";
import { Plus } from "lucide-react";
import jobApi from "../api/jobApi";

interface ExecuteJobResult {
	success: boolean;
	message?: string;
}

const KanbanWorkflow: React.FC = () => {
	const [boards, setBoards] = useState<Board[]>([
		{ name: "To Do", jobs: [] },
	]);
	const [boardResults, setBoardResults] = useState<
		Record<string, { backgroundColor: string; message: string }>
	>({});
	const [selectedJob, setSelectedJob] = useState<JobCard | null>(null);
	const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

	const handleAddBoard = () => {
		setBoards([
			...boards,
			{ name: `Board ${boards.length + 1}`, jobs: [] },
		]);
	};

	const handleDrop = (jobCard: JobCard, boardIndex: number) => {
		const updatedBoards = [...boards];
		updatedBoards[boardIndex].jobs.push(jobCard);
		setBoards(updatedBoards);
	};

	const executeJob = async (job: JobCard): Promise<ExecuteJobResult> => {
		try {
			const response = await jobApi.executeJob(job);
			const result = response.data;
			return {
				success: result.success,
				message: result.message || "Job executed successfully",
			};
		} catch (error) {
			console.error("Error executing job:", error);
			return {
				success: false,
				message:
					error instanceof Error
						? error.message
						: "An unknown error occurred",
			};
		}
	};

	const handleExecuteJob = async (boardIndex: number, jobIndex: number) => {
		const job = boards[boardIndex].jobs[jobIndex];
		const result = await executeJob(job);

		const newBoardResults = { ...boardResults };
		newBoardResults[`${boardIndex}-${jobIndex}`] = {
			backgroundColor: result.success ? "bg-[#adf7b6]" : "bg-[#f8b6ad]",
			message:
				result.message ||
				(result.success ? "Execution successful" : "Execution failed"),
		};
		setBoardResults(newBoardResults);

		if (!result.success) {
			console.error(`Job execution failed: ${result.message}`);
			// オプション: エラーメッセージをユーザーに表示する
			// alert(`Job execution failed: ${result.message}`);
		}
	};

	const handleExecuteAllJobs = async (boardIndex: number) => {
		for (let i = 0; i < boards[boardIndex].jobs.length; i++) {
			await handleExecuteJob(boardIndex, i);
		}
	};

	const handleSaveKanban = () => {
		const kanbanData = JSON.stringify(boards);
		console.log("Kanban data saved:", kanbanData);
		// Here you would typically send this data to a backend to save
	};

	const handleJobDoubleClick = (job: JobCard) => {
		setSelectedJob(job);
		setIsSettingsModalOpen(true);
	};

	const handleJobSettingsSave = (updatedJob: JobCard) => {
		const updatedBoards = boards.map((board) => ({
			...board,
			jobs: board.jobs.map((job) =>
				job.id === updatedJob.id ? updatedJob : job
			),
		}));
		setBoards(updatedBoards);
	};

	return (
		<div className="w-full h-full flex">
			<SideMenu onDragStart={(jobCard) => ({ jobCard })} />
			<div className="flex-1 p-4 bg-gray-100">
				<div className="mb-4 flex justify-between items-center">
					<h2 className="text-2xl font-bold">Kanban Boards</h2>
					<button
						onClick={handleAddBoard}
						className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
					>
						<Plus size={24} />
					</button>
				</div>
				<div className="overflow-x-auto">
					<KanbanBoard
						boards={boards}
						boardResults={boardResults}
						onDrop={handleDrop}
						onExecuteJob={handleExecuteJob}
						onExecuteAllJobs={handleExecuteAllJobs}
						onJobDoubleClick={handleJobDoubleClick}
					/>
				</div>
				<button
					onClick={handleSaveKanban}
					className="fixed bottom-4 right-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
				>
					Save Kanban
				</button>
			</div>
			<JobSettingsModal
				job={selectedJob}
				isOpen={isSettingsModalOpen}
				onClose={() => setIsSettingsModalOpen(false)}
				onSave={handleJobSettingsSave}
			/>
		</div>
	);
};

export default KanbanWorkflow;
