package com.example.demo.services;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Student;
import com.example.demo.entities.User;
import com.example.demo.repository.StudentRepository;
import com.example.demo.repository.StudentSkillRepository;
import com.example.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class StudentService {
	@Autowired
	StudentRepository studentrepository;
	
	@Autowired
	StudentSkillRepository studentskillrepo;
	
	@Autowired
	UserRepository userrepository;
	
	public List<Student> getall(){
		return studentrepository.findAll();
	}
	@Transactional
	public void deleteStudentById(int studentId) {
	    Student student = studentrepository.findById(studentId)
	        .orElseThrow(() -> new RuntimeException("Student not found"));

	    studentrepository.delete(student); // will also delete user
	}







}
	 

