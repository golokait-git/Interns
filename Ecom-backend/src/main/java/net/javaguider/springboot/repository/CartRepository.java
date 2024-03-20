package net.javaguider.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguider.springboot.model.Cart;
import net.javaguider.springboot.model.User;

public interface CartRepository extends JpaRepository<Cart,Integer> {
	public Optional<Cart>findByUser(User user);
//public Optional<Cart>  findbyuserandcartid(int cartId);
}
