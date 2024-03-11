import React from "react";
import { useEffect } from "react";
import { getMyReviews } from "../../services/ReviewService";
import { Review } from "../../services/Models";
import ReviewPrompt from "../../components/Review/ReviewPrompt";
import { Link } from "react-router-dom";
import "./MyReviews.css";

function MyReviews() {
  const [reviews, setReviews] = React.useState<Array<Review>>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const list = await getMyReviews();
        list.reverse();
        setReviews(list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchReviews();
  });

  return (
    <div>
      {reviews.map((review) => (
        <div>
          <Link className="gamelink" to={"/game/" + review.game.id}>
            {review.game.emoji} {review.game.name}
          </Link>
          <ReviewPrompt
            stars={review.stars ?? 5}
            creator={review.userName ?? "Navn Naveson"}
            text={review.description ?? "Sykt bra!"}
          />
        </div>
      ))}
    </div>
  );
}

export default MyReviews;
