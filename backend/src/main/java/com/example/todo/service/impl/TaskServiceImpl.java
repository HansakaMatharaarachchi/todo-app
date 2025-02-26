package com.example.todo.service.impl;

import com.example.todo.dto.request.TaskCreateRequestDto;
import com.example.todo.dto.request.TaskPatchRequestDto;
import com.example.todo.dto.response.TaskResponseDto;
import com.example.todo.exception.ResourceNotFoundException;
import com.example.todo.mapper.TaskMapper;
import com.example.todo.model.Task;
import com.example.todo.repository.TaskRepository;
import com.example.todo.service.TaskService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper taskMapper) {
        this.taskRepository = taskRepository;
        this.taskMapper = taskMapper;
    }

    @Override
    public TaskResponseDto addTask(TaskCreateRequestDto requestDto) {
        Task task = taskMapper.toTask(requestDto);
        Task savedTask = taskRepository.save(task);

        return taskMapper.toTaskResponseDto(savedTask);
    }

    @Override
    public TaskResponseDto patchTask(Long id, TaskPatchRequestDto requestDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found"));

        taskMapper.updateTask(task, requestDto);

        Task updatedTask = taskRepository.save(task);

        return taskMapper.toTaskResponseDto(updatedTask);
    }

    @Override
    public Page<TaskResponseDto> getTasks(Boolean isCompleted, Pageable pageable) {
        Page<Task> tasks;

        if (isCompleted == null) {
            tasks = taskRepository.findAll(pageable);
        } else {
            tasks = taskRepository.findByIsCompleted(isCompleted, pageable);
        }

        return tasks.map(taskMapper::toTaskResponseDto);
    }
}
