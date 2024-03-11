package com.brajsundar.server.Service.Video;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.brajsundar.server.Model.Video;
import com.brajsundar.server.Repository.VideoRepository;

@Service
@Transactional
public class VideoServiceImpl implements VideoService {

    @Autowired
    private VideoRepository videoRepository;

    @Override
    public Video createVideo(Video video) {
        return this.videoRepository.save(video);
    }

    @Override
    public List<Video> getVideo() {
        return this.videoRepository.findAll();
    }

    @Override
    public Video getVideoById(String id) {
        Optional<Video> Video = this.videoRepository.findById(id);

        if (Video.isPresent()) {
            return Video.get();
        } else {
            System.out.println("Record Not Found with IdL " + id);
        }
        return null;
    }

    @Override
    public Video updateVideo(Video video) {
        Optional<Video> Video = this.videoRepository.findById(video.getId());

        if (Video.isPresent()) {
            Video updatedVideo = Video.get();
            updatedVideo.setId(video.getId());
            updatedVideo.setVideoName(video.getVideoName());
            updatedVideo.setVideoUrl(video.getVideoUrl());
            updatedVideo.setCategory(video.getCategory());
            videoRepository.save(updatedVideo);
            return updatedVideo;
        } else {
            System.out.println("Record Not found with id: " + video.getId());
        }
        return video;
    }

    @Override
    public void deleteVideo(String id) {
        Optional<Video> Video = this.videoRepository.findById(id);

        if (Video.isPresent()) {
            this.videoRepository.delete(Video.get());
        } else {
            System.out.println("Record Not Found with it: " + id);
        }
    }

}
