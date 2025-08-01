package com.example.demo.entities;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="skillset")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SkillSet {

	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int skill_id;
	
	String skill_name;
	
	@OneToMany(mappedBy = "skillset", cascade = CascadeType.ALL)
    Set<StudentSkillSet> studentSkillSets;
}
