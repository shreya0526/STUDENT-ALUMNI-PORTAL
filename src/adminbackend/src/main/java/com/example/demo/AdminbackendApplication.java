package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

import jdk.jfr.Enabled;

@SpringBootApplication
@EnableDiscoveryClient
public class AdminbackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(AdminbackendApplication.class, args);
	}

}
