package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.RegisterEvent;
import com.example.demo.entities.Student;

import jakarta.transaction.Transactional;

@Repository
@Transactional
public interface RegisterEventRepository extends JpaRepository<RegisterEvent, Integer>{
	
	@Query("SELECT r FROM RegisterEvent r WHERE r.student.student_id = :student_id")
	  List<RegisterEvent> findRegisterdEvents( int student_id);
	
}
