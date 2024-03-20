package net.javaguider.springboot.payload;

import java.util.Set;

import net.javaguider.springboot.model.SubCategory;

public class CategoryDto {
	
	private Integer categoryId;
	private SubCategoryDto subCateDto;
	private String title;
	public CategoryDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	public CategoryDto(Integer categoryId, String title) {
		super();
		this.categoryId = categoryId;
//		this.subCateDto = subCateDto;
		this.title = title;
	}
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
//	public SubCategoryDto getSubCateDto() {
//		return subCateDto;
//	}
	public void setSubCateDto(SubCategoryDto subCategoryDto) {
		this.subCateDto = (SubCategoryDto) subCategoryDto;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
//	public void setSubCateDto(SubCategoryDto subCategoryDto) {
//		// TODO Auto-generated method stub
//		
//	}
	
	

//	public void setSubCategoryDto(SubCategoryDto subCategoryDto) {
//	    this.subCategoryDto = subCategoryDto;
//	}
	
	
	
	
}
