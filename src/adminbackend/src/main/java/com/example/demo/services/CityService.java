package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.City;
import com.example.demo.entities.User;
import com.example.demo.repository.CityRepository;

@Service
public class CityService {

	@Autowired
	CityRepository cityrepository;
	
	public List<City> getAllCity(){
		return cityrepository.findAll();
	}
	
	
	public City getOne(int city_id) {
		City city=null;
		Optional<City> cities = cityrepository.findById(city_id);
				try {
					city= cities.get();
				} catch (Exception e) {
					city=null;
				}
				return city;
}
}
