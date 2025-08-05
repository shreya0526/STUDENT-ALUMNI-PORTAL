package com.example.demo.entities;

import java.util.List;

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
@Entity
@Table(name="student")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Student {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int student_id;

	
	@OneToOne(cascade = CascadeType.ALL)
	@JsonIgnoreProperties("student")
	@JoinColumn(name="user_id")
	User user;
	
	@JsonIgnoreProperties("student")
	@ManyToOne(cascade = CascadeType.ALL)
	 @JoinColumn(name="college_id")
	 College college;
	
	@JsonIgnoreProperties("student")
	@OneToMany(mappedBy="student" ,cascade = CascadeType.ALL)
	
	 List<StudentSkillSet> studentskillset;
	
	
	 
}
