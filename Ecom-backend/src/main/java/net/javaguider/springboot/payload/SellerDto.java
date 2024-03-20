package net.javaguider.springboot.payload;

public class SellerDto {
	
	private Integer sellerId;
	private String firstName;
	private String lastName;
	private String password;
	private String mobile;
	private String emailId;
	private String gender;
	private ProductDto product;
	public Integer getSellerId() {
		return sellerId;
	}
	public void setSellerId(Integer sellerId) {
		this.sellerId = sellerId;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public ProductDto getProduct() {
		return product;
	}
	public void setProduct(ProductDto product) {
		this.product = product;
	}
	public String getGender() {
		return gender;
	}
	public void setGender(String gender) {
		this.gender=gender;
	}
	public SellerDto(Integer sellerId, String firstName, String lastName, String password, String mobile,
			String emailId,String gender,ProductDto product) {
		super();
		this.sellerId = sellerId;
		this.firstName = firstName;
		this.lastName = lastName;
		this.password = password;
		this.mobile = mobile;
		this.emailId = emailId;
		this.product = product;
		this.gender=gender;
	}
	public SellerDto() {
		super();
		// TODO Auto-generated constructor stub
	}
	

}
