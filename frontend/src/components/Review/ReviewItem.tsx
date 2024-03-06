import React from 'react';
import { Review } from '../../services/Models';

interface ReviewItemProps {
  review: Review;
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="review-item">
      <h3>{review.title}</h3>
      <p>{review.description}</p>
      <p>Rating: {review.stars}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default ReviewItem;