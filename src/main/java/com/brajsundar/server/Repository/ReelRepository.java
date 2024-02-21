package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.brajsundar.server.Model.Reels;

@Repository
public interface ReelRepository extends MongoRepository<Reels, String> {

}
