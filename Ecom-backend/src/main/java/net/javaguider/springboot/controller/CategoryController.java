package net.javaguider.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguider.springboot.payload.CategoryDto;
import net.javaguider.springboot.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {
	@Autowired
	private CategoryService  catService;

	public CategoryController(CategoryService catService) {
        this.catService = catService;
    }
	
	//create
    @PostMapping("/categorys")
	public ResponseEntity<CategoryDto>create(@RequestBody CategoryDto catDto){
		
		
		CategoryDto create = this.catService.create(catDto);
		return new ResponseEntity<CategoryDto>(create,HttpStatus.CREATED);
		
	}

//update
@PostMapping("/categorys/{catid}")
	public ResponseEntity<CategoryDto>update(@RequestBody CategoryDto catDto,@PathVariable int catid){
	System.out.println(catid);
	CategoryDto update= this.catService.update(catDto, catid);
		return  new  ResponseEntity<CategoryDto>(update,HttpStatus.OK);
	}


//delete
@DeleteMapping("/categorys/{id}")
public ResponseEntity<String> delete(@PathVariable int id) {
    catService.delete(id);
    return ResponseEntity.ok("Category deleted");
}

//get by id
   @GetMapping("/categorys/{id}")
	public ResponseEntity<CategoryDto>getById(@PathVariable int id ){
		CategoryDto getById = this.catService.getById(id);
		return  new  ResponseEntity<CategoryDto>(getById ,HttpStatus.OK);
	}
	
	//get by category
	@GetMapping("/categorys")
	public ResponseEntity<List<CategoryDto>>getAll(){
		
		List<CategoryDto> allcategory= this.catService.getAll();
		return new  ResponseEntity<List<CategoryDto>>(allcategory,HttpStatus.OK);
		
	}
	

}
