package com.brajsundar.server.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.brajsundar.server.Model.Article;

@Repository
public interface ArticleRepository extends MongoRepository<Article, String> {
    
}
