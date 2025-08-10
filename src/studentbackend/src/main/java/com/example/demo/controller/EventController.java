package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.entities.Event;
import com.example.demo.services.EventService;
//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/student/event")
public class EventController {
	@Autowired
	EventService eventservice;
	
	@GetMapping("/all")
	public List<Event> getall(){
		return eventservice.getall();	
		}
	@GetMapping("/getone")
	public Event getOne(@RequestParam("event_id") int event_id) {
		return eventservice.getOne(event_id);
	}
	
	

    @GetMapping("/{college_id}")
    public List<Event> getEventsByCollege(@PathVariable int college_id) {
        List<Event> events = eventservice.getEventsByCollege(college_id);
        return events;
    }
}
