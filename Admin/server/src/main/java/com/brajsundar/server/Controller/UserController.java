package com.brajsundar.server.Controller;

import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.brajsundar.server.Model.User;
import com.brajsundar.server.Service.User.UserService;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
//@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signUp(@RequestBody User user) {
        User newUser = userService.signUp(user);

        if (newUser != null) {
            return ResponseEntity.ok(newUser);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) {
        User authenticatedUser = userService.login(user.getEmail(), user.getPassword());

        if (authenticatedUser != null) {
            return ResponseEntity.ok(authenticatedUser);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping("/getUser/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        User userFound = userService.getUserById(id);

        if (userFound != null) {
            return ResponseEntity.ok(userFound);
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
    @PutMapping("/user/{id}")
    public ResponseEntity<User> updateUserProfile(@PathVariable String id,
     @RequestBody User updatedUser) {
        
        // return ResponseEntity<Optional<User>>(userService.updateUserProfile(id , updatedUser) )
        User updatedUserProfile = userService.updateUserProfile(id, updatedUser);
        
    if (updatedUserProfile != null) {
        return ResponseEntity.ok(updatedUserProfile);
    } else {
        return ResponseEntity.notFound().build();
    }

    }
    
    

}
