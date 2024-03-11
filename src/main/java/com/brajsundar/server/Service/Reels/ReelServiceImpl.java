package com.brajsundar.server.Service.Reels;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.brajsundar.server.Model.Reels;
import com.brajsundar.server.Repository.ReelRepository;

@Service
@Transactional
public class ReelServiceImpl implements ReelService {

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    @Autowired
    private ReelRepository reelRepository;

    @Autowired
    private AmazonS3 amazonS3;

    @Override
    public Reels uploadReel(MultipartFile file, String reelName, String reelUrl) {
        try {
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());

            // String bookId = generateBookId();
            ObjectId objectId = new ObjectId();
            String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Reel/" + objectId.toHexString() + "/";
            String fileName = "thumbnail_1.png";
            String s3Key = folderPath + fileName;

            PutObjectRequest request = new PutObjectRequest(bucketName, s3Key, file.getInputStream(), metadata);
            amazonS3.putObject(request);

            Reels reel = new Reels(reelName, reelUrl, s3Key, objectId);
            return this.reelRepository.save(reel);
        } catch (IOException e) {
            throw new RuntimeException("Failed to process file", e);
        }
    }

    @Override
    public List<Reels> getReels() {
        return this.reelRepository.findAll();
    }

    @Override
    public Reels getReelById(String id) {
        Optional<Reels> Reels = this.reelRepository.findById(id);

        if (Reels.isPresent()) {
            return Reels.get();
        } else {
            System.out.println("Record Not Found with Id " + id);
        }
        return null;
    }

    @Override
    public Reels updateReel(String id, String reelName, String reelUrl, MultipartFile newThumbnail) {
        Optional<Reels> reel = this.reelRepository.findById(id);

        if (reel.isPresent()) {
            Reels existingReel = reel.get();

            try {
                existingReel.setReelName(reelName);
                existingReel.setReelUrl(reelUrl);
                existingReel.getReelThumbnail();
                this.reelRepository.save(existingReel);

                if (newThumbnail != null && !newThumbnail.isEmpty()) {
                    ObjectMetadata metadata = new ObjectMetadata();
                    metadata.setContentType(newThumbnail.getContentType());

                    String folderPath = "https://brajsundar.s3.amazonaws.com/" + "Images/Reel/"
                            + existingReel.getId().toHexString() + "/";
                    String newFileName = "thumbnail_1.png";
                    String newS3Key = folderPath + newFileName;

                    // Upload the new thumbnail to S3
                    PutObjectRequest request = new PutObjectRequest(bucketName, newS3Key, newThumbnail.getInputStream(),
                            metadata);
                    amazonS3.putObject(request);

                    existingReel.setReelThumbnail(newS3Key);
                    this.reelRepository.save(existingReel);
                }

                return existingReel;
            } catch (Exception e) {
                // TODO: handle exception
                System.out.println("Failed to update book: " + e.getMessage());
                throw new RuntimeException("Failed to update book", e);
            }
        } else {
            System.out.println("Record Not Found: " + id);
            return null;
        }
    }

    @Override
    public void deleteReel(String id) {
        Optional<Reels> reels = this.reelRepository.findById(id);

        if (reels.isPresent()) {
            Reels reel = reels.get();

            try {
                String s3Key = reel.getReelThumbnail();
                amazonS3.deleteObject(new DeleteObjectRequest(bucketName, s3Key));
                this.reelRepository.delete(reel);
            } catch (Exception e) {
                System.out.println("Failed to delete object from S3: " + e.getMessage());
            }
        } else {
            System.out.println("Record Not Found with id: " + id);
        }
    }

}
