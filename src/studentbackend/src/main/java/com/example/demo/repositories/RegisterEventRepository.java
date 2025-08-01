package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entities.RegisterEvent;

public interface RegisterEventRepository extends JpaRepository<RegisterEvent, Integer>{

}
