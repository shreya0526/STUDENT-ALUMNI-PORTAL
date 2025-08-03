package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

public class Student {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int student_id;

	
	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnoreProperties("student")
	@JoinColumn(name="user_id")
	User user;
	
	 @ManyToOne(cascade = CascadeType.ALL)
	 @JoinColumn(name="college_id")
	 College college;
	 
}
