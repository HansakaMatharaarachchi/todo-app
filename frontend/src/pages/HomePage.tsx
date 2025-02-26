import { AddTaskFormContainer } from "../containers";

const HomePage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
			<div className="container max-w-5xl mx-auto flex flex-col gap-12">
				<h1 className="text-3xl font-bold text-center text-gray-900">
					Task Manager
				</h1>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					<div className="bg-white rounded-2xl p-8 shadow-lg backdrop-blur-lg backdrop-filter border border-gray-100">
						<h2 className="mb-8 text-2xl font-semibold text-gray-900">
							Add a Task
						</h2>
						<AddTaskFormContainer />
					</div>
					<div className="space-y-8">
						<h2 className="mb-8 text-2xl font-semibold text-gray-900">Tasks</h2>
						{/* !TODO */}
						taskList Container
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomePage;
