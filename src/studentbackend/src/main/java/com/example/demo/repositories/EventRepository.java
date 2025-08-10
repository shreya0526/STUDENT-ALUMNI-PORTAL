package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {

	
	@Query("SELECT e FROM Event e " +
		       "JOIN e.alumni a " +
		       "JOIN a.alumnicollege ac " +
		       "JOIN ac.college c " +
		       "JOIN Student s ON s.college = c " +
		       "WHERE s.student_id = :student_id")
		List<Event> findEventsByStudentCollege(@Param("student_id") Integer student_id);
}
