package com.example.demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entities.Role;
import com.example.demo.services.RoleService;

@RestController
public class RoleController {

	@Autowired
	RoleService roleservice;
	
	@GetMapping("/getOne")
	public Role getOne(@RequestParam("role_id") int role_id) {
		return roleservice.getOne(role_id);
	}
}
