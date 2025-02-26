package com.example.todo.service;

import com.example.todo.dto.request.TaskCreateRequestDto;
import com.example.todo.dto.request.TaskPatchRequestDto;
import com.example.todo.dto.response.TaskResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TaskService {
    TaskResponseDto addTask(TaskCreateRequestDto requestDto);
    TaskResponseDto patchTask(Long id, TaskPatchRequestDto requestDto);
    Page<TaskResponseDto> getTasks(Boolean isCompleted, Pageable pageable);
}
