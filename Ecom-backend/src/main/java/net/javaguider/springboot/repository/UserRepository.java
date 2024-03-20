package net.javaguider.springboot.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import net.javaguider.springboot.model.User;

public interface UserRepository extends JpaRepository<User,Integer>{
	User findByuserId(int userId);
	public User findByEmail(String email);
}
