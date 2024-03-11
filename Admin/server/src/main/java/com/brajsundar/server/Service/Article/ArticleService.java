package com.brajsundar.server.Service.Article;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Article;

public interface ArticleService {
    // Create
    // Article uploadArticle(Article article);
    Article uploadArticle(MultipartFile file, String title, String description);

    // // Read
    List<Article> getArticle();

    // // Read by id
    Article getArticleById(String id);

    // // Update Article
    Article updateArticle(String id, String title, String description, MultipartFile file);

    // // Delete Article
    void deleteArticle(String id);
}
