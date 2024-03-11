package com.brajsundar.server.Service.Workshop;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.brajsundar.server.Model.Workshop;

public interface WorkshopService {
    Workshop uploadWorkshop(MultipartFile file, String name, String description, String exclyUrl);

    List<Workshop> getWorkshop();

    Workshop getWorkshopById(String id);

    Workshop updateWorkshop(String id, String name, String description, String exclyUrl,
            MultipartFile file);

    void deleteWorkshop(String id);

}
