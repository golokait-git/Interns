package net.javaguider.springboot.service;



import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Collectors;
import java.util.Optional;
import java.util.Set;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguider.springboot.exception.ResourceNotFoundException;
import net.javaguider.springboot.model.Cart;
import net.javaguider.springboot.model.CartItem;
import net.javaguider.springboot.model.Product;
import net.javaguider.springboot.model.User;
import net.javaguider.springboot.payload.CartDto;
import net.javaguider.springboot.payload.ItemRequest;
import net.javaguider.springboot.repository.CartRepository;
import net.javaguider.springboot.repository.ProductRepository;
import net.javaguider.springboot.repository.UserRepository;

@Service
public class CartService {
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ProductRepository productRepo;
	@Autowired
    private CartRepository cartRepo;
	
	@Autowired
	private ModelMapper modelMapper;
	

	   public CartDto addItem(ItemRequest item,String username) {
		int productId=item.getProductId();
		int quantity =item.getQuantity();
		 User user = (User) userRepo.findByEmail(username);
           Product product=this.productRepo.getProductById(productId);
		
		
		    
		CartItem cartitem = new CartItem();
		cartitem.setProduct(product);
		cartitem.setQuantity(quantity);
		 double totaleprice=product.getPrice()*quantity;
		
		cartitem.setTotalprice(totaleprice);
		
		
		//getting cart from  user 
		Cart cart=user.getCart();
		
		if(cart!=null) {
			cart=new Cart();
			cart.setUser(user);
		}
		cartitem.setCart(cart);
		
		 Set<CartItem> items = cart.getItems();
		
		AtomicReference<Boolean> flag=new AtomicReference<>(false);
		
		Set<CartItem> newproduct = items.stream().map((i)->{
	          if(i.getProduct().getId()==product.getId()) {
	        	  i.setQuantity(quantity);
	        	  i.setTotalprice(totaleprice);
	        	  flag.set(true);
	          }
	          return i;
	          
	        }).collect(Collectors.toSet());
	        
	        if(flag.get()){
	        	items.clear();
	        	items.addAll(newproduct);
	        	
	        }else {
	        	cartitem.setCart(cart);
	        	items.add(cartitem);
	        }
	        
	        Cart saveCart = this.cartRepo.save(cart);
	        
	           
	        
			return  this.modelMapper.map(saveCart,CartDto.class);
	   }
	   
	   
	   public CartDto getcartAll(String email){
			//find user
			User user = this.userRepo.findByEmail(email);
			//find cart
			    Optional<Cart> cart= this.cartRepo.findByUser(user);
			
			    return this.modelMapper.map(cart,CartDto.class);
			
		}
	   
	   
//	   get cat by cartid
	   
	   public CartDto getCartById(int cartId) {
//		   User user = this.userRepo.findByEmail(username);
		   Optional<Cart> findById=this.cartRepo.findById(cartId);
		   return this.modelMapper.map(findById, CartDto.class);
	   }
	   
	   
	   public CartDto removeCartItemFromCart(String username, int productId) {
		    User user = this.userRepo.findByEmail(username);
		    if (user == null) {
		        throw new ResourceNotFoundException("User with email " + username + " not found");
		    }
		    Cart cart = user.getCart();
		    Set<CartItem> items = cart.getItems();
		    boolean removed = items.removeIf(item -> item.getProduct().getId() == productId);
		    if (!removed) {
		        throw new ResourceNotFoundException("Product with ID " + productId + " not found in cart.");
		    }
		    Cart savedCart = this.cartRepo.save(cart);
		    return this.modelMapper.map(savedCart, CartDto.class);
		}


	   
	   
}
	

	


	

