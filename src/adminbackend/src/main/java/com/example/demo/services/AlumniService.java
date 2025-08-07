package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Alumni;
import com.example.demo.entities.Student;
import com.example.demo.repository.AlumniRepository;
import com.example.demo.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
public class AlumniService {

	@Autowired
	AlumniRepository alumnirepository;
	
	public List<Alumni> getall(){
		return alumnirepository.findAll();
	}
	
	@Transactional
	public void deleteStudentById(int alumni_id) {
	    Alumni alumni= alumnirepository.findById(alumni_id)
	        .orElseThrow(() -> new RuntimeException("Alumni not found"));

	    alumnirepository.delete(alumni); // will also delete user
	}
}
