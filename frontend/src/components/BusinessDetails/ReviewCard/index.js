import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpdateReviewModal from "./UpdateReview";
import DeleteReview from "./DeleteReview";

function ReviewCard(review) {
  const sessionUser = useSelector(state => state.session.user);

  const rating = useSelector(state => {
    if (state.reviews[review.id]) return state.reviews[review.id].rating;
  });
  const comment = useSelector(state => {
    if (state.reviews[review.id]) return state.reviews[review.id].comment;
  });

  return (
    <li key={review.id}>
      <ul>
        <li>{review.User.username}</li>
        <li>{rating}</li>
        {sessionUser && sessionUser.id === review.userId && (
          <>
            <UpdateReviewModal {...review} />
            <DeleteReview reviewId={review.id} />
          </>
        )}
      </ul>
      <div>{comment}</div>
    </li>
  );
}

export default ReviewCard;
