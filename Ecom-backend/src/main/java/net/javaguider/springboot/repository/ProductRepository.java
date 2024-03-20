package net.javaguider.springboot.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.model.Product;

public interface ProductRepository extends JpaRepository<Product ,Long> {
	List<Product> findByCategory(Category category);
	 Product getProductById(Integer userId);
}
