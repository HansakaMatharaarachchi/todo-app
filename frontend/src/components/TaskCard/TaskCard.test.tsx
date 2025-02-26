import { describe, expect, test, vi, afterEach } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskCard from "./TaskCard";
import type { Task } from "../../types";

vi.mock("moment", () => ({
	default: {
		utc: () => ({
			local: () => ({
				fromNow: () => "5 minutes ago",
			}),
		}),
	},
}));

vi.mock("lucide-react", () => ({
	CheckCheck: () => <div>CheckCheck Icon</div>,
	Loader: () => <div>Loader Icon</div>,
}));

const sampleTask: Task = {
	id: 1,
	title: "Test Task",
	description: "Test Description",
	isCompleted: false,
	createdAt: "2024-01-01T00:00:00Z",
};

describe("TaskCard", () => {
	const mockCompleteTask = vi.fn();

	afterEach(() => {
		vi.clearAllMocks();
	});

	test("renders task details correctly", () => {
		render(<TaskCard task={sampleTask} completeTask={mockCompleteTask} />);

		expect(screen.getByText(sampleTask.title)).toBeInTheDocument();
		expect(screen.getByText(sampleTask.description)).toBeInTheDocument();
		expect(screen.getByText(/added 5 minutes ago/i)).toBeInTheDocument();
	});

	test("shows initial complete button state", () => {
		render(<TaskCard task={sampleTask} completeTask={mockCompleteTask} />);

		const button = screen.getByRole("button", { name: /done/i });

		expect(button).toBeEnabled();
		expect(button).toHaveTextContent(/done/i);
		expect(button).toContainHTML("CheckCheck Icon");
	});

	test("handles task completion flow correctly", async () => {
		mockCompleteTask.mockResolvedValueOnce(sampleTask);

		render(<TaskCard task={sampleTask} completeTask={mockCompleteTask} />);

		const button = screen.getByRole("button", { name: /done/i });

		fireEvent.click(button);

		expect(button).toBeDisabled();
		expect(button).toHaveTextContent(/updating/i);
		expect(button).toContainHTML("Loader Icon");
		expect(mockCompleteTask).toHaveBeenCalledWith(sampleTask.id);

		await waitFor(() => {
			expect(button).toBeEnabled();
			expect(button).toHaveTextContent(/done/i);
			expect(button).toContainHTML("CheckCheck Icon");
		});
	});

	test("cleans up interval on unmount", () => {
		const clearIntervalSpy = vi.spyOn(window, "clearInterval");
		const { unmount } = render(
			<TaskCard task={sampleTask} completeTask={mockCompleteTask} />
		);

		unmount();
		expect(clearIntervalSpy).toHaveBeenCalled();
		clearIntervalSpy.mockRestore();
	});

	test("handles errors in task completion gracefully", async () => {
		const user = userEvent.setup();
		mockCompleteTask.mockRejectedValueOnce(new Error("API Error"));

		render(<TaskCard task={sampleTask} completeTask={mockCompleteTask} />);

		const button = screen.getByRole("button", { name: /done/i });

		await user.click(button);

		await waitFor(() => {
			expect(button).toBeEnabled();
			expect(button).toHaveTextContent(/done/i);
		});
	});
});
