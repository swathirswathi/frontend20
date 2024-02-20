import React, { useState, useEffect } from 'react';
import './Review.css'; // Import your CSS file for styling

const Review = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:5260/api/Review/Admin/user/GetAllReview');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      const response = await fetch(`http://localhost:5260/api/Review/admin/user/car/${reviewId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete review');
      }
      fetchReviews();
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  return (
    <div className="review-container">
      <h1>Reviews</h1>
      {reviews.length === 0 ? (
        <p>No reviews yet.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((review) => (
            <li key={review.reviewId} className="review-item">
              <div>
                <strong>Rating: {review.rating}</strong>
                <p>Comments: {review.comments}</p>
                <p>Date: {review.reviewDate}</p>
              </div>
              <button onClick={() => handleDelete(review.reviewId)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Review;
