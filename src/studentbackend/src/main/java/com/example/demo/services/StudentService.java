package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Student;

import com.example.demo.repositories.StudentRepository;


@Service
public class StudentService {

	@Autowired
	StudentRepository studentrepository;
	
	
	public List<Student> getAll(){
		return studentrepository.findAll();
	}
	
	public Student getOne(int student_id) {
		Student student=null;
		Optional<Student> students= studentrepository.findById(student_id);
				try {
					student= students.get();
				} catch (Exception e) {
					student=null;
				}
				return student;
	}
	public Student register(Student student) {
		return studentrepository.save(student);
	}
	
	
}
