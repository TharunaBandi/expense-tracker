package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/expenses")
@CrossOrigin
public class ExpenseController {

    private final ExpenseService expenseService;

    public ExpenseController(ExpenseService expenseService) {
        this.expenseService = expenseService;
    }

    @PostMapping
    public Expense addExpense(@RequestBody Expense expense) {
        return expenseService.addExpense(expense);
    }

    @GetMapping
    public List<Expense> getAllExpenses(@RequestParam Long userId) {
        return expenseService.getAllExpenses(userId);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }

    @GetMapping("/month")
    public List<Expense> getByMonth(
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam Long userId) {
        return expenseService.getExpensesByMonth(year, month, userId);
    }

    @GetMapping("/month/total")
    public Double getMonthlyTotal(
            @RequestParam int year,
            @RequestParam int month,
            @RequestParam Long userId) {
        return expenseService.getMonthlyTotal(year, month, userId);
    }
}