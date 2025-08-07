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
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="alumni")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Alumni {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int alumni_id;
	
	
	@OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties("alumni")
	User user;
	
	
	@ManyToOne
	@JoinColumn(name="sector_id")
	@JsonIgnoreProperties("alumni")
	Sector sector;
	
	@ManyToOne
	@JoinColumn(name="work_id")
	@JsonIgnoreProperties("alumni")
	WorkTitle worktitle;
	
}
