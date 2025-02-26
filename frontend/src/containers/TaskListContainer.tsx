import { Loader, RefreshCw } from "lucide-react";
import { TaskList } from "../components";
import { useGetTasksQuery, usePatchTaskMutation } from "../services";
import { toast } from "react-toastify";

const TaskListContainer = () => {
	const {
		data: paginatedTasks,
		isSuccess: isGetTasksSuccess,
		isLoading: isGetTasksLoading,
		isError: isGetTasksError,
		refetch: refetchTasks,
	} = useGetTasksQuery({
		isCompleted: false,
		sortBy: "createdAt",
		sortDirection: "DESC",
		page: 0,
		size: 5,
	});

	const [patchTask] = usePatchTaskMutation();

	const completeTask = async (id: number) => {
		return await toast.promise(
			patchTask({
				id,
				payload: {
					isCompleted: true,
				},
			}).unwrap(),
			{
				pending: "Completing task...",
				success: "Task completed successfully!",
				error: "Failed to complete task.",
			}
		);
	};

	return (
		<div className="flex flex-col h-full overflow-hidden">
			{!isGetTasksSuccess ? (
				<div className="flex-1 flex flex-col items-center justify-center gap-2">
					{isGetTasksLoading && (
						<>
							<Loader size={40} className="animate-spin text-primary" />
							<span>Loading your tasks...</span>
						</>
					)}

					{isGetTasksError && (
						<>
							<span className="text-lg text-center">
								Something went wrong while getting your tasks.
							</span>
							<span className="text-base">Please try again.</span>
							<button
								title="Retry"
								type="button"
								onClick={refetchTasks}
								className="p-2 text-sm font-medium text-center text-white rounded-full bg-primary hover:bg-primary/80 focus:outline-none"
							>
								<RefreshCw size={20} />
							</button>
						</>
					)}
				</div>
			) : (
				<div className="flex flex-col h-full overflow-hidden">
					{!!paginatedTasks?.totalElements && (
						<div className="flex justify-end self-end p-2 text-sm text-gray-600">
							<span>Showing</span>
							<span className="mx-1 font-semibold text-primary/60">
								{paginatedTasks?.numberOfElements}
							</span>
							<span>out of</span>
							<span className="mx-1 font-semibold">
								{paginatedTasks?.totalElements}
							</span>
							<span>recent tasks.</span>
						</div>
					)}
					<div className="flex-1 overflow-auto">
						<TaskList
							tasks={paginatedTasks?.content}
							completeTask={completeTask}
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default TaskListContainer;
