package com.example.demo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.Event;

@Repository
public interface EventRepository extends JpaRepository<Event, Integer> {


    @Query("""
        SELECT e FROM Event e
        WHERE e.alumni.alumni_id IN (
            SELECT ac.alumni.alumni_id
            FROM AlumniCollege ac
            WHERE ac.college.college_id = :college_id
        )
    """)
    List<Event> findEventsByCollegeId(@Param("college_id") int college_id);
}