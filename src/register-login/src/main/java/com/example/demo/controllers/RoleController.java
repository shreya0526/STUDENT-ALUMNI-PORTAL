package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.City;
import com.example.demo.entities.Role;
import com.example.demo.services.RoleService;

@RestController
public class RoleController {

	@Autowired
	RoleService roleservice;
	
	@GetMapping("/allrole/{role_id}")
	public Role getOne(@PathVariable("role_id") int role_id) {
		return roleservice.getOne(role_id);
	}
}
