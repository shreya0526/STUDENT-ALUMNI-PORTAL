package com.example.demo.entities;

import java.sql.Time;
import java.util.Date;
import java.util.Timer;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Event {
	int event_id;
	String event_name;
	Date date;
	Timer time;
	String link;
	@JsonIgnoreProperties("Event")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="Alumni_id")
	Alumni alumni;
	String description;
}
