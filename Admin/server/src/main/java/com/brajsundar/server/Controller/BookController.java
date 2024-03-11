package com.brajsundar.server.Controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Books;
import com.brajsundar.server.Model.Books.BookLink;
import com.brajsundar.server.Service.Book.BookService;

@RestController
//@RequestMapping("/book")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("/book")
    public ResponseEntity<Books> uploadBook(
            @RequestParam("file") MultipartFile file,
            @RequestParam("bookName") String bookName,
            @RequestParam("bookDetail") String bookDetail,
            @RequestParam("preBook") String preBook) {
        String country = "India";
        Books saveBook = bookService.uploadBook(file, bookName, bookDetail, preBook);
        return ResponseEntity.ok(saveBook);
    }

    // Get All Books
    @GetMapping("/book")
    public ResponseEntity<List<Books>> getBook() {
        try {
            List<Books> books = bookService.getBook();
            return ResponseEntity.ok(books);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Get Book By id
    @GetMapping("/book/{id}")
    public ResponseEntity<Books> getBookById(@PathVariable String id) {
        return ResponseEntity.ok().body(bookService.getBookById(id));
    }

    // Update Book
    @PutMapping("/book/{id}")
    public ResponseEntity<Books> updateBook(@PathVariable String id,
            @RequestParam(value = "file", required = false) MultipartFile newThumbnail, @RequestParam String bookName,
            @RequestParam String bookDetail, @RequestParam String bookLink, @RequestParam String country,
            @RequestParam String preBook) {
        // books.setId(id);
        Books updatedBook = bookService.updateBook(id, bookName, bookDetail, bookLink, country, preBook, newThumbnail);
        // return ResponseEntity.ok().body(this.bookService.updateBook(books));
        return ResponseEntity.ok(updatedBook);
    }

    // Delete Book
    @DeleteMapping("/book/{id}")
    public HttpStatus deleteBook(@PathVariable String id) {
        this.bookService.deleteBook(id);
        return HttpStatus.OK;
    }
    @PostMapping("/addBookLinks/{bookId}")
    public ResponseEntity<List<BookLink>> addBookLinks(@PathVariable String bookId,@RequestBody List<Books.BookLink> bookLinks) {
        // Validate and process the list of BookLinks
        List<BookLink> savedBookLinks = bookService.addBookLinksToBook(bookId, bookLinks);
        return ResponseEntity.ok(savedBookLinks);
    }
}
