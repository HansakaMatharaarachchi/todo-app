import { Plus } from "lucide-react";
import { Task } from "../../types";
import { TaskCard } from "../TaskCard";

interface TaskListProps {
	tasks?: Task[];
	completeTask: (id: number) => Promise<Task>;
}

const TaskList = ({ tasks, completeTask }: TaskListProps) => {
	return (
		<div className="flex flex-col size-full items-center justify-center">
			{tasks?.length ? (
				<div className="flex flex-col size-full gap-4 p-2 overflow-y-auto">
					{tasks?.map((task) => (
						<TaskCard key={task.id} task={task} completeTask={completeTask} />
					))}
				</div>
			) : (
				<div className="py-16 text-center">
					<div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-gray-50">
						<Plus className="w-8 h-8 text-gray-400" />
					</div>
					<p className="font-medium text-gray-500">
						No tasks yet. Add your first task to get started.
					</p>
				</div>
			)}
		</div>
	);
};

export default TaskList;
