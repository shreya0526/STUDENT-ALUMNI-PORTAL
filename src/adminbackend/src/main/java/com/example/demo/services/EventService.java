package com.example.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.Event;
import com.example.demo.repository.EventRepository;



@Service
public class EventService {
	@Autowired
	EventRepository eventrepository;
	
	public List<Event> getall(){
		return eventrepository.findAll();
		
	}
	public Event getOne(int event_id) {
		Event event=null;
		Optional<Event> events= eventrepository.findById(event_id);
				try {
					event= events.get();
				} catch (Exception e) {
					event=null;
				}
				return event;
	}
	
	
}
