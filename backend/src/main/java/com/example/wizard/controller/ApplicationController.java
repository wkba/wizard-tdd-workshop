package com.example.wizard.controller;

import com.example.wizard.entity.Application;
import com.example.wizard.repository.ApplicationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/applications")
@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    private final ApplicationRepository repository;

    public ApplicationController(ApplicationRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody Application application) {
        if (application.getName() == null || application.getName().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "氏名は必須です"));
        }
        if (application.getEmail() == null || application.getEmail().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "メールアドレスは必須です"));
        }
        if (application.getPlan() == null || application.getPlan().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "プランは必須です"));
        }

        Application saved = repository.save(application);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }
}
