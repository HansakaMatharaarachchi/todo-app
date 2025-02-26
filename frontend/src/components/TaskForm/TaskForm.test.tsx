import { describe, expect, test, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TaskForm from "./TaskForm";
import type { Task } from "../../types";

vi.mock("lucide-react", () => ({
	Loader: () => <div>Loader Icon</div>,
}));

describe("TaskForm", () => {
	const mockSubmitHandler = vi.fn();
	const sampleTask: Task = {
		id: 1,
		title: "Test Task",
		description: "Test Description",
		isCompleted: false,
		createdAt: new Date().toISOString(),
	};

	beforeEach(() => {
		mockSubmitHandler.mockReset();
	});

	test("renders form fields and submit button", () => {
		render(<TaskForm onSubmit={mockSubmitHandler} />);

		expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
		expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
		expect(
			screen.getByRole("button", { name: /add task/i })
		).toBeInTheDocument();
	});

	test("shows validation errors for empty fields", async () => {
		const user = userEvent.setup();
		render(<TaskForm onSubmit={mockSubmitHandler} />);

		const submitButton = screen.getByRole("button", { name: /add task/i });
		await user.click(submitButton);

		expect(await screen.findByText("Title is required.")).toBeInTheDocument();
		expect(screen.getByText("Description is required.")).toBeInTheDocument();
		expect(submitButton).toBeDisabled();
	});

	test("shows validation errors for whitespace-only input", async () => {
		const user = userEvent.setup();
		render(<TaskForm onSubmit={mockSubmitHandler} />);

		await user.type(screen.getByLabelText(/title/i), "   ");
		await user.type(screen.getByLabelText(/description/i), "   ");
		await user.click(screen.getByRole("button", { name: /add task/i }));

		expect(
			await screen.findByText("Title must not be only empty characters.")
		).toBeInTheDocument();
		expect(
			screen.getByText("Description must not be only empty characters.")
		).toBeInTheDocument();
	});

	test("shows validation errors for max length exceeded", async () => {
		const user = userEvent.setup();
		render(<TaskForm onSubmit={mockSubmitHandler} />);

		const longText = "a".repeat(51);
		await user.type(screen.getByLabelText(/title/i), longText);
		await user.click(screen.getByRole("button", { name: /add task/i }));

		expect(
			await screen.findByText("Title must be less than 50 characters.")
		).toBeInTheDocument();
	});

	test("submits valid form data and resets form", async () => {
		const user = userEvent.setup();

		mockSubmitHandler.mockResolvedValueOnce(sampleTask);
		render(<TaskForm onSubmit={mockSubmitHandler} />);

		const titleInput = screen.getByLabelText(/title/i);
		const descInput = screen.getByLabelText(/description/i);
		const submitButton = screen.getByRole("button", { name: /add task/i });

		await user.type(titleInput, sampleTask.title);
		await user.type(descInput, sampleTask.description);
		await user.click(submitButton);

		await waitFor(() => {
			expect(mockSubmitHandler).toHaveBeenCalledWith(
				expect.objectContaining({
					title: sampleTask.title,
					description: sampleTask.description,
				}),
				expect.anything()
			);
		});

		expect(titleInput).toHaveValue("");
		expect(descInput).toHaveValue("");
	});

	test("shows loading state during submission", async () => {
		const user = userEvent.setup();
		mockSubmitHandler.mockImplementation(
			() =>
				new Promise((resolve) => setTimeout(() => resolve(sampleTask), 1000))
		);
		render(<TaskForm onSubmit={mockSubmitHandler} />);

		await user.type(screen.getByLabelText(/title/i), sampleTask.title);
		await user.type(
			screen.getByLabelText(/description/i),
			sampleTask.description
		);
		await user.click(screen.getByRole("button", { name: /add task/i }));

		expect(await screen.findByText(/adding task/i)).toBeInTheDocument();
		expect(screen.getByText("Loader Icon")).toBeInTheDocument();
	});

	test("disables submit button when invalid or submitting", async () => {
		const user = userEvent.setup();

		render(<TaskForm onSubmit={mockSubmitHandler} />);

		const submitButton = screen.getByRole("button", { name: /add task/i });

		await user.click(submitButton);

		expect(submitButton).toBeDisabled();

		await user.type(screen.getByLabelText(/title/i), "Valid Title");
		await user.type(screen.getByLabelText(/description/i), "Valid Description");
		await waitFor(() => expect(submitButton).toBeEnabled());

		mockSubmitHandler.mockImplementation(
			() =>
				new Promise((resolve) => setTimeout(() => resolve(sampleTask), 1000))
		);

		await user.click(submitButton);

		expect(submitButton).toBeDisabled();
	});
});
