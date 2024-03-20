package net.javaguider.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguider.springboot.model.Seller;

public interface SellerRepository  extends JpaRepository<Seller,Long> {

}
