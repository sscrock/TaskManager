package com.sourabh.taskmanager.service;

import com.sourabh.taskmanager.dto.TaskRequestDto;
import com.sourabh.taskmanager.dto.TaskResponseDto;

import java.util.List;

public interface TaskService {

    TaskResponseDto saveTask(TaskRequestDto taskRequestDto);

    void deleteTask(long id);

    TaskResponseDto findTaskById(long id);

    List<TaskResponseDto> findAllTasks();

    List<TaskResponseDto> findAllCompletedTasks();

    TaskResponseDto updateTask(long id, TaskRequestDto taskRequestDto);

    TaskResponseDto completeTask(long id);

    void clearCompletedTasks();
}