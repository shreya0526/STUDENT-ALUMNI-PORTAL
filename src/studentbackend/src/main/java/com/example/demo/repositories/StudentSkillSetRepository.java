package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.StudentSkillSet;

import jakarta.transaction.Transactional;


@Repository
@Transactional
public interface StudentSkillSetRepository extends JpaRepository<StudentSkillSet, Integer> {

}
