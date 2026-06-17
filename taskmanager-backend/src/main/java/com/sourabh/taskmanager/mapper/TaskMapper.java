package com.sourabh.taskmanager.mapper;

import com.sourabh.taskmanager.dto.TaskRequestDto;
import com.sourabh.taskmanager.dto.TaskResponseDto;
import com.sourabh.taskmanager.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public Task toEntity(TaskRequestDto taskRequestDto) {
        Task task = new Task();

        task.setTitle(taskRequestDto.getTitle());
        task.setDescription(taskRequestDto.getDescription());

        return task;
    }

    public TaskResponseDto toResponseDto(Task task) {
        TaskResponseDto dto = new TaskResponseDto();

        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setCompleted(task.isCompleted());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setCompletedAt(task.getCompletedAt());

        return dto;
    }
}