import { useForm } from "react-hook-form";
import { BaseTask } from "../../types";
import { toast } from "react-toastify";

interface TaskFormProps {
	onSubmit: (task: BaseTask) => Promise<void>;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<BaseTask>();

	const submitForm = async (data: BaseTask) => {
		try {
			await onSubmit(data);
			reset();

			toast.success("Task added successfully!");
		} catch {
			toast.error("Failed to add task. Please try again.");
		}
	};

	return (
		<form className="flex flex-col gap-6" onSubmit={handleSubmit(submitForm)}>
			<div className="flex flex-col gap-2.5">
				<label htmlFor="title" className="text-sm font-medium text-gray-700">
					Title
				</label>
				<input
					type="text"
					{...register("title", {
						required: "Title is required.",
						maxLength: {
							value: 50,
							message: "Title must be less than 50 characters.",
						},
					})}
					className="w-full px-4 py-3 rounded-xl ring-gray-200 ring-1 bg-gray-50 focus:bg-white transition-colors duration-200 focus:ring-primary/20 focus:ring-2 focus:ring-opacity-50 focus:outline-0 sm:text-sm"
					placeholder="What needs to be done?"
				/>
				{errors.title && (
					<span className="text-xs text-red-600">{errors.title.message}</span>
				)}
			</div>

			<div className="flex flex-col gap-2.5">
				<label
					htmlFor="description"
					className="text-sm font-medium text-gray-700"
				>
					Description
				</label>
				<textarea
					{...register("description", {
						required: "Description is required.",
						maxLength: {
							value: 255,
							message: "Description must be less than 255 characters.",
						},
					})}
					rows={6}
					className="w-full px-4 py-3 rounded-xl ring-gray-200 ring-1 bg-gray-50 focus:bg-white transition-colors duration-200 focus:ring-primary/20 focus:ring-2 focus:ring-opacity-50 focus:outline-0 sm:text-sm"
					placeholder="Add some details about your task..."
				/>
				{errors.description && (
					<span className="text-xs text-red-600">
						{errors.description.message}
					</span>
				)}
			</div>

			<button
				type="submit"
				disabled={Object.keys(errors).length > 0 || isSubmitting}
				className={`flex items-center gap-2 self-end px-12 py-3 text-sm font-medium rounded-xl text-white shadow-sm ${
					Object.keys(errors).length > 0
						? "bg-red-300 cursor-not-allowed"
						: isSubmitting
						? "bg-primary cursor-not-allowed"
						: "bg-primary transition duration-200 ease-in-out active:scale-95 cursor-pointer"
				}`}
			>
				{isSubmitting ? (
					<>
						<img
							src="/icons/spinner.svg"
							alt="Loading..."
							className="w-5 h-5"
						/>
						<span>Adding Task...</span>
					</>
				) : (
					"Add Task"
				)}
			</button>
		</form>
	);
};

export default TaskForm;
