package com.example.todo.controller;

import com.example.todo.dto.request.TaskCreateRequestDto;
import com.example.todo.dto.request.TaskPatchRequestDto;
import com.example.todo.dto.response.ErrorResponseDto;
import com.example.todo.dto.response.TaskResponseDto;
import com.example.todo.service.TaskService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;

@RestController
@RequestMapping("/api/tasks")
@Tag(name = "Task API", description = "Endpoints for managing todo tasks")
public class TaskController {
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping()
    @Operation(summary = "Get tasks", description = "Get a list of tasks")
    public ResponseEntity<Page<TaskResponseDto>> getTasks(
            @Parameter(description = "Filter tasks by completion status") @RequestParam(required = false) Boolean isCompleted,
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "10") int size,
            @Parameter(description = "Sort by field") @RequestParam(defaultValue = "id") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "ASC") Sort.Direction sortDirection
    ) {
        Sort.Direction directionToSort = sortDirection == Sort.Direction.ASC ? Sort.Direction.ASC : Sort.Direction.DESC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(directionToSort, sortBy));

        Page<TaskResponseDto> tasks = taskService.getTasks(isCompleted, pageable);

        return ResponseEntity.ok(tasks);
    }

    @PostMapping
    @Operation(summary = "Create a task", description = "Create a new task")
    @ApiResponse(responseCode = "201", description = "Task created successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input",
            content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))
    )
    public ResponseEntity<TaskResponseDto> createTask(@Valid @RequestBody TaskCreateRequestDto request) {
        TaskResponseDto createdTask = taskService.addTask(request);

        URI location;
        location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(createdTask.id())
                .toUri();

        return ResponseEntity.created(location).body(createdTask);
    }

    @PatchMapping("/{id}")
    @Operation(summary = "Patch a task", description = "Partially update a task by ID")
    @ApiResponse(responseCode = "200", description = "Task updated successfully")
    @ApiResponse(responseCode = "400", description = "Invalid input",
            content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))
    )
    @ApiResponse(responseCode = "404", description = "Task not found",
            content = @Content(schema = @Schema(implementation = ErrorResponseDto.class))
    )
    public ResponseEntity<TaskResponseDto> patchTask(@Parameter(description = "Task ID") @PathVariable long id, @Valid @RequestBody TaskPatchRequestDto request) {
        TaskResponseDto updatedTask = taskService.patchTask(id, request);

        return ResponseEntity.ok(updatedTask);
    }
}
