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

import com.brajsundar.server.Model.Coaching;
import com.brajsundar.server.Service.Coaching.CoachingService;

@RestController
public class CoachingController {

    @Autowired
    private CoachingService coachingService;

    @PostMapping("/coaching")
    public ResponseEntity<Coaching> uploadCoaching(@RequestParam("file") MultipartFile file,
            String name, String description,
            String exclyUrl) {
        return ResponseEntity.ok()
                .body(this.coachingService.uploadCoaching(file, name, description, exclyUrl));
    }

    @GetMapping("/coaching")
    public ResponseEntity<List<Coaching>> getCoaching() {
        return ResponseEntity.ok().body(coachingService.getCoaching());
    }

    @GetMapping("/coaching/{id}")
    public ResponseEntity<Coaching> getCoachingById(@PathVariable String id) {
        return ResponseEntity.ok().body(coachingService.getCoachingById(id));
    }

    @PutMapping("/coaching/{id}")
    public ResponseEntity<Coaching> updateCoaching(@PathVariable String id,
            @RequestParam(value = "file", required = false) MultipartFile newThumbnail,
            @RequestParam String name,
            @RequestParam String description,
            @RequestParam String exclyUrl) {

        Coaching updatedCoaching = coachingService.updateCoaching(id, name, description, exclyUrl,
                newThumbnail);
        return ResponseEntity.ok(updatedCoaching);
    }

    @DeleteMapping("/coaching/{id}")
    public HttpStatus deleteCoaching(@PathVariable String id) {
        this.coachingService.deleteCoaching(id);
        return HttpStatus.OK;
    }
}
