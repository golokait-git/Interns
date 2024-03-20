package net.javaguider.springboot.payload;

import java.util.HashSet;
import java.util.Set;
import lombok.Data;


@Data
public class CartDto {
	private int CartId;
	
	private Set<CartItemDto> items= new HashSet<>();
	
	private UserDto user;
}
