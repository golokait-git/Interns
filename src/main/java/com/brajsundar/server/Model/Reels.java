package com.brajsundar.server.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Document(collection = "Reels")
public class Reels {

    @Id
    private ObjectId id; // Use String instead of long for MongoDB-generated ID

    @NotBlank
    @Size(max = 100)
    @Indexed(unique = true)
    private String reelName;
    private String reelUrl;
    private String reelThumbnail;

    public Reels(String reelName, String reelUrl, String reelThumbnail, ObjectId id) {
        this.reelName = reelName;
        this.reelUrl = reelUrl;
        this.reelThumbnail = reelThumbnail;
        this.id = id;
    }

    // Getters and setters

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getReelName() {
        return reelName;
    }

    public void setReelName(String reelName) {
        this.reelName = reelName;
    }

    public String getReelUrl() {
        return reelUrl;
    }

    public void setReelUrl(String reelUrl) {
        this.reelUrl = reelUrl;
    }

    public String getReelThumbnail() {
        return reelThumbnail;
    }

    public void setReelThumbnail(String reelThumbnail) {
        this.reelThumbnail = reelThumbnail;
    }
}
