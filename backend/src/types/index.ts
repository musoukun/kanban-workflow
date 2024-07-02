export interface Job {
	id: string;
	type: string;
	name: string;
	config: Record<string, any>;
}
