package com.example.demo.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.entities.Role;
import com.example.demo.repositories.RoleRepository;

@Service
public class RoleService {
  
	@Autowired
	RoleRepository rolerepository;
	
	
	public Role getOne(int role_id) {
		Role role=null;
		Optional<Role> roles= rolerepository.findById(role_id);
				try {
					role= roles.get();
				} catch (Exception e) {
					role=null;
				}
				return role;
	}
	
}
