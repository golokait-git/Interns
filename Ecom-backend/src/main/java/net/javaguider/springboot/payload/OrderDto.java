package net.javaguider.springboot.payload;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import lombok.Data;
@Data
public class OrderDto {

	private int orderId;
	private String orderStatus;
	private String paymentStatus;
	private Date orderDelivered;
	private double orderAmt;
	private String billingAddress;
	
	private UserDto user;
	
	private Set<OrderItemDto> orderItem=new HashSet<>();

	
	
	
}
