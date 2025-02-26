package com.example.todo.dto.request;

import com.example.todo.dto.request.base.AbstractTaskRequestDto;
import io.swagger.v3.oas.annotations.media.Schema;

@Schema(name = "TaskPatchRequest", description = "Request body for updating a task")
public class TaskPatchRequestDto extends AbstractTaskRequestDto {
    protected TaskPatchRequestDto(String title, String description, Boolean isCompleted) {
        super(title, description, isCompleted);
    }
}
