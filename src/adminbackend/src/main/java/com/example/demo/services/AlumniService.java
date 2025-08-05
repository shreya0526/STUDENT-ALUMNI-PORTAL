package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Alumni;
import com.example.demo.repository.AlumniRepository;
import com.example.demo.repository.StudentRepository;

@Service
public class AlumniService {

	@Autowired
	AlumniRepository alumnirepository;
	
	public List<Alumni> getall(){
		return alumnirepository.findAll();
	}
}
