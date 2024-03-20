package net.javaguider.springboot.model;

import java.util.Date;
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
@Table(name="Orders")
public class Order {
	  @Id
	     @GeneratedValue(strategy = GenerationType.IDENTITY)
		private int orderId;
		private String orderStatus;
		private String paymentStatus;
		private Date orderDelivered;
		private double orderAmt;
		private String billingAddress;
		private Date orderCreateAt;
		@OneToOne
		private User user;
		@OneToMany(mappedBy = "order",cascade = CascadeType.ALL)
		private Set<OrderItem> orderItem=new HashSet<>();
		

}
