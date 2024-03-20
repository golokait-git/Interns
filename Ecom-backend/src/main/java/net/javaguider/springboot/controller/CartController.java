package net.javaguider.springboot.controller;

import java.security.Principal;

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

import net.javaguider.springboot.payload.CartDto;
import net.javaguider.springboot.payload.ItemRequest;
import net.javaguider.springboot.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {
	
@Autowired
 private CartService cartSer;

	@PostMapping("/create")
	public ResponseEntity<CartDto> addtoCart(@RequestBody ItemRequest itemRequest,Principal principal){
		String email = principal.getName();
        System.out.println(email);
		CartDto addItem = this.cartSer.addItem(itemRequest,principal.getName());
		
	            	  return new ResponseEntity<CartDto>(addItem,HttpStatus.OK);
	   }
	

      @GetMapping("/cart")
          public ResponseEntity<CartDto>getAllCart(Principal principal){
    	  
    	  
    	  if (principal == null) {
    	        // Handle unauthorized access, maybe return a 401 Unauthorized response
    	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    	    }
    	
         	CartDto getcartAll=this.cartSer.getcartAll(principal.getName());
    	     return new ResponseEntity<CartDto>(getcartAll,HttpStatus.ACCEPTED);
       }
      
      
      @GetMapping("/{cartId}")
      public ResponseEntity<CartDto>getCartById(@PathVariable int cartid){
    	  CartDto  cartById = this.cartSer.getCartById(cartid);
    	  return new  ResponseEntity<CartDto>(cartById,HttpStatus.OK);
    	 
	  
      }
      @DeleteMapping("/{pid}")
      public ResponseEntity<CartDto>deleteCartItemFromCart(@PathVariable int pid,Principal p){
    	  CartDto  remove= this.cartSer.removeCartItemFromCart(p.getName(), pid);
    	  return new  ResponseEntity<CartDto>(remove,HttpStatus.UPGRADE_REQUIRED);
	  
      }
      
      
     
  }
