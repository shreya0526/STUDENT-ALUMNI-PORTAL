package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.entities.SkillSet;
import com.example.demo.services.SkillSetService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/skillset")
public class SkillSetController {
	@Autowired
	SkillSetService skillsetservice ;
	
	@GetMapping("/all")
	public List<SkillSet>  getAllCity(){
		return skillsetservice.getallSkill();
	}
	
	@GetMapping("/getOne")
	public SkillSet getOne(@RequestParam("skill_id") int skill_id) {
		return skillsetservice.getOne(skill_id);
	}

}
