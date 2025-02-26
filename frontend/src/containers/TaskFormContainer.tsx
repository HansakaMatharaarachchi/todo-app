import { TaskForm } from "../components";

const TaskFormContainer = () => {
	return (
		<TaskForm
			onSubmit={(data) => {
				console.log(data);
				throw new Error("Not implemented");
			}}
		/>
	);
};

export default TaskFormContainer;
