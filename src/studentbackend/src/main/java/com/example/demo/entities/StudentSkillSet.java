package com.example.demo.entities;

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
@Table(name="student_skillset")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentSkillSet {

	
	    int student_skill_set;
	
	 
	    @ManyToOne(cascade=CascadeType.ALL)
	    @JoinColumn(name = "student_id")
	     Student student;

	    @ManyToOne(cascade=CascadeType.ALL)
	    @JoinColumn(name = "skill_id")
	    SkillSet skillset;
	
	
}
