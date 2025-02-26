package com.example.todo.dto.response;

import io.swagger.v3.oas.annotations.media.Schema;

import java.util.Map;

@Schema(
        name = "ErrorResponse",
        description = "Response body for errors"
)
public record ErrorResponseDto(
        int statusCode,
        String message,
        Map<String, String> errors
) {
}