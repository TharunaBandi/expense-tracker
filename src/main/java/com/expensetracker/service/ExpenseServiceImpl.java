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
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    @Override
    public List<Expense> getExpensesByDate(LocalDate date) {
        return expenseRepository.findByDate(date);
    }

    @Override
    public List<Expense> getExpensesByMonth(int year, int month) {
        return expenseRepository.findAll();
    }

    @Override
    public Double getMonthlyTotal(int year, int month) {
        List<Expense> expenses = expenseRepository.findAll();

        double total = 0;

        for (Expense expense : expenses) {
            if (expense.getDate().getYear() == year &&
                    expense.getDate().getMonthValue() == month) {

                total += expense.getAmount();
            }
        }

        return total;
    }
}