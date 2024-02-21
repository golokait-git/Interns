package com.brajsundar.server.Service.Video;

import java.util.List;

import com.brajsundar.server.Model.Video;

public interface VideoService {
    // Create
    Video createVideo(Video video);

    // // Read
    List<Video> getVideo();

    // // Read by id
    Video getVideoById(String id);

    // // Update Article
    Video updateVideo(Video video);

    // // Delete Article
    void deleteVideo(String id);
}
