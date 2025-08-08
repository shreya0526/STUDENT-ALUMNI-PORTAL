package com.example.demo.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entities.RegisterEvent;
import com.example.demo.entities.Student;
import com.example.demo.repository.RegisterEventRepository;

@Service
public class RegisterEventService {

	
	@Autowired
	RegisterEventRepository regevent;
	
	
	public List<RegisterEvent>  getAllregisterEvents(){
		return regevent.findAll();
	}
	
	public List<Student> getStudentsForEvent(int event_id) {
        return regevent.findStudentsByEventId(event_id);
    }
	
}
