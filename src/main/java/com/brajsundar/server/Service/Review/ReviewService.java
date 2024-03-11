package com.brajsundar.server.Service.Review;

import java.util.List;

import com.brajsundar.server.Model.Review;

public interface ReviewService {
    Review createReview(Review review);

    List<Review> getAllReviews();

    Review getReviewById(String id);

    Review updateReview(String id, Review review);

    void deleteReview(String id);
}
