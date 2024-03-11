package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.brajsundar.server.Model.Video;

@Repository
public interface VideoRepository extends MongoRepository<Video, String> {

}
