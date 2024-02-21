package com.brajsundar.server.Service.Article;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.brajsundar.server.Model.Article;
import com.brajsundar.server.Repository.ArticleRepository;

@Service
@Transactional
public class ArticleServiceImpl implements ArticleService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private AmazonS3 amazonS3;

    // @Override
    // public Article uploadArticle(Article article) {
    // return this.articleRepository.save(article);
    // }

    @Override
    public Article uploadArticle(MultipartFile file, String title, String description) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());

            ObjectId objectId = new ObjectId();

            String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Article/" + objectId.toHexString()
                    + "/";
            String fileName = "thumbnail_1.png";
            String s3Key = folderPath + fileName;
            PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, file.getInputStream(), metadata);
            amazonS3.putObject(request);

            Article article = new Article(title, description, s3Key, objectId);
            return this.articleRepository.save(article);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }

    @Override
    public List<Article> getArticle() {
        return this.articleRepository.findAll();
    }

    @Override
    public Article getArticleById(String id) {
        Optional<Article> Article = this.articleRepository.findById(id);

        if (Article.isPresent()) {
            return Article.get();
        } else {
            System.out.println("Record Not Found with IdL " + id);
        }
        return null;
    }

    // @Override
    // public Article updateArticle(String id, String title, String description,
    // MultipartFile file) {
    // // Optional<Article> Article =
    // this.articleRepository.findById(article.getId());
    // Optional<Article> Article = this.articleRepository.findById(id);

    // if (Article.isPresent()) {
    // Article updatedArticle = Article.get();
    // updatedArticle.setId(article.getId());
    // updatedArticle.setTitle(article.getTitle());
    // updatedArticle.setDescription(article.getDescription());
    // articleRepository.save(updatedArticle);
    // return updatedArticle;
    // } else {
    // System.out.println("Record Not found with id: " + article.getId());
    // }
    // return article;
    // }
    @Override
    public Article updateArticle(String id, String title, String description, MultipartFile newThumbnail) {
        Optional<Article> articleOptional = this.articleRepository.findById(id);

        if (articleOptional.isPresent()) {
            Article existingArticle = articleOptional.get();

            try {
                // Update other properties
                existingArticle.setTitle(title);
                existingArticle.setDescription(description);
                existingArticle.getThumbnail();
                this.articleRepository.save(existingArticle);

                // Update the thumbnail if a new one is provided
                if (newThumbnail != null && !newThumbnail.isEmpty()) {
                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentType(newThumbnail.getContentType());

                    String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Article/"
                            + existingArticle.getId().toHexString() + "/";
                    String newFileName = "thumbnail_1.png";
                    String newS3Key = folderPath + newFileName;

                    // Upload the new thumbnail to S3
                    PutObjectRequest request = new PutObjectRequest(bucketName, newS3Key, newThumbnail.getInputStream(),
                            metadata);
                    amazonS3.putObject(request);

                    // Set the new thumbnail URL in the Article
                    existingArticle.setThumbnail(newS3Key);
                    this.articleRepository.save(existingArticle);
                }

                return existingArticle;
            } catch (Exception e) {
                System.out.println("Failed to update article: " + e.getMessage());
                throw new RuntimeException("Failed to update article", e);
            }
        } else {
            System.out.println("Record Not Found with id: " + id);
            return null;
        }
    }

    @Override
    public void deleteArticle(String id) {
        Optional<Article> articleOptional = this.articleRepository.findById(id);

        if (articleOptional.isPresent()) {
            Article article = articleOptional.get();

            try {
                String s3Key = article.getThumbnail();
                amazonS3.deleteObject(new DeleteObjectRequest(bucketName, s3Key));
                this.articleRepository.delete(article);
            } catch (Exception e) {
                System.out.println("Failed to delete object from S3: " + e.getMessage());
            }
        } else {
            System.out.println("Record Not Found with id: " + id);
        }
    }
}
