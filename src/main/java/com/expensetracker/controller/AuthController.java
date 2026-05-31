package com.expensetracker.controller;

import com.expensetracker.model.User;
import com.expensetracker.repository.ExpenseRepository;
import com.expensetracker.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    private final UserRepository userRepository;
    private final ExpenseRepository expenseRepository;

    public AuthController(UserRepository userRepository, ExpenseRepository expenseRepository) {
        this.userRepository = userRepository;
        this.expenseRepository = expenseRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
        User saved = userRepository.save(user);
        return ResponseEntity.ok(Map.of("id", saved.getId(), "username", saved.getUsername()));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        Optional<User> found = userRepository.findByUsername(user.getUsername());
        if (found.isEmpty() || !found.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.status(401).body("Invalid username or password");
        }
        User u = found.get();
        return ResponseEntity.ok(Map.of("id", u.getId(), "username", u.getUsername()));
    }

    @DeleteMapping("/delete/{userId}")
    @Transactional
    public ResponseEntity<?> deleteAccount(@PathVariable Long userId) {
        expenseRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
        return ResponseEntity.ok("Account deleted successfully");
    }
}