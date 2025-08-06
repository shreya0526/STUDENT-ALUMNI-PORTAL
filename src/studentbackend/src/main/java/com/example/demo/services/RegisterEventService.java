package com.example.demo.services;



import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.RegisterEvent;

import com.example.demo.repositories.RegisterEventRepository;

@Service
public class RegisterEventService {
	@Autowired
	RegisterEventRepository registereventrepository;
	
	public RegisterEvent save(RegisterEvent registerevent) {
		return registereventrepository.save(registerevent);
	}
	 
	public List<RegisterEvent>  getRegisteredStudent(int studenta_id){
		return  registereventrepository.findRegisterdEvents(studenta_id);
	}
}
