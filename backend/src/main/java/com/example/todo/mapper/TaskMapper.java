package com.example.todo.mapper;

import com.example.todo.dto.request.TaskCreateRequestDto;
import com.example.todo.dto.request.TaskPatchRequestDto;
import com.example.todo.dto.response.TaskResponseDto;
import com.example.todo.model.Task;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TaskMapper {
    Task toTask(TaskCreateRequestDto requestDto);
    TaskResponseDto toTaskResponseDto(Task task);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTask(@MappingTarget Task task, TaskPatchRequestDto requestDto);
}
