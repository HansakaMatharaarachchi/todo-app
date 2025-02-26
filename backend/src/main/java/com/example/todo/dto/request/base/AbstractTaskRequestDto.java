package com.example.todo.dto.request.base;

import com.example.todo.util.RegexPatterns;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public abstract class AbstractTaskRequestDto {
    @Size(max = 50, message = "Title must be less than 50 characters")
    @Pattern(regexp = RegexPatterns.NON_EMPTY, message = "Title must not be only empty characters")
    protected String title;

    @Size(max = 255, message = "Description must not exceed 255 characters")
    @Pattern(regexp = RegexPatterns.NON_EMPTY, message = "Description must not be only empty characters")
    protected String description;

    protected Boolean isCompleted;

    protected AbstractTaskRequestDto(
            String title,
            String description,
            Boolean isCompleted
    ) {
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getIsCompleted() {
        return isCompleted;
    }

    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
