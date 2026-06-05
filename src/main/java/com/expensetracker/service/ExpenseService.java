package com.expensetracker.service;

import com.expensetracker.model.Expense;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {
    Expense addExpense(Expense expense);
    Expense updateExpense(Expense expense);
    List<Expense> getAllExpenses(Long userId);
    List<Expense> getExpensesByDate(LocalDate date);
    List<Expense> getExpensesByMonth(int year, int month, Long userId);
    Double getMonthlyTotal(int year, int month, Long userId);
    void deleteExpense(Long id);
}