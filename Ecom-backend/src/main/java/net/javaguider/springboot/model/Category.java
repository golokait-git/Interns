package net.javaguider.springboot.model;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
@Table(name="category")
public class Category {
      @Id
      @GeneratedValue(strategy=GenerationType.IDENTITY)
	 private Integer categoryId;
      
      
      @OneToMany(mappedBy="category", fetch=FetchType.LAZY, cascade=CascadeType.ALL)
      @Column(name="subcat_id")
      private Set<SubCategory> subCategory;
 
	private String title;
	@Column(name="subcat_Id")
	
	
	@OneToMany(mappedBy="category",fetch=FetchType.LAZY,cascade=CascadeType.ALL)
	private Set<Product> product;
	

}
