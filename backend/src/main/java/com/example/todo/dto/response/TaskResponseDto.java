package com.example.todo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.time.Instant;

@Schema(
        name = "Task",
        description = "Task details"
)
public record TaskResponseDto(
        Long id,
        String title,
        String description,
        boolean isCompleted,
        Instant createdAt,
        Instant updatedAt
) {
}