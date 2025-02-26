export interface BaseTask {
	title: string;
	description: string;
}

export interface Task extends BaseTask {
	id: number;
	isCompleted: boolean;
	createdAt: Date;
	updatedAt: Date;
}

export type CreateTaskPayload = BaseTask;

export interface PatchTaskPayload extends Partial<BaseTask> {
	isCompleted?: boolean;
}
