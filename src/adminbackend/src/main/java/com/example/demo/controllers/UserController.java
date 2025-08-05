package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userservice;
	
	@GetMapping("/all")
	public List<User> getall(){
		return userservice.getall();
	}
	@GetMapping("/getone")
	public User getone(@RequestParam("user_id")int user_id) {
		return userservice.getOne(user_id);
	}
	
}
