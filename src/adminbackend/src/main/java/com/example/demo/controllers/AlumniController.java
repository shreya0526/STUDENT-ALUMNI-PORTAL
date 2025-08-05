package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Alumni;
import com.example.demo.services.AlumniService;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/alumni")
public class AlumniController {
	
	@Autowired
	AlumniService alumniservice;
	
	@GetMapping("/all")
	public List<Alumni> getall(){
		return alumniservice.getall();
	}

}
