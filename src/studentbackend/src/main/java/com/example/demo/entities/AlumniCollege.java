package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="alumni_college")
public class AlumniCollege {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int alumni_college_id;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="college_id")
	College college;
	
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name="alumni_id")
	Alumni alumni;
}

