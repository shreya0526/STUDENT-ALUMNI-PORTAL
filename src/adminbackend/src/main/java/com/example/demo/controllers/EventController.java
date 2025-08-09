package com.example.demo.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import com.example.demo.entities.Event;
import com.example.demo.services.EventService;

//@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/admin/event")
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
	
	 @DeleteMapping("/delete/{event_id}")
	    public ResponseEntity<String> deleteEvent(@PathVariable("event_id") int event_id) {
	        try {
	            eventservice.deleteEventById(event_id);
	            return ResponseEntity.ok("Event deleted successfully.");
	        } catch (Exception e) {
	            return ResponseEntity.status(404).body("Event not found.");
	        }
	    }
}
