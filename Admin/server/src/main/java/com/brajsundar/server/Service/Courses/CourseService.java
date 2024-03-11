package com.brajsundar.server.Service.Courses;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Courses;

public interface CourseService {
    Courses uploadCourse( String name, String description,MultipartFile file ,String exclyUrl );

    List<Courses> getCourses();

    Courses getCourseById(String id);

    Courses updateCourse(String id, String name, String description, String exclyUrl,
            MultipartFile file);

    void deleteCourse(String id);

}
