import React, { useState } from "react";
import SideMenu from "./SideMenu";
import KanbanBoard from "./KanbanBoard";
import { Board, JobCard } from "../types";

const KanbanWorkflow: React.FC = () => {
	const [boards, setBoards] = useState<Board[]>([
		{ name: "To Do", jobs: [] },
	]);
	const [boardResults, setBoardResults] = useState<Record<string, string>>(
		{}
	);

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

	const executeJob = async (job: JobCard) => {
		const response = await fetch("https://localhost:3000/api/execute-job", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(job),
		});

		const result = await response.json();
		return result.success;
	};

	const handleExecuteJob = async (boardIndex: number, jobIndex: number) => {
		const job = boards[boardIndex].jobs[jobIndex];
		const success = await executeJob(job);
		const newBoardResults = { ...boardResults };
		newBoardResults[`${boardIndex}-${jobIndex}`] = success
			? "bg-[#adf7b6]"
			: "bg-[#f8b6ad]";
		setBoardResults(newBoardResults);
	};

	const handleExecuteAllJobs = async (boardIndex: number) => {
		for (let i = 0; i < boards[boardIndex].jobs.length; i++) {
			await handleExecuteJob(boardIndex, i);
		}
	};

	const handleSaveKanban = () => {
		const kanbanData = JSON.stringify(boards);
		// Here you would typically send this data to a backend to save
		console.log("Kanban data saved:", kanbanData);
	};

	return (
		<div className="w-full h-full flex">
			<SideMenu onDragStart={(jobCard) => ({ jobCard })} />
			<div className="flex-1 p-4">
				<KanbanBoard
					boards={boards}
					boardResults={boardResults}
					onDrop={handleDrop}
					onExecuteJob={handleExecuteJob}
					onExecuteAllJobs={handleExecuteAllJobs}
				/>
				<button
					onClick={handleAddBoard}
					className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 text-white rounded-full text-2xl"
				>
					+
				</button>
				<button
					onClick={handleSaveKanban}
					className="fixed bottom-4 right-20 px-4 py-2 bg-green-500 text-white rounded"
				>
					Save Kanban
				</button>
			</div>
		</div>
	);
};

export default KanbanWorkflow;
