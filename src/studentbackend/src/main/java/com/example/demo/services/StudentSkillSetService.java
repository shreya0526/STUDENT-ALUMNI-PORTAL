package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.StudentSkillSet;

import com.example.demo.repositories.StudentSkillSetRepository;


@Service
public class StudentSkillSetService {
	
	@Autowired
	StudentSkillSetRepository studentskillsetrepository;
	
	public List<StudentSkillSet> GetallStudentskill(){
		return studentskillsetrepository.findAll();
		}
	public StudentSkillSet register(StudentSkillSet studentskillset) {
		return studentskillsetrepository.save(studentskillset);
	}
}
