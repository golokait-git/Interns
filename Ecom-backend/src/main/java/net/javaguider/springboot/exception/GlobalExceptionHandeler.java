package net.javaguider.springboot.exception;

import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
@RestControllerAdvice
public class GlobalExceptionHandeler {
	
	/*if id not found in service Controller then 
	orElseThrow method throw here i will give response*/
	@ExceptionHandler(ResourceNotFoundException.class)
	public String HandelResourcerNotFoundException(ResourceNotFoundException ex) {
		
		
		return ex.getMessage();
	}

}
