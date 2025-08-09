package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.RegisterEvent;
import com.example.demo.entities.Student;
import com.example.demo.services.RegisterEventService;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("admin/registerevent")
public class RegisterEventController {
	
	@Autowired
	RegisterEventService regservice;
	
	
	@GetMapping("/all")
	public List<RegisterEvent> getAllRegisteredEvents(){
		return regservice.getAllregisterEvents();
	}
	
	 @GetMapping("/registerstudent/{event_id}")
	    public ResponseEntity<List<Student>> getRegisteredStudents(@PathVariable int event_id) {
	        List<Student> students = regservice.getStudentsForEvent(event_id);
	        return ResponseEntity.ok(students);
	    }

}
