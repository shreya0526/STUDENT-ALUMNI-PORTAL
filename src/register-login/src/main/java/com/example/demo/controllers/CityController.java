package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.City;
import com.example.demo.services.CityService;


@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/city")
public class CityController {

	
	@Autowired
	CityService cityservice ;
	
	@GetMapping("/all")
	public List<City>  getAllCity(){
		return cityservice.getAllCity();
	}
	
	@GetMapping("/getOne")
	public City getOne(@RequestParam("city_id") int city_id) {
		return cityservice.getOne(city_id);
	}
	
	
}
