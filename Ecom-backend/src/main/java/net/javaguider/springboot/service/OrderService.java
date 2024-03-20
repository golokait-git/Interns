package net.javaguider.springboot.service;

import java.util.Optional;
import java.util.Set;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguider.springboot.model.Cart;
import net.javaguider.springboot.model.CartItem;
import net.javaguider.springboot.model.Order;
import net.javaguider.springboot.model.OrderItem;
import net.javaguider.springboot.model.User;
import net.javaguider.springboot.payload.OrderDto;
import net.javaguider.springboot.payload.OrderRequest;
import net.javaguider.springboot.repository.CartRepository;
import net.javaguider.springboot.repository.UserRepository;

@Service
public class OrderService {
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private CartRepository cartRepo;
	
	public OrderDto ordercreate(OrderRequest request,String username) {
		
		User user = this.userRepo.findByEmail(username);
		
		int cartId= request.getCartid();
		String orderAddress=request.getOrderAddress();
	          Cart cart =this.cartRepo.findById(cartId);
		Set<CartItem>  items =cart.getItems();
		Order order = new Order();
		
		items.stream().map((cartItem)->{
			
			OrderItem orderitem= new OrderItem();
			orderitem.setProduct(cartItem.setProduct());
			orderitem.setProductQuntity(cartItem.setQuantity());
			orderitem.setProductQuntity(cartItem.setTotalprice(cartId));
			orderitem.setOrder(order);
			
			int a=10;
			
			
		});
		
		return null;
	}


