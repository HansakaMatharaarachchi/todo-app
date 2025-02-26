import moment from "moment";
import { useEffect, useState } from "react";
import { Task } from "../../types";
import { CheckCheck, Loader } from "lucide-react";

type TaskCardProps = {
	task: Task;
	completeTask: (id: number) => Promise<Task>;
};

const TaskCard = ({ task, completeTask }: TaskCardProps) => {
	const [isCompletingTask, setIsCompletingTask] = useState(false);
	const [timeAgo, setTimeAgo] = useState("");

	useEffect(() => {
		const updateTimeAgo = () => {
			setTimeAgo(moment.utc(task.createdAt).local().fromNow());
		};

		updateTimeAgo();
		const intervalId = setInterval(updateTimeAgo, 60000);

		return () => clearInterval(intervalId);
	}, [task.createdAt]);

	const handleCompleteButtonClick = async () => {
		setIsCompletingTask(true);

		try {
			await completeTask(task.id);
		} catch {
		} finally {
			setIsCompletingTask(false);
		}
	};

	return (
		<div
			key={task.id}
			className="relative bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-all duration-200 overflow-hidden"
		>
			<div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>

			<div className="flex justify-between items-center">
				<h3
					title={task.title}
					className="text-lg font-semibold text-gray-900 line-clamp-1"
				>
					{task.title}
				</h3>
				<span className="flex-none text-[12px] text-gray-500">
					Added
					{` ${timeAgo}.`}
				</span>
			</div>
			<div className="flex items-center mt-2">
				<div className="space-y-3 flex-1">
					<p
						title={task.description}
						className="text-gray-600 text-sm line-clamp-2"
					>
						{task.description}
					</p>
				</div>
				<button
					title="Mark as done"
					type="submit"
					disabled={isCompletingTask}
					onClick={handleCompleteButtonClick}
					className={`flex items-center gap-2 self-end px-6 py-3 text-sm font-medium rounded-xl shadow-sm
						${
							isCompletingTask
								? "bg-primary text-white cursor-progress"
								: "bg-blue-50 text-gray-900 hover:bg-primary hover:text-white hover:shadow-md active:bg-primary active:shadow-inner transition duration-200 ease-in-out active:scale-95 cursor-pointer border border-blue-100 hover:border-primary"
						}`}
				>
					{isCompletingTask ? (
						<>
							<Loader className="w-5 h-5 animate-spin" />
							<span>Updating</span>
						</>
					) : (
						<>
							<CheckCheck className="w-5 h-5" />
							<span>Done</span>
						</>
					)}
				</button>
			</div>
		</div>
	);
};

export default TaskCard;
