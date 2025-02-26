import { toast } from "react-toastify";
import { TaskForm } from "../components";
import { useAddTaskMutation } from "../services";
import { BaseTask } from "../types";

const AddTaskFormContainer = () => {
	const [addTask] = useAddTaskMutation();

	const handleSubmit = async (data: BaseTask) => {
		return await toast.promise(addTask(data).unwrap(), {
			pending: "Adding task...",
			success: "Task added!",
			error: "Failed to add task, please try again.",
		});
	};

	return <TaskForm onSubmit={handleSubmit} />;
};

export default AddTaskFormContainer;
