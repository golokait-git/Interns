package net.javaguider.springboot.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
@Data
@Entity
@Table(name="seller")

public class Seller {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer sellerId;

	@Column(name="first_name")
	@NotNull(message="Please enter the first name")
	private String firstName;
	@Column(name="last_name")
	private String lastName;
	@Column(name="password")
	private String password;
	@Column(name="mobile_no")
	private String mobile;
	@Email
	@Column(name="email" ,unique = true)
	private String emailId;
	@Column(name="gender")
	private String gender;
	@OneToMany
	
	private List<Product> product;

}
