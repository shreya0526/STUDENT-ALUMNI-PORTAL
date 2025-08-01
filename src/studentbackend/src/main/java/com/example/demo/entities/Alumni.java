package com.example.demo.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

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

@Entity
@Table(name="alumni")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Alumni {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
int alumni_id;
int Sector_id;
@OneToOne
@JoinColumn(name = "User_id",referencedColumnName = "user_id")
User user;
}
