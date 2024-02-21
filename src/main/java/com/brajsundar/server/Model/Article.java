package com.brajsundar.server.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Document(collection = "Article")
public class Article {
    @Id
    private ObjectId id; // Use String instead of long for MongoDB-generated ID

    @NotBlank
    @Size(max = 100)
    @Indexed(unique = true)
    private String title;

    private String description;

    private String thumbnail;

    // Getters and setters

    public Article(String title, String description, String thumbnail, ObjectId id) {
        // TODO Auto-generated constructor stub
        this.title = title;
        this.description = description;
        this.thumbnail = thumbnail;
        this.id = id;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
