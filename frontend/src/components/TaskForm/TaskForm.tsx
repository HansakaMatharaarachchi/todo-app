import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { NON_EMPTY_REGEX } from "../../constants";
import { BaseTask, Task } from "../../types";
import { Loader } from "lucide-react";

interface TaskFormProps {
	onSubmit: (task: BaseTask) => Promise<Task>;
}

const TaskForm = ({ onSubmit }: TaskFormProps) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting, isSubmitSuccessful },
	} = useForm<BaseTask>();

	useEffect(() => {
		reset();
	}, [isSubmitSuccessful]);

	return (
		<form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
			<div className="flex flex-col gap-2.5">
				<label htmlFor="title" className="text-sm font-medium text-gray-700">
					Title
					<span title="Required" className="text-red-600 font-bold ml-1">
						*
					</span>
				</label>
				<input
					id="title"
					type="text"
					{...register("title", {
						required: "Title is required.",
						pattern: {
							value: NON_EMPTY_REGEX,
							message: "Title must not be only empty characters.",
						},
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
					<span title="Required" className="text-red-600 font-bold ml-1">
						*
					</span>
				</label>
				<textarea
					id="description"
					{...register("description", {
						required: "Description is required.",
						pattern: {
							value: NON_EMPTY_REGEX,
							message: "Description must not be only empty characters.",
						},
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
						? "bg-primary cursor-progress"
						: "bg-primary transition duration-200 ease-in-out active:scale-95 cursor-pointer"
				}`}
			>
				{isSubmitting ? (
					<>
						<Loader className="w-5 h-5 animate-spin" />
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
