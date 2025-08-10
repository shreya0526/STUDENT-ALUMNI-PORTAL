package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.entities.College;

import com.example.demo.entities.SkillSet;
import com.example.demo.entities.Student;
import com.example.demo.entities.StudentDummyUpdate;
import com.example.demo.entities.StudentSkillSet;
import com.example.demo.entities.Studentdummy;
import com.example.demo.entities.User;
import com.example.demo.services.CollegeService;

import com.example.demo.services.SkillSetService;
import com.example.demo.services.StudentService;
import com.example.demo.services.StudentSkillSetService;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/student")
public class StudentController {
	@Autowired
	StudentSkillSetService studentskillsetservice;
	@Autowired
	StudentService studentservice;
	@Autowired
	CollegeService collegeservice;
	@Autowired
	SkillSetService skillsetservice;
	
	@Autowired
	UserService userservice;
	
	


	@GetMapping("/all")
	public List<Student> getall(){
		return studentservice.getAll();
	}
	
	@GetMapping("/getone")
	public Student getOne(@RequestParam("student_id") int student_id) {
		return studentservice.getOne(student_id);
	}

	@PostMapping("/register")
	public Student register(@RequestBody Studentdummy studentdummy) {

		
		
		College college =  collegeservice.getOne(studentdummy.getCollege_id());
		
		User user = userservice.getOne(studentdummy.getUser_id());
		Student student = new Student(user,college);
		Student savedStudent = studentservice.register(student);
		
		
		 List<Integer> skills = studentdummy.getSkillset();
	        for (int skillId : skills) {
	            SkillSet skill = skillsetservice.getOne(skillId);
	            StudentSkillSet studentSkillSet = new StudentSkillSet(savedStudent,skill);
	           
	            studentskillsetservice.register(studentSkillSet);
	        }
	        
	      
		
	return savedStudent;
		
	}
	
	@PostMapping("/update")
	public User updateDetails(@RequestBody StudentDummyUpdate stuupdate) {
		
		
		User user = userservice.getOne(stuupdate.getUser_id());
		
		 if (user == null) {
		        throw new RuntimeException("User not found with ID: " + stuupdate.getUser_id());
		    }
		 user.setUser_name(stuupdate.getUser_name());
		    user.setEmail(stuupdate.getEmail());
		    user.setPassword(stuupdate.getPassword());
		    user.setPhone_no(stuupdate.getPhone_no());

		  return   userservice.save(user); 
		    
		
	}
	
	@GetMapping("/userid/{user_id}")
    public Student getStudentByUserId(@PathVariable int user_id) {
        Student student = studentservice.getByUserId(user_id);
        
            return student;
        

}
}
