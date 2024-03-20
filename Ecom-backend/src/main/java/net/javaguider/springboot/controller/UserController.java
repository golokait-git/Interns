package net.javaguider.springboot.controller;

import java.sql.Date;
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

import net.javaguider.springboot.model.User;
import net.javaguider.springboot.payload.UserDto;
import net.javaguider.springboot.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {
	@Autowired
	private UserService userService;
	
	@PostMapping("/create")
	public ResponseEntity<UserDto>createuser(@RequestBody UserDto userDto){
		Date date=new Date(0);
		userDto.setDateOfBir(date);
		
		UserDto createUser=this.userService.createUser(userDto);
		return new ResponseEntity<UserDto>(createUser,HttpStatus.CREATED);
	}
	
	
	@GetMapping("findById/{userId}")
	public ResponseEntity<UserDto>findUserById(@PathVariable int userId){
		UserDto byId = this.userService.getById(userId);
		return new ResponseEntity<UserDto>(byId,HttpStatus.FOUND) ;
	}
	
	
	@PostMapping("/users/{userId}")
	public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto, @PathVariable int userId) {
	    System.out.println(userId);
	    UserDto updatedUser = this.userService.update(userDto, userId);
	    return new ResponseEntity<>(updatedUser, HttpStatus.OK);
	}
	@DeleteMapping("deleteuser/{userId}")
	void deleteUser(@PathVariable int userId){
		this.userService.deleteUser(userId);
	}
	
	@GetMapping("/findall")
	ResponseEntity<List<UserDto>>findAllUser(){
		List<UserDto> findAllUser = this.userService.findAllUser();
		return new ResponseEntity<List<UserDto>>(findAllUser,HttpStatus.ACCEPTED);
	}
	
	 @GetMapping("/email/{emailId}")
	    public ResponseEntity<UserDto> getUserByEmailId(@PathVariable String emailId) {
	        UserDto userDto = userService.getByEmailId(emailId);
	        return new ResponseEntity<>(userDto, HttpStatus.OK);
	    }
	
}