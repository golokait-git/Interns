package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.Workshop;

public interface WorkshopRepository extends MongoRepository<Workshop, String> {

}