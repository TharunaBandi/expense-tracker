package com.expensetracker.repository;

import com.expensetracker.model.Expense;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ExpenseRepository extends JpaRepository<Expense, Long> {

    List<Expense> findByDate(LocalDate date);

    @Query("SELECT e FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    List<Expense> findByMonth(int year, int month);

    @Query("SELECT SUM(e.amount) FROM Expense e WHERE YEAR(e.date) = :year AND MONTH(e.date) = :month")
    Double getMonthlyTotal(int year, int month);

}
