import React from "react";
import { JobCard } from "../types";

interface SideMenuProps {
	onDragStart: (jobCard: JobCard) => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ onDragStart }) => {
	const jobCards: JobCard[] = [
		{
			id: "1",
			type: "rest",
			name: "GET Request",
			config: { url: "https://api.example.com/data", method: "GET" },
		},
		{
			id: "2",
			type: "rest",
			name: "POST Request",
			config: { url: "https://api.example.com/data", method: "POST" },
		},
	];

	const handleDragStart = (event: React.DragEvent, jobCard: JobCard) => {
		event.dataTransfer.setData("application/json", JSON.stringify(jobCard));
		onDragStart(jobCard);
	};

	return (
		<div className="w-64 h-full bg-gray-200 p-4">
			<h2 className="text-xl font-bold mb-4">Job Cards</h2>
			{jobCards.map((jobCard) => (
				<div
					key={jobCard.id}
					draggable
					onDragStart={(e) => handleDragStart(e, jobCard)}
					className="bg-white p-2 mb-2 rounded shadow cursor-move"
				>
					{jobCard.name}
				</div>
			))}
		</div>
	);
};

export default SideMenu;
