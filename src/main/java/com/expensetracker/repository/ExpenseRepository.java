package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByDate(LocalDate date);

    List<Expense> findByUserId(Long userId);

    void deleteByUserId(Long userId);

    @Query("SELECT e FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month AND e.userId = :userId")
    List<Expense> findByMonth(int year, int month, Long userId);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month AND e.userId = :userId")
    Double getMonthlyTotal(int year, int month, Long userId);
}