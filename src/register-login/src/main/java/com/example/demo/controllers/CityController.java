package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.City;
import com.example.demo.services.CityService;

@RestController
public class CityController {

	
	@Autowired
	CityService cityservice ;
	
	@GetMapping("/allcity")
	public List<City>  getAllCity(){
		return cityservice.getAllCity();
	}
	
	
	
}
