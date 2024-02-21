package com.brajsundar.server.Service.Coaching;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.brajsundar.server.Model.Coaching;
import com.brajsundar.server.Repository.CoachingRepository;

import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class CoachingServiceImpl implements CoachingService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Autowired
    private CoachingRepository coachingRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Override
    public Coaching uploadCoaching(MultipartFile file, String name, String description,
            String exclyUrl) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());

            // String bookId = generateBookId();
            ObjectId objectId = new ObjectId();
            String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Coaching/" + objectId.toHexString()
                    + "/";
            String fileName = "thumbnail_1.png";
            String s3Key = folderPath + fileName;

            PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, file.getInputStream(), metadata);
            amazonS3.putObject(request);

            Coaching coaching = new Coaching(name, description, exclyUrl, s3Key, objectId);
            return this.coachingRepository.save(coaching);
        } catch (Exception e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }

    @Override
    public List<Coaching> getCoaching() {
        return this.coachingRepository.findAll();
    }

    @Override
    public Coaching getCoachingById(String id) {
        Optional<Coaching> Coaching = this.coachingRepository.findById(id);

        if (Coaching.isPresent()) {
            return Coaching.get();
        } else {
            System.out.println("Record Not found with Id: " + id);
        }
        return null;
    }

    @Override
    public Coaching updateCoaching(String id, String name, String description,
            String exclyUrl, MultipartFile newThumbnail) {
        Optional<Coaching> coaching = this.coachingRepository.findById(id);

        if (coaching.isPresent()) {
            Coaching existingCoaching = coaching.get();

            try {
                existingCoaching.setName(name);
                existingCoaching.setDescription(description);
                existingCoaching.setExclyUrl(exclyUrl);
                existingCoaching.getThumbnail();
                this.coachingRepository.save(existingCoaching);

                if (newThumbnail != null && !newThumbnail.isEmpty()) {
                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentType(newThumbnail.getContentType());

                    String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Coaching/"
                            + existingCoaching.getId().toHexString() + "/";
                    String newFileName = "thumbnail_1.png";
                    String newS3Key = folderPath + newFileName;

                    // Upload the new thumbnail to S3
                    PutObjectRequest request = new PutObjectRequest(bucketName, newS3Key, newThumbnail.getInputStream(),
                            metadata);
                    amazonS3.putObject(request);

                    existingCoaching.setThumbnail(newS3Key);
                    this.coachingRepository.save(existingCoaching);
                }

                return existingCoaching;
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
    public void deleteCoaching(String id) {
        Optional<Coaching> Coaching = this.coachingRepository.findById(id);

        if (Coaching.isPresent()) {
            Coaching coaching = Coaching.get();

            try {
                String s3Key = coaching.getThumbnail();
                amazonS3.deleteObject(new DeleteObjectRequest(bucketName, s3Key));
                this.coachingRepository.delete(coaching);
            } catch (Exception e) {
                System.out.println("Failed to delete object from S3: " + e.getMessage());
            }
            this.coachingRepository.delete(Coaching.get());
        } else {
            System.out.println("Record Not Found wit id: " + id);
        }
    }

}
