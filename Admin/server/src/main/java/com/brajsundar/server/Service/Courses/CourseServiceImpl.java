package com.brajsundar.server.Service.Courses;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.brajsundar.server.Model.Courses;
import com.brajsundar.server.Repository.CoursesRepository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Autowired
    private AmazonS3 amazonS3;

    @Autowired
    private CoursesRepository coursesRepository;

    @Override
    public Courses uploadCourse(String name, String description, MultipartFile file, String exclyUrl) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
    
            ObjectId objectId = new ObjectId();
            String folderPath = "Images/Course/" + objectId.toHexString() + "/";
            String fileName = "thumbnail_1.png";
            String s3Key = folderPath + fileName;
    
            PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, file.getInputStream(), metadata);
            amazonS3.putObject(request);
    
            // Assuming "exclyUrl" is the URL for the course content
            // and "thumbnail" is the URL for the thumbnail image
    
            Courses courses = new Courses(name, description, s3Key, exclyUrl, objectId);
            return this.coursesRepository.save(courses);
        } catch (Exception e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }
    
    @Override
    public List<Courses> getCourses() {
        return this.coursesRepository.findAll();
    }

    @Override
    public Courses getCourseById(String id) {
        Optional<Courses> Courses = this.coursesRepository.findById(id);

        if (Courses.isPresent()) {
            return Courses.get();
        } else {
            System.out.println("Record Not found with Id: " + id);
        }
        return null;
    }

    @Override
    public Courses updateCourse(String id, String name, String description,
            String exclyUrl, MultipartFile newThumbnail) {
        Optional<Courses> Courses = this.coursesRepository.findById(id);

        if (Courses.isPresent()) {
            Courses existingCourses = Courses.get();

            try {
                existingCourses.setName(name);
                existingCourses.setDescription(description);
                existingCourses.setExclyUrl(exclyUrl);
                existingCourses.getThumbnail();
                this.coursesRepository.save(existingCourses);

                if (newThumbnail != null && !newThumbnail.isEmpty()) {
                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentType(newThumbnail.getContentType());

                    String folderPath = "Images/Course/"
                            + existingCourses.getId() + "/";
                    String newFileName = "thumbnail_1.png";
                    String newS3Key = folderPath + newFileName;

                    // Upload the new thumbnail to S3
                    PutObjectRequest request = new PutObjectRequest(bucketName, newS3Key, newThumbnail.getInputStream(),
                            metadata);
                    amazonS3.putObject(request);

                    existingCourses.setThumbnail(newS3Key);
                    this.coursesRepository.save(existingCourses);
                }

                return existingCourses;
            } catch (Exception e) {
                System.out.println("Failed to update Coaching: " + e.getMessage());
                throw new RuntimeException("Failed to update Coaching", e);
            }
        } else {
            System.out.println("Record Not Found: " + id);
            return null;
        }
    }

    @Override
    public void deleteCourse(String id) {
        Optional<Courses> Courses = this.coursesRepository.findById(id);

        if (Courses.isPresent()) {
            Courses courses = Courses.get();

            try {
                String s3Key = courses.getThumbnail();
                amazonS3.deleteObject(new DeleteObjectRequest(bucketName, s3Key));
                this.coursesRepository.delete(courses);
            } catch (Exception e) {
                System.out.println("Failed to delete object from S3: " + e.getMessage());
            }
            this.coursesRepository.delete(Courses.get());
        } else {
            System.out.println("Record Not Found wit id: " + id);
        }
    }

    

}
