package net.javaguider.springboot.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import net.javaguider.springboot.exception.ResourceNotFoundException;
import net.javaguider.springboot.model.User;

import net.javaguider.springboot.payload.UserDto;
import net.javaguider.springboot.repository.UserRepository;
@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ModelMapper mapper;
	
	
	public UserDto createUser(UserDto userDto) {
		//userDto to User
		User user = this.mapper.map(userDto,User.class);
		//save
		User saveUser =this.userRepo.save(user);
		//user to userDto
		UserDto saveUserDto = this.mapper.map(saveUser, UserDto.class);
		return saveUserDto;
	}
	
	public UserDto getById(int userId) {
		User findById=this.userRepo.findByuserId(userId);
		UserDto userDto =this.mapper.map(findById,UserDto.class);
		return userDto;
	}
	
	
	
	public UserDto update(UserDto newUser, int userId) {
	    User oldUser = this.userRepo.findByuserId(userId);
	    
	    oldUser.setName(newUser.getName());
	    oldUser.setAddress(newUser.getAddress());
	    oldUser.setPassword(newUser.getPassword());
	    oldUser.setMobileNumber(newUser.getMobileNumber());
	    oldUser.setEmail(newUser.getEmail());
	    oldUser.setDateOfBir(newUser.getDateOfBir());
	    oldUser.setGender(newUser.getGender());
	    
	    oldUser.setEmail(newUser.getEmail());
	    // Update other fields as needed
	    
	    User updatedUser = this.userRepo.save(oldUser);
	    
	    // Map the updated user entity to a UserDto and return it
	    return this.mapper.map(updatedUser, UserDto.class);
	}

	
	
	public void deleteUser(int userId){
		User findByDelete = this.userRepo.findById(userId).orElseThrow(() ->new ResourceNotFoundException("UserId not Found"));
		UserDto userDto =this.mapper.map(findByDelete,UserDto.class);
		this.userRepo.delete(findByDelete);
	}
	
	public List<UserDto>findAllUser(){
		List<User> findAll = this.userRepo.findAll();
		//user -> userDto
		
		List<UserDto> collect= findAll.stream().map(each ->this.mapper.map(each,UserDto.class)).collect(Collectors.toList());
		return collect;
	}

	public UserDto getByEmailId(String emailId) {
		       User findemail=userRepo.findByEmail(emailId);
		       return this.mapper.map(findemail, UserDto.class);
		   	
	}
}