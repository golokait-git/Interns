package com.brajsundar.server.Service.Coaching;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Coaching;

public interface CoachingService {
        Coaching uploadCoaching(MultipartFile file, String name, String description, String exclyUrl);

        List<Coaching> getCoaching();

        Coaching getCoachingById(String id);

        Coaching updateCoaching(String id, String name, String description, String exclyUrl,
                        MultipartFile file);

        void deleteCoaching(String id);

}
