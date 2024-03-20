package net.javaguider.springboot.payload;

import lombok.Data;
import net.javaguider.springboot.model.Cart;
@Data
public class CartItemDto {

	private int cartItemId;
	private int quantity;
	private double totalprice;
	private CartDto cartdto;
	private ProductDto productdto;

}
