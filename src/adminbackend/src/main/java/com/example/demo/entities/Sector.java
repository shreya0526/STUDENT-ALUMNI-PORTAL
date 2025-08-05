package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

public class Sector {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int sector_id;
	
	
	String sector_name;
	
	@OneToMany(mappedBy="sector" ,cascade=CascadeType.ALL)
	@JsonIgnoreProperties("sector")
	Set<Alumni> alumni;
	
	
}
