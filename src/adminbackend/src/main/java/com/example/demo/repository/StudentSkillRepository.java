package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.StudentSkillSet;

import jakarta.transaction.Transactional;

@Repository
public interface StudentSkillRepository extends JpaRepository<StudentSkillSet, Integer> {

	@Modifying
	 @Transactional
	@Query("DELETE FROM StudentSkillSet s WHERE s.student.student_id = :student_id")
	void deleteByStudentId(@Param("student_id") int student_id);
}
