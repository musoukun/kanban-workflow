import React from "react";
import { JobCard as JobCardType } from "../types";

interface JobCardProps {
	job: JobCardType;
	onClick: () => void;
	className?: string;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, className }) => {
	return (
		<div
			className={`bg-white p-2 mb-2 rounded shadow cursor-pointer ${className}`}
			onClick={onClick}
		>
			{job.name}
		</div>
	);
};

export default JobCard;
