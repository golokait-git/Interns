package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.User;

public interface UserRepository extends MongoRepository<User, String> {

    User findByUsername(String username);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
