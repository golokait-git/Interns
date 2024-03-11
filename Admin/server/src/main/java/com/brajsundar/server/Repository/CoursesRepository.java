package com.brajsundar.server.Repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.Courses;

public interface CoursesRepository extends MongoRepository<Courses, ObjectId> {

	Optional<Courses> findById(String id);

}