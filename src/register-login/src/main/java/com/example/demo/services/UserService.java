package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userrepository;
	
	@Autowired
	EmailService emailservice;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public List<User> getAll(){
		return userrepository.findAll();
	}


	public User register(User user) {
	    

	   
	    user.setPassword(passwordEncoder.encode(user.getPassword()));

	    User saveduser = userrepository.save(user);

	    if (saveduser != null) {
	        String subject = "Welcome to the Student Alumni Portal!";
	        String body = String.format(
	            "Hello %s,\n\nWelcome to our Student Alumni Portal. Your account has been successfully created.\n\nRegards,\nStudent Alumni Portal Team",
	            saveduser.getUser_name()
	        );
	        emailservice.sendEmail(saveduser.getEmail(), subject, body);
	    }

	    return saveduser;
	}
	
	public User login(String email,String password) {
		 User user = userrepository.findByEmail(email);
		    if (user != null && passwordEncoder.matches(password, user.getPassword())) {
		        return user;
		    }
		    return null;
	}
	
	
}
