package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.brajsundar.server.Model.Courses;

public interface CoursesRepository extends MongoRepository<Courses, String> {

}