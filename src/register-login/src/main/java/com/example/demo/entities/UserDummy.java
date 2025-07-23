package com.example.demo.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class UserDummy {

	int user_id;
	String User_name;
	String password;
	String email;
	String phone_no;
	int role_id;
	int city_id;
}
