package com.example.demo;

import java.util.Arrays;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class ReouteHelper {
	
	@Bean 
	CorsWebFilter corsWebFilter() {
	    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    
	    config.setAllowCredentials(true);
	    config.setAllowedOriginPatterns(Arrays.asList("http://localhost:*")); // flexible for all localhost ports
 
	    config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	    config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
	    config.setExposedHeaders(Arrays.asList("Authorization")); // Expose headers if needed
	    
	    source.registerCorsConfiguration("/**", config);

	    return new CorsWebFilter(source);
	}

	
	@Bean
	public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
		return builder.routes()
				.route("studentbackend",r->r.path("/student/**")
						.uri("lb://studentbackend"))
					//.uri("http://localhost:8081"))
				.route("register-login",r->r.path("/registerlogin/**")
				    .uri("lb://register-login"))
				.route("adminbackend",r->r.path("/admin/**")
					    .uri("lb://adminbackend"))
						//.uri("http://localhost:8082"))
<<<<<<< HEAD
				.route("alumniService",r->r.path("/**")
					    .uri("lb://alumniService"))
=======
				.route("alumniService",r->r.path("/alumni/**")
					    //.uri("lb://alumniService"))
				.uri("http://localhost:5037"))
>>>>>>> 85febe0eb2915c94b1219d1f1d8a9367f8a61780

				.build();
		
	}

}
