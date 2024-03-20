package net.javaguider.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;


import net.javaguider.springboot.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem,Integer> {

}
