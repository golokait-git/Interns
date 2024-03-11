package com.brajsundar.server.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
public class CorsConfig {

    @Bean
    public CorsFilter corsFilter() {
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        CorsConfiguration config = new CorsConfiguration();	
        config.addAllowedOrigin("https://brajsundar.com");
        config.addAllowedOrigin("http://15.207.44.110:3000");
        config.addAllowedOrigin("http://localhost:5173");		
        config.addAllowedOrigin("http://localhost:3000");		
        config.addAllowedOrigin("https://admin.brajsundar.com.s3-website.ap-south-1.amazonaws.com");		
        config.addAllowedOrigin("http://www.brajsundar.com");		
        config.addAllowedOrigin("https://www.brajsundar.com");		
        config.addAllowedOrigin("http://admin.brajsundar.com.s3-website.ap-south-1.amazonaws.com");		
        config.addAllowedOrigin("http://brajsundar.com.s3-website.ap-south-1.amazonaws.com");
        config.addAllowedHeader("*"); // Allow all headers
        config.addAllowedMethod("*"); // Allow all HTTP methods (GET, POST, PUT, etc.)
        config.setAllowCredentials(true);
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }
}
