package net.javaguider.springboot.payload;

import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.model.Seller;
import net.javaguider.springboot.model.SubCategory;


public class ProductDto {
	
	private Long id;
	private String productName;
	private float price;
	private String description;
	private Integer stock;
	private String imgUrl;
	private CategoryDto category;
	private SubCategoryDto subCategory;
//	private Seller seller;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public float getPrice() {
		return price;
	}
	public void setPrice(float price) {
		this.price = price;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Integer getStock() {
		return stock;
	}
	public void setStock(Integer stock) {
		this.stock = stock;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public CategoryDto getCategory() {
		return category;
	}
	public void setCategory(CategoryDto category) {
		this.category = category;
	}
	public SubCategoryDto getSubCategory() {
		return subCategory;
	}
	public void setSubCategory(SubCategoryDto subCategory) {
		this.subCategory = subCategory;
	}
//	public Seller getSeller() {
//		return seller;
//	}
//	public void setSeller(Seller seller) {
//		this.seller = seller;
//	}
	public ProductDto(Long id, String productName, float price, String description, Integer stock, String imgUrl,
			CategoryDto category, SubCategoryDto subCategory) {
		super();
		this.id = id;
		this.productName = productName;
		this.price = price;
		this.description = description;
		this.stock = stock;
		this.imgUrl = imgUrl;
		this.category = category;
		this.subCategory = subCategory;
//		this.seller=seller;
	}
	public ProductDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
}
