package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.demo.entities.SkillSet;
import com.example.demo.repositories.SkillSetRepository;

@Service
public class SkillSetService {
	@Autowired
	SkillSetRepository skillsetrepository;
	
	public List<SkillSet> getallSkill(){
		return skillsetrepository.findAll();
		}
	public SkillSet getOne(int skill_id) {
		SkillSet skillset=null;
		Optional<SkillSet> skillsets= skillsetrepository.findById(skill_id);
				try {
					skillset= skillsets.get();
				} catch (Exception e) {
					skillset=null;
				}
				return skillset;
	}
}
