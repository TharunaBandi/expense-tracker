package com.expensetracker.service;

import com.expensetracker.model.Expense;
import com.expensetracker.repository.ExpenseRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ExpenseServiceImpl implements ExpenseService {

    private final ExpenseRepository expenseRepository;

    public ExpenseServiceImpl(ExpenseRepository expenseRepository) {
        this.expenseRepository = expenseRepository;
    }

    @Override
    public Expense addExpense(Expense expense) {
        return expenseRepository.save(expense);
    }

    @Override
    public List<Expense> getAllExpenses(Long userId) {
        return expenseRepository.findByUserId(userId);
    }

    @Override
    public List<Expense> getExpensesByDate(LocalDate date) {
        return expenseRepository.findByDate(date);
    }

    @Override
    public List<Expense> getExpensesByMonth(int year, int month, Long userId) {
        return expenseRepository.findByMonth(year, month, userId);
    }

    @Override
    public Double getMonthlyTotal(int year, int month, Long userId) {
        return expenseRepository.getMonthlyTotal(year, month, userId);
    }

    @Override
    public void deleteExpense(Long id) {
        expenseRepository.deleteById(id);
    }
}