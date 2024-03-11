package com.brajsundar.server.Service.User;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Service;

import com.brajsundar.server.Model.User;
import com.brajsundar.server.Repository.UserRepository;

@SuppressWarnings("deprecation")
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    private PasswordEncoder passwordEncoder = new StandardPasswordEncoder();

    @Override
    public User signUp(User user) {
        if (userRepository.existsByUsername(user.getEmail()) || userRepository.existsByEmail(user.getEmail())) {
            return null;
        }

        // Encrypt password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    @Override
    public User login(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            return user;
        } else {
            return null;
        }
    }

    @Override
    public User updateUserProfile(String id, User editDetails) {
        User existingUserOptional = userRepository.findById(id);

        if (existingUserOptional.isPresent()) {
            User existingUser = existingUserOptional.get();

            // Update user details
            existingUser.setEmail(editDetails.getEmail());
            existingUser.setUsername(editDetails.getUsername());
            existingUser.setPassword(passwordEncoder.encode(editDetails.getPassword()));

            // Save the updated user
            User updatedUser = userRepository.save(existingUser);
            return updatedUser;
        } else {
            return null ;
        }
    }
    @Override
    public User getUserById(String id) {
        try {
        return userRepository.findById(new ObjectId(id)).orElse(null);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    

    
}
