package com.brajsundar.server.Service.Book;

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
import com.brajsundar.server.Model.Books;
import com.brajsundar.server.Repository.BookRepository;

@Service
@Transactional
public class BookServiceImpl implements BookService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Override
    public Books uploadBook(MultipartFile file, String bookName, String bookDetail, String bookLink, String country,
            String preBook) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());

            // String bookId = generateBookId();
            ObjectId objectId = new ObjectId();
            String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Book/" + objectId.toHexString() + "/";
            String fileName = "thumbnail_1.png";
            String s3Key = folderPath + fileName;

            PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, file.getInputStream(), metadata);
            amazonS3.putObject(request);

            Books book = new Books(bookName, bookDetail, bookLink, country, preBook, s3Key, objectId);
            return this.bookRepository.save(book);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }


    @Override
    public List<Books> getBook() {
        return this.bookRepository.findAll();
    }

    @Override
    public Books getBookById(String id) {
        Optional<Books> Books = this.bookRepository.findById(id);

        if (Books.isPresent()) {
            return Books.get();
        } else {
            System.out.println("Record Not Found with IdL " + id);
        }
        return null;
    }

    @Override
    public Books updateBook(String id, String bookName, String bookDetail, String bookLink, String country,
            String preBook, MultipartFile newThumbnail) {
        Optional<Books> book = this.bookRepository.findById(id);

        if (book.isPresent()) {
            Books existingBook = book.get();

            try {
                existingBook.setBookName(bookName);
                existingBook.setBookDetail(bookDetail);
                existingBook.setBookLink(bookLink);
                existingBook.setCountry(country);
                existingBook.setPreBook(preBook);
                existingBook.getBookThumbnail();
                this.bookRepository.save(existingBook);

                if (newThumbnail != null && !newThumbnail.isEmpty()) {
                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentType(newThumbnail.getContentType());

                    String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Book/" + existingBook.getId().toHexString() + "/";
                    String newFileName = "thumbnail_1.png";
                    String newS3Key = folderPath + newFileName;

                    // Upload the new thumbnail to S3
                    PutObjectRequest request = new PutObjectRequest(bucketName, newS3Key, newThumbnail.getInputStream(),
                            metadata);
                    amazonS3.putObject(request);

                    existingBook.setBookThumbnail(newS3Key);
                    this.bookRepository.save(existingBook);
                }

                return existingBook;
            } catch (Exception e) {
                // TODO: handle exception
                System.out.println("Failed to update book: " + e.getMessage());
                throw new RuntimeException("Failed to update book", e);
            }
        } else {
            System.out.println("Record Not Found: " + id);
            return null;
        }
    }

    @Override
    public void deleteBook(String id) {
        Optional<Books> books = this.bookRepository.findById(id);

        if (books.isPresent()) {
            Books book = books.get();

            try {
                String s3Key = book.getBookThumbnail();
                amazonS3.deleteObject(new DeleteObjectRequest(bucketName, s3Key));
                this.bookRepository.delete(book);
            } catch (Exception e) {
                System.out.println("Failed to delete object from S3: " + e.getMessage());
            }
        } else {
            System.out.println("Record Not Found with id: " + id);
        }
    }
}
