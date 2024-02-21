package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.Coaching;

public interface CoachingRepository extends MongoRepository<Coaching, String> {

}