package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.College;
import com.example.demo.services.CollegeService;

@CrossOrigin(origins = "http://localhost:5173")

@RestController
@RequestMapping("/college")
public class CollegeController {

	@Autowired
	CollegeService collegeservice ;
	
	@GetMapping("/all")
	public List<College>  getAllCity(){
		return collegeservice.getallcollage();
	}
	
	@GetMapping("/getOne")
	public College getOne(@RequestParam("college_id") int college_id) {
		return collegeservice.getOne(college_id);
	}
}
