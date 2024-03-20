package net.javaguider.springboot.payload;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;
import net.javaguider.springboot.model.Order;
import net.javaguider.springboot.model.Product;

public class OrderItemDto {

	
	private int orderItemid;

	private  ProductDto product;
	private double totalproductprice;
	private int produtQuntity;

	private OrderDto order;

	public int getOrderItemid() {
		return orderItemid;
	}

	public void setOrderItemid(int orderItemid) {
		this.orderItemid = orderItemid;
	}

	public ProductDto getProduct() {
		return product;
	}

	public void setProduct(ProductDto product) {
		this.product = product;
	}

	public double getTotalproductprice() {
		return totalproductprice;
	}

	public void setTotalproductprice(double totalproductprice) {
		this.totalproductprice = totalproductprice;
	}

	public int getProdutQuntity() {
		return produtQuntity;
	}

	public void setProdutQuntity(int produtQuntity) {
		this.produtQuntity = produtQuntity;
	}

	public OrderDto getOrder() {
		return order;
	}

	public void setOrder(OrderDto order) {
		this.order = order;
	}

	public OrderItemDto(int orderItemid, ProductDto product, double totalproductprice, int produtQuntity,
			OrderDto order) {
		super();
		this.orderItemid = orderItemid;
		this.product = product;
		this.totalproductprice = totalproductprice;
		this.produtQuntity = produtQuntity;
		this.order = order;
	}

	public OrderItemDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
