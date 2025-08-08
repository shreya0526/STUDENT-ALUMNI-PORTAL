package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.entities.College;
import com.example.demo.entities.CollegeDummy;
import com.example.demo.repository.CityRepository;
import com.example.demo.repository.CollegeRepository;

@Service
public class CollegeService {

	
	@Autowired
	CollegeRepository collegerepository;
	
	@Autowired
	CityRepository cityrepository;
	
	@Autowired
	CityService cityservice;
	
	public List<College> getAllCollege(){
		return collegerepository.findAll();
	}
	
	 public College addCollege(College college) {
	       
	        return collegerepository.save(college);
	    }
	 
	 public College addCollege(CollegeDummy dummy) {
	        City city = cityservice.getOne(dummy.getCity_id());

	        if (city == null) {
	            throw new RuntimeException("City not found with ID: " + dummy.getCity_id());
	        }

	        College college = new College();
	        college.setCollege_name(dummy.getCollege_name());
	        college.setCity(city); // important!

	        return collegerepository.save(college);
	    }
	}

