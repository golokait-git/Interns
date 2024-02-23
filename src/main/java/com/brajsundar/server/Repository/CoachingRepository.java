package com.brajsundar.server.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.Coaching;

public interface CoachingRepository extends MongoRepository<Coaching, ObjectId> {

	Optional<Coaching> findById(String id);

}