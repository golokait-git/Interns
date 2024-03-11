package com.brajsundar.server.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.brajsundar.server.Model.Reels;

@Repository
public interface ReelRepository extends MongoRepository<Reels, ObjectId> {

	Optional<Reels> findById(String id);

}
