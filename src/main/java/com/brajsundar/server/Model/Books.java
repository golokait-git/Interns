package com.brajsundar.server.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Document(collection = "Books")
public class Books {
    @Id
    private ObjectId id;

    @NotBlank
    @Size(max = 100)
    @Indexed(unique = true)
    private String bookName;
    private String bookDetail;
    private String bookLink;
    private String country;
    private String preBook;
    private String bookThumbnail;

    public Books(String bookName, String bookDetail, String bookLink, String country, String preBook,
            String bookThumbnail, ObjectId id) {
        this.bookName = bookName;
        this.bookDetail = bookDetail;
        this.bookLink = bookLink;
        this.country = country;
        this.preBook = preBook;
        this.bookThumbnail = bookThumbnail;
        this.id = id;
    }

    // Getters and setters

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public String getBookDetail() {
        return bookDetail;
    }

    public void setBookDetail(String bookDetail) {
        this.bookDetail = bookDetail;
    }

    public String getBookLink() {
        return bookLink;
    }

    public void setBookLink(String bookLink) {
        this.bookLink = bookLink;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getPreBook() {
        return preBook;
    }

    public void setPreBook(String preBook) {
        this.preBook = preBook;
    }

    public String getBookThumbnail() {
        return bookThumbnail;
    }

    public void setBookThumbnail(String bookThumbnail) {
        this.bookThumbnail = bookThumbnail;
    }
}
