package com.example.demo.entities;

import jakarta.persistence.CascadeType;
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


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="register_event")
public class RegisterEvent {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int register_id;
	
	
	int event_id;
	
	
	@ManyToOne
	@JoinColumn(name="student_id")
	Student student;
	
	
}
