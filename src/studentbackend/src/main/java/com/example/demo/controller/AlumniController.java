package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.Alumni;
import com.example.demo.services.AlumniService;

@RestController
@RequestMapping("/alumni")
public class AlumniController {

	
	@Autowired
	AlumniService alumniservice;
	
	
	@GetMapping("/all")
	public List<Alumni> getAllAlumni(){
		return alumniservice.getAllAlumni();
	}
}
