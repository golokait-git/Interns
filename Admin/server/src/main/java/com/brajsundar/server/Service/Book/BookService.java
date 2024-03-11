package com.brajsundar.server.Service.Book;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Books;
import com.brajsundar.server.Model.Books.BookLink;

public interface BookService {
    // Create
    Books uploadBook(MultipartFile file, String bookName, String bookDetail, String country);
    // // Read
    List<Books> getBook();

    // // Read by id
    Books getBookById(String id);

    // // Update Books
    Books updateBook(String id, String bookName, String bookDetail, String bookLink, String country, String preBook, MultipartFile file);

    // // Delete Books
    void deleteBook(String id);
    List<BookLink> addBookLinksToBook(String bookId, List<BookLink> bookLinks);

}
