package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {
	@Autowired
	UserRepository userrepository;
	
	public List<User> getAll(){
		return userrepository.findAll();
	}
	public User register(User user) {
		return userrepository.save(user);
	}
	
	public User login(String email,String password) {
		return userrepository.loginCheck(email,password);
	}
	
	
}
