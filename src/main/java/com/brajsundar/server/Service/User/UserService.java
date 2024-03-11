package com.brajsundar.server.Service.User;

import com.brajsundar.server.Model.User;

public interface UserService {
    User signUp(User user);

    User login(String username, String password);
}
