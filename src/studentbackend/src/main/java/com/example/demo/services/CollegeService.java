package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo.entities.College;
import com.example.demo.repositories.CollegeRepository;

@Service
public class CollegeService {

	@Autowired
	CollegeRepository collegerepository;
	
	public List<College> getallcollage(){
		return collegerepository.findAll();
	}
	public College getOne(int college_id) {
		College college=null;
		Optional<College> collegs= collegerepository.findById(college_id);
				try {
					college= collegs.get();
				} catch (Exception e) {
					college=null;
				}
				return college;
	}
}
