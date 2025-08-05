package com.example.demo.entities;

import java.util.List;

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
public class Studentdummy {


	int user_id;
	int city_id;
	int college_id;
	List<Integer> skillset;
	
}
