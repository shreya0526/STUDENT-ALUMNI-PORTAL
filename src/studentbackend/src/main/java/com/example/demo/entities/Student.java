package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Entity
@Table(name="student")
public class Student {
     
	 @Id
	 @GeneratedValue(strategy=GenerationType.IDENTITY)
	 int student_id;
	 
     int user_id;
	 
	 @JsonIgnoreProperties("student")
	 @ManyToOne(cascade=CascadeType.ALL)
	 @JoinColumn(name="college_id")
	 College college;

	public Student(int user_id, College college) {
		super();
		this.user_id = user_id;
		this.college = college;
	}
	 
	 
	 
}
