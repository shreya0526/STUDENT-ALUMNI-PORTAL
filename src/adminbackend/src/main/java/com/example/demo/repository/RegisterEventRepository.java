package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.RegisterEvent;
import com.example.demo.entities.Student;

@Repository
public interface RegisterEventRepository extends JpaRepository<RegisterEvent, Integer> {

	
	
    @Query("SELECT r.student FROM RegisterEvent r WHERE r.event_id = :eventId")
    List<Student> findStudentsByEventId(@Param("eventId") int event_id);
}
