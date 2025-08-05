package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.entities.SkillSet;

@Repository
public interface SkillSetRepository extends JpaRepository<SkillSet, Integer> {

}
