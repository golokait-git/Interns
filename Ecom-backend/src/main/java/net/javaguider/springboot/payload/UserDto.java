package net.javaguider.springboot.payload;

import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class UserDto {

	
	private Long userId;
	
	
	private String name;
	
	
	private String Address;
	
	
	private Integer password;
	
	
	private Long mobileNumber;
	
	
	private String email;
	
	
	private Date dateOfBir;
	
	
	public Date getDateOfBir() {
        return dateOfBir;
    }

    public void setDateOfBir(Date dateOfBir) {
        this.dateOfBir = dateOfBir;
    }
	
	
	private String gender;
	
	private CartDto cart;
	
}
