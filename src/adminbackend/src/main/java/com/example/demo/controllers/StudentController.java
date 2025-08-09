package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Student;
import com.example.demo.services.StudentService;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin/student")
public class StudentController {

	@Autowired
	StudentService studentservice;
	
	@GetMapping("/all")
	public List<Student> getall(){
		return studentservice.getall();
	}
	

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable("id") int studentId) {
	    studentservice.deleteStudentById(studentId);
	    return ResponseEntity.ok("Student deleted successfully.");
	}

}
