package net.javaguider.springboot.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name="product")
public class Product {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	@Column(name="PRODUCT_NAME" ,nullable=false)
	private String productName;
	@Column(name="PRICE" ,nullable=false)
	private float price;
	@Column(name="description")
	private String description;
	@Column(name="stock")
	
	private Integer stock;
	
	@ManyToOne(fetch=FetchType.EAGER)
	@JoinColumn(name = "category_id")
	private Category category;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "subcategory_id")
	private SubCategory subCategory;

	private String imgUrl;
	
	@ManyToOne(cascade = CascadeType.ALL)
	private Seller seller;
	

//    @ManyToMany
//    @JoinTable(
//    	    name="user_product",
//    	    joinColumns={@JoinColumn(name="user_id")},
//    	    inverseJoinColumns={@JoinColumn(name="product_id")}
//    	)
//    private List<User> user;


}
