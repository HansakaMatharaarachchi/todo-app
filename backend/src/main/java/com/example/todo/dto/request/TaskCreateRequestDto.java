package com.example.todo.dto.request;

import com.example.todo.dto.request.base.AbstractTaskRequestDto;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotNull;

@Schema(name = "TaskCreateRequest", description = "Request body for creating a task")
public class TaskCreateRequestDto extends AbstractTaskRequestDto {
    public TaskCreateRequestDto(String title, String description, Boolean isCompleted) {
        super(title, description, isCompleted);
    }

    @Override
    @NotNull(message = "Title is required")
    public String getTitle() {
        return super.getTitle();
    }

    @Override
    @NotNull(message = "Description is required")
    public String getDescription() {
        return super.getDescription();
    }
}
