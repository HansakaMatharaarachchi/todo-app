import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import TaskList from "./TaskList";
import { Task } from "../../types";

vi.mock("../TaskCard", () => ({
	TaskCard: ({ task }: { task: Task }) => (
		<div data-testid="task-card">{task.title}</div>
	),
}));

vi.mock("lucide-react", () => ({
	Plus: () => <div data-testid="plus-icon" />,
}));

const sampleTasks: Task[] = [
	{
		id: 1,
		title: "Task 1",
		description: "Description 1",
		isCompleted: false,
		createdAt: "2024-01-01T00:00:00Z",
	},
	{
		id: 2,
		title: "Task 2",
		description: "Description 2",
		isCompleted: true,
		createdAt: "2024-01-02T00:00:00Z",
	},
];

describe("TaskList", () => {
	const mockCompleteTask = vi.fn();

	test("renders task cards when tasks are present", () => {
		render(<TaskList tasks={sampleTasks} completeTask={mockCompleteTask} />);

		const taskCards = screen.getAllByTestId("task-card");
		expect(taskCards).toHaveLength(sampleTasks.length);
		expect(taskCards[0]).toHaveTextContent(sampleTasks[0].title);
		expect(taskCards[1]).toHaveTextContent(sampleTasks[1].title);
	});

	test("renders empty state when no tasks", () => {
		render(<TaskList tasks={[]} completeTask={mockCompleteTask} />);

		expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
		expect(
			screen.getByText(/No tasks yet. Add your first task to get started./i)
		).toBeInTheDocument();
		expect(screen.queryByTestId("task-card")).not.toBeInTheDocument();
	});

	test("renders empty state when tasks is undefined", () => {
		render(<TaskList completeTask={mockCompleteTask} />);

		expect(screen.getByTestId("plus-icon")).toBeInTheDocument();
		expect(
			screen.getByText(/No tasks yet. Add your first task to get started./i)
		).toBeInTheDocument();
	});

	test("passes completeTask prop to TaskCard components", () => {
		const { getAllByTestId } = render(
			<TaskList tasks={sampleTasks} completeTask={mockCompleteTask} />
		);

		const taskCards = getAllByTestId("task-card");
		expect(taskCards).toHaveLength(sampleTasks.length);
	});

	test("applies correct styling for empty state", () => {
		const { container } = render(
			<TaskList tasks={[]} completeTask={mockCompleteTask} />
		);

		const emptyState = container.querySelector(".py-16.text-center");
		expect(emptyState).toBeInTheDocument();
		expect(container.querySelector(".bg-gray-50")).toBeInTheDocument();
	});
});
