package com.expensetracker.service;

import com.expensetracker.model.Expense;
import java.time.LocalDate;
import java.util.List;

public interface ExpenseService {

    Expense addExpense(Expense expense);

    List<Expense> getAllExpenses();

    List<Expense> getExpensesByDate(LocalDate date);

    List<Expense> getExpensesByMonth(int year, int month);

    Double getMonthlyTotal(int year, int month);

    void deleteExpense(Long id);
}