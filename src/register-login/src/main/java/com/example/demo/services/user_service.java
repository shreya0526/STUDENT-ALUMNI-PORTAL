package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.user_repository;

@Service
public class user_service {
	@Autowired
	user_repository userrepository;
	
	public List<User> getAll(){
		return userrepository.findAll();
	}
	public User save(User user) {
		return userrepository.save(user);
	}
	
		
}
