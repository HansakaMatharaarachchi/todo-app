describe("template spec", () => {
	beforeEach(() => {
		cy.visit("http://localhost:5173");
	});

	it("should display the title", () => {
		cy.get("h1").should("contain", "Task Manager");
	});

	it("should render the Add Task Form with title, description input fields, and a submit button", () => {
		cy.get("form").should("exist");

		cy.get("form").contains("Add Task").should("be.visible");

		cy.get("form").contains("Title").should("be.visible");
		cy.get("form input[name='title']").should("exist");

		cy.get("form").contains("Description").should("be.visible");
		cy.get("form textarea[name='description']").should("exist");

		cy.get("form button[type='submit']")
			.contains("Add Task")
			.should("be.visible");
	});

	it("should add a task", () => {
		cy.intercept(
			{
				method: "POST",
				url: "/api/tasks",
			},
			{
				statusCode: 201,
			}
		).as("addTask");

		cy.get("form input[name='title']").type("Task 1");
		cy.get("form textarea[name='description']").type("Description 1");
		cy.get("form button[type='submit']").click();

		cy.wait("@addTask");

		cy.get(".Toastify").should("contain", "Task added!");

		// Check if the task is added to the list
		cy.get("[data-testid='task-list']").should("contain", "Task 1");
	});

	it("should display the task list", () => {
		cy.intercept({
			method: "GET",
			url: "/api/tasks*",
		}).as("getTasks");

		cy.wait("@getTasks");

		cy.get("[data-testid='task-list']").should("exist");
	});

	it("should mark a task as completed", () => {
		cy.intercept({
			method: "GET",
			url: "/api/tasks*",
		}).as("getTasks");

		cy.wait("@getTasks");

		cy.get("[data-testid='task-list']").find("button").first().click();

		cy.get(".Toastify").should("contain", "Task completed successfully!");
	});
});
