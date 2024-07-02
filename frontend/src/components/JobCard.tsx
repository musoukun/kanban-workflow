import React from "react";
import { JobCard as JobCardType } from "../types";

interface JobCardProps {
	job: JobCardType;
	onExecute: () => void;
	onDoubleClick: () => void;
	className?: string;
	message?: string;
}

const JobCard: React.FC<JobCardProps> = ({
	job,
	onExecute,
	onDoubleClick,
	className,
	message,
}) => {
	return (
		<div
			className={`bg-white p-2 mb-2 rounded shadow cursor-pointer flex items-center justify-between ${className}`}
			onDoubleClick={onDoubleClick}
		>
			<span>{job.name}</span>
			<button
				onClick={(e) => {
					e.stopPropagation();
					onExecute();
				}}
				className="p-1 rounded-full hover:bg-gray-200"
			>
				▶
			</button>
			{message && <div className="text-sm text-gray-500">{message}</div>}
		</div>
	);
};

export default JobCard;
