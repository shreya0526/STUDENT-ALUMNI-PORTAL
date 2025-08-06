package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Student;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

	
	@Autowired
	UserRepository userrepository;
	
	public User getOne(int user_id) {
		User user=null;
		Optional<User> users= userrepository.findById(user_id);
				try {
					user= users.get();
				} catch (Exception e) {
					user=null;
				}
				
				return user;
	}
	
	public User save(User user) {
		return userrepository.save(user);
	}
}
