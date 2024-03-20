package net.javaguider.springboot.payload;


import java.util.Set;

import net.javaguider.springboot.model.Category;
import net.javaguider.springboot.model.SubCategory;

public class SubCategoryDto {

	private Integer subcateId;
	private String subcatName;
	private CategoryDto categoryDto;
	public SubCategoryDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public SubCategoryDto(Integer subcateId, String subcatName) {
		super();
		this.subcateId = subcateId;
		this.subcatName = subcatName;
//		this.categoryDto = categoryDto;
	}
	public Integer getSubcateId() {
		return subcateId;
	}
	public void setSubcateId(Integer subcateId) {
		this.subcateId = subcateId;
	}
	public String getSubcatName() {
		return subcatName;
	}
	public void setSubcatName(String subcatName) {
		this.subcatName = subcatName;
	}
//	public CategoryDto getCategoryDto() {
//		return categoryDto;
//	}
//	public void setCategoryDto(CategoryDto categoryDto2) {
//		this.categoryDto = (CategoryDto) categoryDto2;
//	}
	
	public void setCategoryDto(CategoryDto categoryDto) {
	    this.categoryDto = categoryDto;
	}
	
}
