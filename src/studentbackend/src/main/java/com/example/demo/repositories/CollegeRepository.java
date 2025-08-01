package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.College;

public interface CollegeRepository extends JpaRepository<College, Integer> {

}
