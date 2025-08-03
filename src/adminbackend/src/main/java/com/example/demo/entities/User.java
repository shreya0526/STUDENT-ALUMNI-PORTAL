package com.example.demo.entities;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="user")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int user_id;
	String User_name;
	String password;
	String email;
	String phone_no;
	int role_id;
	
	
	@OneToOne(mappedBy="user",cascade=CascadeType.ALL)
	@JsonIgnoreProperties("user")
	Student student;
	
	@JsonIgnoreProperties("user")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="city_id")
	City city;
	
	@OneToOne(mappedBy="user" , cascade = CascadeType.ALL)
	@JsonIgnoreProperties("user")
	Alumni alumni;
	

	public User(String user_name, String password, String email, String phone_no, int  role_id, City city) {
		super();
		User_name = user_name;
		this.password = password;
		this.email = email;
		this.phone_no = phone_no;
	    this.role_id = role_id;
		this.city = city;
	}
	
	
	
	
}

