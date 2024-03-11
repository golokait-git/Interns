package com.brajsundar.server.Service.Workshop;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.brajsundar.server.Model.Workshop;
import com.brajsundar.server.Repository.WorkshopRepository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class WorkshopServiceImpl implements WorkshopService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Autowired
    private WorkshopRepository workshopRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Override
    public Workshop uploadWorkshop(MultipartFile file, String name, String description,
            String exclyUrl) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());

            // String bookId = generateBookId();
            ObjectId objectId = new ObjectId();
            String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Workshop/" + objectId.toHexString()
                    + "/";
            String fileName = "thumbnail_1.png";
            String s3Key = folderPath + fileName;

            PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, file.getInputStream(), metadata);
            amazonS3.putObject(request);

            Workshop workshop = new Workshop(name, description, exclyUrl, s3Key, objectId);
            return this.workshopRepository.save(workshop);
        } catch (Exception e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }

    @Override
    public List<Workshop> getWorkshop() {
        return this.workshopRepository.findAll();
    }

    @Override
    public Workshop getWorkshopById(String id) {
        Optional<Workshop> Workshop = this.workshopRepository.findById(id);

        if (Workshop.isPresent()) {
            return Workshop.get();
        } else {
            System.out.println("Record Not found with Id: " + id);
        }
        return null;
    }

    @Override
    public Workshop updateWorkshop(String id, String name, String description,
            String exclyUrl, MultipartFile newThumbnail) {
        Optional<Workshop> Workshop = this.workshopRepository.findById(id);

        if (Workshop.isPresent()) {
            Workshop existingWorkshop = Workshop.get();

            try {
                existingWorkshop.setName(name);
                existingWorkshop.setDescription(description);
                existingWorkshop.setExclyUrl(exclyUrl);
                existingWorkshop.getThumbnail();
                this.workshopRepository.save(existingWorkshop);

                if (newThumbnail != null && !newThumbnail.isEmpty()) {
                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentType(newThumbnail.getContentType());

                    String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Workshop/"
                            + existingWorkshop.getId().toHexString() + "/";
                    String newFileName = "thumbnail_1.png";
                    String newS3Key = folderPath + newFileName;

                    // Upload the new  to S3
                    PutObjectRequest request = new PutObjectRequest(bucketName, newS3Key, newThumbnail.getInputStream(),
                            metadata);
                    amazonS3.putObject(request);

                    existingWorkshop.setThumbnail(newS3Key);
                    this.workshopRepository.save(existingWorkshop);
                }

                return existingWorkshop;
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
    public void deleteWorkshop(String id) {
        Optional<Workshop> Workshop = this.workshopRepository.findById(id);

        if (Workshop.isPresent()) {
            Workshop workshop = Workshop.get();

            try {
                String s3Key = workshop.getThumbnail();
                amazonS3.deleteObject(new DeleteObjectRequest(bucketName, s3Key));
                this.workshopRepository.delete(workshop);
            } catch (Exception e) {
                System.out.println("Failed to delete object from S3: " + e.getMessage());
            }
            this.workshopRepository.delete(Workshop.get());
        } else {
            System.out.println("Record Not Found wit id: " + id);
        }
    }

}
