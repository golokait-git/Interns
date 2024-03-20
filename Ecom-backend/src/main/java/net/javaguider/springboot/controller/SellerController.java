package net.javaguider.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
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
import net.javaguider.springboot.payload.SellerDto;
import net.javaguider.springboot.service.SellerService;

@RestController
@RequestMapping("/api/seller")
public class SellerController {
	@Autowired
	private SellerService sellerservice;
	
	

	//create
    @PostMapping("/sellers")
	public ResponseEntity<SellerDto>create(@RequestBody SellerDto sellerDto){
		
		
    	SellerDto create = this.sellerservice.create(sellerDto);
		return new ResponseEntity<SellerDto>(create,HttpStatus.CREATED);
		
	}
    
    @DeleteMapping("/sellers/{id}")
	public ResponseEntity<String> delete(@PathVariable int id) {
		sellerservice.delete(id);
	    return ResponseEntity.ok("seller deleted");
	}
	

	//get by id
	   @GetMapping("/seller/{id}")
		public ResponseEntity<SellerDto>getById(@PathVariable long id ){
			SellerDto getById = this.sellerservice.getById(id);
			return  new  ResponseEntity<SellerDto>(getById ,HttpStatus.OK);
		}
		
		//get by category
		@GetMapping("/sellers")
		public ResponseEntity<List<SellerDto>>getAll(){
			
			List<SellerDto> allcategory= this.sellerservice.getAll();
			return new  ResponseEntity<List<SellerDto>>(allcategory,HttpStatus.OK);
			
		}
    
    

}
