package com.brajsundar.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
//import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
//import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
//@ComponentScan("com.brajsundar.server.Service.Article")
public class ServerApplication extends SpringBootServletInitializer{

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
		
	}

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
		// TODO Auto-generated method stub
		return builder.sources(ServerApplication.class);
	}
		
}
