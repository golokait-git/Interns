package com.brajsundar.server.Service.Review;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.brajsundar.server.Model.Review;
import com.brajsundar.server.Repository.ReviewRepository;

@Service
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Override
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    @Override
    public Review getReviewById(String id) {
        Optional<Review> optionalReview = reviewRepository.findById(id);
        return optionalReview.orElse(null);
    }

    @Override
    public Review updateReview(String id, Review review) {
        review.setId(id); // Set the ID of the existing review
        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(String id) {
        reviewRepository.deleteById(id);
    }
}
