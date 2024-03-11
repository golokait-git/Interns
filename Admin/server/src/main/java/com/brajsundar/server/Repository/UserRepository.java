package com.brajsundar.server.Repository;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.User;

public interface UserRepository extends MongoRepository<User, ObjectId> {

    User findByEmail(String email);
    User findById(String id);

    boolean existsByUsername(String username);

    boolean existsByEmail(String email);
}
