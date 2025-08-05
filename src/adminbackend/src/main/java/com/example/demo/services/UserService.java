package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo.entities.User;
import com.example.demo.repository.UserRepository;

@Service
public class UserService {
@Autowired
UserRepository userrpository;

public List<User> getall(){
	return userrpository.findAll();
}
public User getOne(int user_id) {
	User user=null;
	Optional<User> users= userrpository.findById(user_id);
			try {
				user= users.get();
			} catch (Exception e) {
				user=null;
			}
			return user;
}

}
