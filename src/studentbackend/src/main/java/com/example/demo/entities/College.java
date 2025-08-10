package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="college")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class College {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int college_id;
	
	
    String college_Name;

  
    @JsonIgnoreProperties("college")
	@ManyToOne
	@JoinColumn(name="city_id")
	City city;
    
    @JsonManagedReference
    @OneToMany(mappedBy="college")
    Set<AlumniCollege> alumnicollege;

    
	
	
	
	

}
