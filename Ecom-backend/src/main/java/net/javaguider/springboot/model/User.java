package net.javaguider.springboot.model;


import java.util.Date;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Data;
@Data
@Entity
//@Value
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE)
	private int userId;
	
	@Column(name="Name" ,nullable=false)
	private String name;
	
	@Column(name="Address")
	private String Address;
	
	@Column(name="Password" ,nullable=false)
	private Integer password;
	
	@Column(name="MobileNumber" ,nullable=false,length=10)
	private Long mobileNumber;
	
	@Column( unique=true ,name="Email" ,nullable=false)
	private String email;
	
	@Column(name="Date_Of_Bir" ,nullable=false)
	private Date dateOfBir;
	
	@Column(name="Gender") 
	private String gender;
	@OneToOne(mappedBy="user")
	private Cart cart;
	
	


}
