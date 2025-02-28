# Task Manager - A Simple To-Do task management web application

This project is a simple To-Do task web application that allows users to create and manage tasks through a web interface. The application is built with a three-tier architecture comprising a frontend UI, a backend API, and a relational database. All components are containerized using Docker and orchestrated with Docker Compose for seamless setup and deployment.

## Table of Contents

- [Task Manager - A Simple To-Do task management web application](#task-manager---a-simple-to-do-task-management-web-application)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Architecture](#architecture)
  - [Tech Stack](#tech-stack)
  - [Setup and Installation](#setup-and-installation)
    - [Prerequisites](#prerequisites)
    - [Installation Steps](#installation-steps)
  - [Running the Application](#running-the-application)
  - [Testing](#testing)
    - [Backend Tests](#backend-tests)
    - [Frontend Tests](#frontend-tests)
  - [Code Structure](#code-structure)
  - [Design Considerations](#design-considerations)

## Features

- **Create Tasks**: Users can add new tasks by providing a title and a description.
- **View Recent Tasks**: Displays the five most recent incomplete tasks.
- **Mark as Completed**: Users can mark tasks as completed, which removes them from the active task list.

## Architecture

The application follows a three-tier architecture:

1. **Frontend**: A Single Page Application (SPA) built with React that interacts with the backend API.
2. **Backend**: A RESTful API developed using Java Spring Boot that handles task creation, retrieval, and completion.
3. **Database**: A PostgreSQL relational database that stores task data.

All components are containerized using Docker, and Docker Compose is used to manage multi-container deployment.

See the [Code Structure](#code-structure) section for more details on the project's organization.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, RTK Query, Axios
- **Backend**: Spring Boot, Java, JPA, Hibernate, PostgreSQL
- **Database**: PostgreSQL
- **Containerization**: Docker, Docker Compose

See the [Testing](#testing) section for details on testing frameworks used.

## Setup and Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

### Installation Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/HansakaMatharaarachchi/todo-app.git
   cd todo-app
   ```

2. **Thats it! You are ready Run the application.**

## Running the Application

1. **Build and Start Containers**:

   In the project root directory, run:

   ```bash
   docker-compose up --build
   ```

   This command builds and starts the frontend, backend, and database containers.

2. **Access the Application**:

   Once all services are up and running successfully, you can access the application at the following URLs:

   - Frontend: [http://localhost:5173](http://localhost:5173)
   - Backend API:
     - Swagger UI - [http://localhost:8080/api/docs](http://localhost:8080/api/docs)
     - API - [http://localhost:8080/api/tasks](http://localhost:8080/api/tasks)

## Testing

### Backend Tests

The backend includes uniting tests that can be run using Gradle:

```bash
./gradlew test
```

### Frontend Tests

Frontend unit tests can be run as follows:

```bash
yarn test
```

End-to-end tests can be run as follows:

```bash
yarn cypress:open
```

This command opens the Cypress Test Runner, where you can run the tests interactively.

## Code Structure

The project follows a modular structure:

- **frontend/**: Contains the React application.
  - `cypress/`: End-to-end testing with Cypress
  - `public/`: Static assets to be served.
  - `src/`: Source code for React components, services, and styles.
    - `components/`: Reusable UI components and unit tests for each component (TaskCard, TaskForm, TaskList)
    - `containers/`: Container components that manage state and data fetching (TaskListContainer, AddTaskFormContainer)
    - `pages/`: Pages that render routes (Home)
    - `services/`: API services to interact with the backend (taskService)
    - `types/`: TypeScript type definitions (taskTypes, pagination)
    - `App.tsx`: Main application component
    - `main.tsx`: Application entry point
    - `store.ts`: State management configuration
    - `styles.css`: Global styles
  - Config files: `.gitignore`, `.dockerignore`, `cypress.config`, etc.
- **backend/**: Contains the Java Spring Boot API.
  - `src/`: Source code for the backend application.
    - `main/java/com/example/todo/`: Main application code.
      - `config/`: Configuration classes.
        - `CorsConfig.java`: CORS configuration settings.
      - `controller/`: REST API endpoints.
        - `TaskController.java`: Handles task-related HTTP requests.
      - `dto/`: Data Transfer Objects.
        - `request/`: Request DTOs (TaskCreateRequestDto, TaskPatchRequestDto)
          - `Base/`: Base request DTOs (AbstractTaskRequestDto).
        - `response/`: Response DTOs (TaskResponseDto, ErrorResponseDto).
      - `exception/`: Custom exceptions (GlobalExceptionHandler, ResourceNotFoundException).
      - `mapper/`: Object mappers (TaskMapper).
      - `model/`: Domain entities (Task).
      - `repository/`: Data access layer (TaskRepository).
      - `service/`: Business logic (TaskService).
        - `impl/`: Service implementations. (TaskServiceImpl).
      - `util/`: Utility classes. (RegexPatterns).
      - `TodoApplication.java`: Main application class.
    - `resources/`: Configuration files (application.properties).
  - `test/`: Test source code including application tests.
  - Config files: `.gitignore`, `build.gradle`, `Dockerfile`, etc.

## Design Considerations

- **Project Structure**:
  - **Frontend**: The frontend is organized into components, containers, and pages for better separation of concerns.
  - **Backend**: The backend follows a layered architecture with separate packages for controllers, services, repositories, models, and DTOs for better code organization and maintainability.
- **Database Schema**: The `task` table includes columns for `task_id`, `title`, `description`, `is_completed`, `created_at`, and `updated_at`.
- **API Design**: RESTful endpoints handle CRUD operations. For example:
  - `POST /api/tasks`: Create a new task.
  - `GET /api/tasks`: Retrieve the tasks with pagination.
  - `PATCH /api/tasks/:id`: Update a task. (e.g., mark as complete)
- **Documentation**: The backend API includes Swagger documentation for easy API exploration.
- **State Management**: The frontend uses Redux Toolkit (RTK) for state management, including fetching tasks and updating the task list.
- **Error Handling**: The backend API includes a global exception handler to return consistent error responses.
- **Containerization**: The application is containerized using Docker for easy deployment and scaling.
- **Testing**:
  - **Unit testing**: Both frontend and backend include unit tests to ensure the application functions correctly.
  - **e2e Testing**: The frontend includes end-to-end tests using Cypress to ensure the application works as expected.
- **Docker Compose**: The application is orchestrated using Docker Compose for multi-container deployment.
