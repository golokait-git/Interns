package net.javaguider.springboot.repository;



import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.model.Product;



public interface CategoryRepository extends JpaRepository<Category  ,Integer> {

}
