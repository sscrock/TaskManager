package com.sourabh.taskmanager.service;

import com.sourabh.taskmanager.dto.TaskRequestDto;
import com.sourabh.taskmanager.dto.TaskResponseDto;
import com.sourabh.taskmanager.entity.Task;
import com.sourabh.taskmanager.mapper.TaskMapper;
import com.sourabh.taskmanager.repository.TaskRepository;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;
    private final TaskMapper taskMapper;

    @Override
    public TaskResponseDto saveTask(TaskRequestDto taskRequestDto) {

        Task savedTask = taskRepository.save(
                taskMapper.toEntity(taskRequestDto)
        );

        return taskMapper.toResponseDto(savedTask);
    }

    @Override
    public void deleteTask(long id) {
        taskRepository.deleteById(id);
    }

    @Override
    public TaskResponseDto findTaskById(long id) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        return taskMapper.toResponseDto(task);
    }

    @Override
    public List<TaskResponseDto> findAllTasks() {

        List<Task> tasks = taskRepository.findAll();

        return tasks.stream()
                .map(taskMapper::toResponseDto)
                .toList();
    }

    @Override
    public List<TaskResponseDto> findAllCompletedTasks() {
        List<Task> completedTasks=taskRepository.findByCompleted(true);
        return completedTasks.stream()
                .map(taskMapper::toResponseDto)
                .toList();
    }

    @Override
    public TaskResponseDto updateTask(long id, TaskRequestDto taskRequestDto) {

        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        task.setTitle(taskRequestDto.getTitle());
        task.setDescription(taskRequestDto.getDescription());

        Task updatedTask = taskRepository.save(task);

        return taskMapper.toResponseDto(updatedTask);
    }
}