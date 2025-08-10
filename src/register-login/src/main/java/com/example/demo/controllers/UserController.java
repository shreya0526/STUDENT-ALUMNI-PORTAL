package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.City;
import com.example.demo.entities.Role;
import com.example.demo.entities.User;
import com.example.demo.entities.UserDummy;
import com.example.demo.services.CityService;
import com.example.demo.services.RoleService;
import com.example.demo.services.UserService;


//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/registerlogin/user")
public class UserController {
	@Autowired
	UserService user_serv;
	
	@Autowired
	RoleService role_serv;
	
	@Autowired
	CityService city_serv;
	
	@GetMapping("/all")
	public List<User> getall(){
		return user_serv.getAll();
	}

	
	@PostMapping("/register")
	public User register(@RequestBody UserDummy userdummy) {

		Role role=role_serv.getOne(userdummy.getRole_id());
		City city=city_serv.getOne(userdummy.getCity_id());
		User user=new User(userdummy.getUser_name(), userdummy.getPassword(),userdummy.getEmail(),userdummy.getPhone_no(),role,city);
		return user_serv.register(user);	
		
	}
	
	@PostMapping("/login")
	public User loginCheck(@RequestBody User user ) {
		return user_serv.login(user.getEmail(), user.getPassword());
	}
	
	 
	}
	
	
	

