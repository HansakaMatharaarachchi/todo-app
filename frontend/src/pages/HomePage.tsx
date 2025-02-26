import { ClipboardIcon, PlusIcon } from "lucide-react";
import { AddTaskFormContainer, TaskListContainer } from "../containers";
const HomePage = () => {
	return (
		<main className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="flex flex-col w-7xl mx-auto gap-12">
				<header>
					<h1 className="text-3xl font-bold text-center text-gray-900 mb-1">
						Task Manager
					</h1>
					<p className="text-center text-gray-600 text-sm sm:text-base">
						Manage your tasks with ease.
					</p>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-12 gap-14 size-full">
					<section className="flex flex-col gap-6 h-fit md:col-span-5 bg-white rounded-2xl p-8 shadow-lg backdrop-blur-lg border border-gray-100">
						<div className="flex items-center">
							<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-2 sm:mr-3">
								<PlusIcon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
							</div>
							<h2 className="text-lg sm:text-xl font-semibold text-gray-900">
								Add a Task
							</h2>
						</div>
						<AddTaskFormContainer />
					</section>
					<section className="flex flex-col md:col-span-7 gap-6">
						<div className="flex items-center">
							<div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-indigo-100 flex items-center justify-center mr-2 sm:mr-3">
								<ClipboardIcon className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
							</div>
							<h2 className="text-lg sm:text-xl font-semibold text-gray-900">
								My Tasks
							</h2>
						</div>
						<TaskListContainer />
					</section>
				</div>
			</div>
		</main>
	);
};
export default HomePage;
