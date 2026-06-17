package com.sourabh.taskmanager.controller;

import com.sourabh.taskmanager.dto.TaskRequestDto;
import com.sourabh.taskmanager.dto.TaskResponseDto;
import com.sourabh.taskmanager.service.TaskService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskResponseDto> saveTask(
            @Valid @RequestBody TaskRequestDto taskRequestDto) {

        TaskResponseDto responseDto = taskService.saveTask(taskRequestDto);
        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<TaskResponseDto>> findAllTasks() {
        List<TaskResponseDto> responseDto = taskService.findAllTasks();
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskResponseDto> findTaskById(@PathVariable Long id) {
        TaskResponseDto responseDto = taskService.findTaskById(id);
        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskResponseDto> updateTask(
            @PathVariable Long id,
            @Valid @RequestBody TaskRequestDto taskRequestDto) {

        TaskResponseDto responseDto = taskService.updateTask(id, taskRequestDto);

        return new ResponseEntity<>(responseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}