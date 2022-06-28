import React, { useState } from "react";
import { useSelector } from "react-redux";

function ReviewCard(review) {
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);
  const [editReview, setEditReview] = useState(false);

  const sessionUser = useSelector(state => state.session.user);

  return (
    <li key={review.id}>
      <ul>
        <li>{review.User.username}</li>
        <li>{rating}</li>
        {sessionUser && sessionUser.id === review.userId && (
          <>
            <button onClick={() => setEditReview(true)}>Edit Review</button>
          </>
        )}
      </ul>
      <div>{comment}</div>
    </li>
  );
}

export default ReviewCard;
