package com.brajsundar.server.Service.User;

import com.brajsundar.server.Model.User;

public interface UserService {
    User signUp(User user);

    User login(String email, String password);

    User getUserById(String id);

    User updateUserProfile(String id , User updatedUser );

    // User updateUserProfile(User existingUser);
}
