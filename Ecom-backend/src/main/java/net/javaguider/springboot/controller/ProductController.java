package net.javaguider.springboot.controller;

import java.util.List;
import java.util.Locale.Category;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import net.javaguider.springboot.model.Product;
import net.javaguider.springboot.payload.ProductDto;
import net.javaguider.springboot.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {
	
	 @Autowired
	private ProductService productService;


	 @PostMapping("/products/{catid}/{subcatid}")
	 @ResponseBody
	 public ResponseEntity<ProductDto> saveProduct(@RequestBody ProductDto product, @PathVariable int catid, @PathVariable int subcatid) {
	     ProductDto createProduct = productService.saveProduct(product, catid, subcatid);
	     return new ResponseEntity<ProductDto>(createProduct, HttpStatus.CREATED);
	 }

	@GetMapping("/products")
	public ResponseEntity<List<ProductDto>> getAllProducts() {
	    List<ProductDto> findAll = productService.getAllProducts();
	    return new ResponseEntity<List<ProductDto>>(findAll, HttpStatus.ACCEPTED);
	}

	
	@PutMapping("/update/{productId}")
	public ResponseEntity<ProductDto> updateProduct(@PathVariable Long productId, @RequestBody ProductDto newproduct) {
	    ProductDto updateProduct = productService.updateProduct(productId, newproduct);
	    return new ResponseEntity<ProductDto>(updateProduct, HttpStatus.ACCEPTED);
	}

		//build get product id REST API 
		@GetMapping({"/products/{id}"})
		public ResponseEntity <ProductDto> getProductById(@PathVariable("id") long productId){
			ProductDto viewById =productService.getProductById( productId);
			return new ResponseEntity<ProductDto>(viewById ,HttpStatus.OK);
		}
		
		//build delete API
		@DeleteMapping("/products/{id}")
		public ResponseEntity<String> deleteProduct(@PathVariable("id") long id ){
		    // Check if the employee exists before deleting
			
		    productService.deleteProduct(id);
		    return new ResponseEntity<String>("Product deleted successfully", HttpStatus.OK);
		}
	
		// find product category wise product fetch
		    @GetMapping("/category/{catid}")
             public ResponseEntity<List<ProductDto>>getProductByCategoty(@PathVariable int catid){
            	 
            	List<ProductDto> findByCategory= this.productService.findProductByCategory(catid);
            	 return new  ResponseEntity<List<ProductDto>>(findByCategory,HttpStatus.ACCEPTED);
             }
	
}
