/* eslint-disable @typescript-eslint/no-explicit-any */
export interface JobCard {
	id: string;
	type: string;
	name: string;
	config: Record<string, any>;
}

export interface Board {
	name: string;
	jobs: JobCard[];
}
