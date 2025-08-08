package com.example.demo.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Student;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface StudentRepository extends JpaRepository<Student,Integer>{


    @Query("SELECT s FROM Student s WHERE s.user.user_id = :user_id")
    Student findStudentByUserId(@Param("user_id") Integer user_id);

}
