package net.javaguider.springboot.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguider.springboot.payload.CategoryDto;
import net.javaguider.springboot.payload.SubCategoryDto;
import net.javaguider.springboot.service.CategoryService;
import net.javaguider.springboot.service.SubCategoryService;

@RestController
@RequestMapping("/api/subcategory")
public class SubCateController {
	
	private SubCategoryService subCateService;
	public SubCateController(SubCategoryService subCateService) {
        this.subCateService= subCateService;
    }
	
	//create
	@PostMapping("/sub/{catid}")
	public ResponseEntity<SubCategoryDto> createSubCategory(@RequestBody SubCategoryDto subCatDto, @PathVariable("catid") int categoryId){
	    SubCategoryDto createdSubCategory = subCateService.create(subCatDto, categoryId);
	    return new ResponseEntity<SubCategoryDto>(createdSubCategory, HttpStatus.CREATED);
	}
    
	//delete subcategory
	@DeleteMapping("/subcategorys/{id}")
	public ResponseEntity<String> deleteSubCat(@PathVariable int id) {
		subCateService.deleteSubCat(id);
	    return ResponseEntity.ok("subCategory deleted");
	}
	
	//get All Subcategory
		@GetMapping("/subcategorys")
		public ResponseEntity<List<SubCategoryDto>>getAllSubCat(){
			
			List<SubCategoryDto> allcategory= this.subCateService.getAllSubCat();
			return new  ResponseEntity<List<SubCategoryDto>>(allcategory,HttpStatus.OK);
			
		}
		
		//get by id
		   @GetMapping("/subcategorys/{id}")
			public ResponseEntity<SubCategoryDto>getSubCatById(@PathVariable long id ){
				SubCategoryDto getById = this.subCateService.getSubCatById(id);
				return  new  ResponseEntity<SubCategoryDto>(getById ,HttpStatus.OK);
			}
	

}
