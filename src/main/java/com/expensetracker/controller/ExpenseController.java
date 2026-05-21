package com.expensetracker.controller;

import com.expensetracker.model.Expense;
import com.expensetracker.service.ExpenseService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
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
    public List<Expense> getAllExpenses() {
        return expenseService.getAllExpenses();
    }

    @GetMapping("/date")
    public List<Expense> getByDate(@RequestParam String date) {
        return expenseService.getExpensesByDate(LocalDate.parse(date));
    }

    @GetMapping("/month")
    public List<Expense> getByMonth(
            @RequestParam int year,
            @RequestParam int month) {
        return expenseService.getExpensesByMonth(year, month);
    }

    @GetMapping("/month/total")
    public Double getMonthlyTotal(
            @RequestParam int year,
            @RequestParam int month) {
        return expenseService.getMonthlyTotal(year, month);
    }

    @DeleteMapping("/{id}")
    public void deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);
    }
}