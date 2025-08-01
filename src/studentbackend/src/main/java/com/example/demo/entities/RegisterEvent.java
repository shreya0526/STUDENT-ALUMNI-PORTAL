package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
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

@Entity
@Table(name="register_event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class RegisterEvent {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int register_id;
	
	@ManyToOne
    @JoinColumn(name = "event_id", nullable = false)
    @JsonIgnoreProperties("registrations") // Ignore the 'registrations' list in Event
    private Event event;
	
	@ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    @JsonIgnoreProperties("registrations") // Ignore the 'registrations' list in Student
    private Student student;
	
	

}
