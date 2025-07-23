package com.example.demo.entities;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="user")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int user_id;
	String User_name;
	String password;
	String email;
	String phone_no;
	String city_id;
	@JsonIgnoreProperties("user")
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="role_id")
	Role role;
	
	
	public User() {
		
	}


	public User(int user_id, String user_name, String password, String email, String phone_no, String city_id,
			Role role) {
		super();
		this.user_id = user_id;
		User_name = user_name;
		this.password = password;
		this.email = email;
		this.phone_no = phone_no;
		this.city_id = city_id;
		this.role = role;
	}


	public int getUser_id() {
		return user_id;
	}


	public void setUser_id(int user_id) {
		this.user_id = user_id;
	}


	public String getUser_name() {
		return User_name;
	}


	public void setUser_name(String user_name) {
		User_name = user_name;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone_no() {
		return phone_no;
	}


	public void setPhone_no(String phone_no) {
		this.phone_no = phone_no;
	}


	public String getCity_id() {
		return city_id;
	}


	public void setCity_id(String city_id) {
		this.city_id = city_id;
	}


	public Role getRole() {
		return role;
	}


	public void setRole(Role role) {
		this.role = role;
	}
	
	
	Role r = new Role();
	
	
	
	
}
