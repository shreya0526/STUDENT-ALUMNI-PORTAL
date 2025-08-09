package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.College;
import com.example.demo.entities.CollegeDummy;
import com.example.demo.services.CollegeService;


//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin/college")
public class CollegeController {

	
	@Autowired
	CollegeService collegeservice;
	
	
	
	@GetMapping("/all")
	public List<College> getAllCollege(){
		return collegeservice.getAllCollege();
	}
	
	 @PostMapping("/save")
	    public College saveCollege(@RequestBody CollegeDummy dummy) {
	        College savedCollege = collegeservice.addCollege(dummy);
	        return collegeservice.addCollege(savedCollege);
	    }
}
