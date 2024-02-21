package com.brajsundar.server.Model;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Document(collection = "Courses")
public class Courses {
    @Id
    private ObjectId id; // Use String instead of long for MongoDB-generated ID

    @NotBlank
    @Size(max = 100)
    @Indexed(unique = true)
    private String name;
    private String description;
    private String thumbnail;
    private String exclyUrl;

    @Autowired
    public Courses(String name, String description, String thumbnail,
            String exclyUrl,
            ObjectId id) {
        this.name = name;
        this.description = description;
        this.exclyUrl = exclyUrl;
        this.thumbnail = thumbnail;
        this.id = id;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getExclyUrl() {
        return exclyUrl;
    }

    public void setExclyUrl(String exclyUrl) {
        this.exclyUrl = exclyUrl;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }
}
