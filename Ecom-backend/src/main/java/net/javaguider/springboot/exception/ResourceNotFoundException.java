package net.javaguider.springboot.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;



	public class ResourceNotFoundException extends RuntimeException {
		
		public ResourceNotFoundException() {
			super();
		}
		
	public ResourceNotFoundException(String message) {
			super(message);
		}
}
