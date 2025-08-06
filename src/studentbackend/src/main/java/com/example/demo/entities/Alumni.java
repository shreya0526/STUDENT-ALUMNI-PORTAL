package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.annotation.Generated;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name="alumni")
public class Alumni {

	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	int alumni_id;
	
	 
	 @OneToOne(cascade=CascadeType.ALL)
	 @JoinColumn(name="user_id")
	 @JsonIgnoreProperties("alumni")
       User user;
    

	
	@JsonIgnoreProperties("alumni")
	@OneToMany(mappedBy="alumni",cascade=CascadeType.ALL)
	Set<Event> event;	
	
	
}
