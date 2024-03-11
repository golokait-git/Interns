package com.brajsundar.server.Model;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Document(collection = "Book")
public class Books {
    @Id
    private ObjectId id;

    @NotBlank
    @Size(max = 100)
    @Indexed(unique = true)
    private String bookName;
    private String bookDetail;
    private List<BookLink> bookLink;
    private String country;
    private String preBook;
    private String bookThumbnail;


    public Books(String bookName, String bookDetail, List<BookLink> bookLink, String country, String preBook,
            String bookThumbnail, ObjectId id) {
        this.id = id;
        this.bookName = bookName;
        this.bookDetail = bookDetail;
        this.bookLink = bookLink;
        this.country = country;
        this.preBook = preBook;
        this.bookThumbnail = bookThumbnail;
    }

    // Getters and setters

    public String getId() {
        return id.toHexString();
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

    public List<BookLink> getBookLink() {
        return bookLink;
    }

    public void setBookLink(List<BookLink> bookLink) {
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
    
    public static class BookLink {
          private int id;
          private String country;
          private String link;
          
        public BookLink(int id, String country, String link) {
            this.id = id;
            this.country = country;
            this.link = link;
            }
            public int getId() {
                return id;
            }
            public void setId(int id) {
                this.id = id;
            }
            public String getCountry() {
                return country;
            }
            public void setCountry(String country) {
                this.country = country;
            }
            public String getLink() {
                return link;
            }
            public void setLink(String link) {
                this.link = link;
            }

          
        }
    
}