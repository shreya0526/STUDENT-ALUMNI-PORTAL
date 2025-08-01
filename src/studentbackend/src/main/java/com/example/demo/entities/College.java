package com.example.demo.entities;

import jakarta.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="college")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class College {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int college_id;
	String college_name;
	
	@JsonIgnoreProperties("college")
	@OneToMany(mappedBy = "city",cascade = CascadeType.ALL)
	City city_id;
	

}
