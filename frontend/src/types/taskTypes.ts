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

export interface UpdateTaskPayload extends Partial<BaseTask> {
	isCompleted?: boolean;
}
