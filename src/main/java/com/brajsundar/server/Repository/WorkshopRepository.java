package com.brajsundar.server.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.Workshop;

public interface WorkshopRepository extends MongoRepository<Workshop, ObjectId> {

	Optional<Workshop> findById(String id);

}