package com.brajsundar.server.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.brajsundar.server.Model.Books;

@Repository
public interface BookRepository extends MongoRepository<Books, ObjectId> {

	Optional<Books> findById(String id);

}
