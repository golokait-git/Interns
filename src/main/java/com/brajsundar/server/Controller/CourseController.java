package com.brajsundar.server.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Courses;
import com.brajsundar.server.Service.Courses.CourseService;

@RestController
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/course")
    public ResponseEntity<Courses> uploadCourse(@RequestParam("file") MultipartFile file,
            String name, String description,
            String exclyUrl) {
        return ResponseEntity.ok()
                .body(this.courseService.uploadCourse(file, name, description, exclyUrl));
    }

    @GetMapping("/course")
    public ResponseEntity<List<Courses>> getCourses() {
        return ResponseEntity.ok().body(courseService.getCourses());
    }

    @GetMapping("/course/{id}")
    public ResponseEntity<Courses> getCourseById(@PathVariable String id) {
        return ResponseEntity.ok().body(courseService.getCourseById(id));
    }

    @PutMapping("/course/{id}")
    public ResponseEntity<Courses> updateCourse(@PathVariable String id,
            @RequestParam(value = "file", required = false) MultipartFile newThumbnail,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String exclyUrl) {
        Courses updatedCourses = courseService.updateCourse(id, name, description, exclyUrl,
                newThumbnail);
        return ResponseEntity.ok(updatedCourses);
    }

    @DeleteMapping("/course/{id}")
    public HttpStatus deleteCourse(@PathVariable String id) {
        this.courseService.deleteCourse(id);
        return HttpStatus.OK;
    }
}
