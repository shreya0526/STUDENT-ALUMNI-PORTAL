package com.example.demo.entities;

import java.util.Date;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

@Entity
@Table(name="event")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int event_id;
	String event_name;
	Date date;
	String time;
	String link;
	String description;
	
	
	@ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "alumni_id")
    @JsonIgnoreProperties("event")
       Alumni alumni;
}
