package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
	
	
    String college_Name;

  
    @JsonIgnoreProperties("collage")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="city_id")
	City city;
	
	
	
	

}
