package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.Review;

public interface ReviewRepository extends MongoRepository<Review, String> { 

}
