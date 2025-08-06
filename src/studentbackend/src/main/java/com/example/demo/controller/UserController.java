package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.User;
import com.example.demo.services.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	UserService userservice;

	@GetMapping("/getone")
public User getone(@RequestParam("user_id") int user_id){
	return userservice.getOne(user_id); 
}
	
}
