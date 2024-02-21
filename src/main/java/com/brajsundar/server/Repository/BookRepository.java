package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.brajsundar.server.Model.Books;

@Repository
public interface BookRepository extends MongoRepository<Books, String> {

}
