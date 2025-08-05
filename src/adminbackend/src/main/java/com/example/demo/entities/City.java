package com.example.demo.entities;

import java.util.Set;

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
@Table(name="city")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class City {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int city_id;
	
	String city_name;
	
	@JsonIgnoreProperties("city")
	@OneToMany(mappedBy="city",cascade=CascadeType.ALL)
	Set<User> users;
	
	
	@OneToMany(mappedBy="city",cascade= CascadeType.ALL )
	@JsonIgnoreProperties("city")
	Set<College> college;
}
