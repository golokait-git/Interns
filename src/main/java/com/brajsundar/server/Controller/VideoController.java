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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.brajsundar.server.Model.Video;
import com.brajsundar.server.Service.Video.VideoService;

@RestController
public class VideoController {

    @Autowired
    private VideoService videoService;

    // Create Single Video
    @PostMapping("/video")
    public ResponseEntity<Video> createVideo(@RequestBody Video video) {
        return ResponseEntity.ok().body(this.videoService.createVideo(video));
    }

    // Get All Articles
    @GetMapping("/video")
    public ResponseEntity<List<Video>> getVideo() {
        return ResponseEntity.ok().body(videoService.getVideo());
    }

    // Get Article By id
    @GetMapping("/video/{id}")
    public ResponseEntity<Video> getVideoById(@PathVariable String id) {
        return ResponseEntity.ok().body(videoService.getVideoById(id));
    }

    // Update Article
    @PutMapping("/video/{id}")
    public ResponseEntity<Video> updateVideo(@PathVariable String id, @RequestBody Video video) {
        video.setId(id);
        return ResponseEntity.ok().body(this.videoService.updateVideo(video));
    }

    // Delete Article
    @DeleteMapping("/video/{id}")
    public HttpStatus deleteVideo(@PathVariable String id) {
        this.videoService.deleteVideo(id);
        return HttpStatus.OK;
    }
}
