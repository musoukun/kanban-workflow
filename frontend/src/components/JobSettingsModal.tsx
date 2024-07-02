import React, { useState, useEffect } from "react";
import { JobCard } from "../types";
import { X } from "lucide-react";

interface JobSettingsModalProps {
	job: JobCard | null;
	isOpen: boolean;
	onClose: () => void;
	onSave: (updatedJob: JobCard) => void;
}

const JobSettingsModal: React.FC<JobSettingsModalProps> = ({
	job,
	isOpen,
	onClose,
	onSave,
}) => {
	const [editedJob, setEditedJob] = useState<JobCard | null>(null);

	useEffect(() => {
		setEditedJob(job);
	}, [job]);

	if (!isOpen || !editedJob) return null;

	const handleSave = () => {
		if (editedJob) {
			onSave(editedJob);
			onClose();
		}
	};

	return (
		<div
			className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
		>
			<div
				className={`fixed top-0 left-0 bottom-0 w-96 bg-white shadow-lg transition-transform duration-300 ease-in-out transform ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
			>
				<div className="p-4">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-xl font-bold">Job Settings</h2>
						<button
							onClick={onClose}
							className="p-1 rounded-full hover:bg-gray-200"
						>
							<X size={24} />
						</button>
					</div>
					<div className="space-y-4">
						<div>
							<label className="block mb-1">Name:</label>
							<input
								type="text"
								value={editedJob.name}
								onChange={(e) =>
									setEditedJob({
										...editedJob,
										name: e.target.value,
									})
								}
								className="w-full p-2 border rounded"
							/>
						</div>
						<div>
							<label className="block mb-1">Type:</label>
							<input
								type="text"
								value={editedJob.type}
								onChange={(e) =>
									setEditedJob({
										...editedJob,
										type: e.target.value,
									})
								}
								className="w-full p-2 border rounded"
							/>
						</div>
						<div>
							<label className="block mb-1">Config:</label>
							<textarea
								value={JSON.stringify(
									editedJob.config,
									null,
									2
								)}
								onChange={(e) =>
									setEditedJob({
										...editedJob,
										config: JSON.parse(e.target.value),
									})
								}
								className="w-full p-2 border rounded h-32"
							/>
						</div>
					</div>
					<div className="mt-6">
						<button
							onClick={handleSave}
							className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
						>
							Save
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default JobSettingsModal;
