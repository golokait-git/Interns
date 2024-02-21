package com.brajsundar.server.Service.Reels;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Reels;

public interface ReelService {
    Reels uploadReel(MultipartFile file, String reelName, String reelUrl);

    List<Reels> getReels();

    Reels getReelById(String id);

    Reels updateReel(String id, String reelName, String reelUrl, MultipartFile file);

    void deleteReel(String id);
}
