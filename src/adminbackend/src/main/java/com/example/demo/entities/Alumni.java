package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="alumni")
public class Alumni {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int alumni_id;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnoreProperties("alumni")
	@JoinColumn(name="user_id")
	User user;
	
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="sector_id")
	@JsonIgnoreProperties("alumni")
	Sector sector;
	
}
