package net.javaguider.springboot.model;

import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name="Cart")
public class Cart {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int CartId;
	 @OneToMany(mappedBy = "cart",cascade = CascadeType.ALL,orphanRemoval = true)
	 private Set<CartItem> items = new HashSet<>();
	@OneToOne
	private User user;

}
