package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Event;
import com.example.demo.entities.RegisterEvent;
import com.example.demo.entities.RegisterEventDummy;
import com.example.demo.entities.Student;
import com.example.demo.services.EventService;
import com.example.demo.services.RegisterEventService;
import com.example.demo.services.StudentService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/student/registerevent")
public class RegisterEventController {
	
	@Autowired
	RegisterEventService registereventservice;
	@Autowired
	StudentService studentservice;
	@Autowired
	EventService eventservice;
	
	@PostMapping("/save")
	public RegisterEvent save(@RequestBody RegisterEventDummy registereventdummy ) {
		Student student = studentservice.getOne(registereventdummy.getStudent_id());
		Event event = eventservice.getOne(registereventdummy.getEvent_id());
		RegisterEvent registerevent = new RegisterEvent(event,student);
		return registereventservice.save(registerevent);
	}
	
	@GetMapping("/registeredevents")
	public List<RegisterEvent>  getRegisteredStudent(@RequestParam("student_id")int student_id){
		return  registereventservice.getRegisteredStudent(student_id);
	}

		
	
}
