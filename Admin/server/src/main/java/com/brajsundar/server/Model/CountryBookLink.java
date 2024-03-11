package com.brajsundar.server.Model;

public class CountryBookLink {
    private String country;
    private String bookLink;

    public CountryBookLink() {
        // Default constructor
    }

    public CountryBookLink(String country, String bookLink) {
        this.country = country;
        this.bookLink = bookLink;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getBookLink() {
        return bookLink;
    }

    public void setBookLink(String bookLink) {
        this.bookLink = bookLink;
    }
}
