package com.example.demo.entities;

import jakarta.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.CascadeType;
<<<<<<< HEAD
=======
import jakarta.persistence.Column;
>>>>>>> 9c69e0ffee538c1afd4e95c78385d704174721d1
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
<<<<<<< HEAD
import jakarta.persistence.ManyToOne;
=======
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
>>>>>>> 9c69e0ffee538c1afd4e95c78385d704174721d1
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="college")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class College {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int college_id;
	
	@Column(name = "college_name", nullable = false)
    private String collegeName;

    // Foreign key to City table
    @ManyToOne
    @JoinColumn(name = "city_id", nullable = false)
    @JsonIgnoreProperties("colleges") // Prevent infinite recursion
    private City city;
	
	
	
	

}
