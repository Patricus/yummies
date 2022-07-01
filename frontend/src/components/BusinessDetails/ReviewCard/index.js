import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UpdateReviewModal from "./UpdateReview";
import DeleteReview from "./DeleteReview";
import "./reviewCard.css";

function ReviewCard(review) {
  const sessionUser = useSelector(state => state.session.user);

  const rating = useSelector(state => {
    if (state.reviews[review.id]) return state.reviews[review.id].rating;
  });
  const comment = useSelector(state => {
    if (state.reviews[review.id]) return state.reviews[review.id].comment;
  });

  return (
    <li key={review.id} className="review">
      <ul className="userButtonsRating">
        <div>
          <li className="username">{review.User.username}</li>
          {sessionUser && sessionUser.id === review.userId && (
            <>
              <UpdateReviewModal {...review} />
              <DeleteReview reviewId={review.id} businessId={review.businessId} />
            </>
          )}
        </div>
        <li>
          <div className="ratings">
            <div className="full-stars" style={{ width: `${rating * 20}%` }}>
              <span>★★★★★</span>
            </div>
            <div className="empty-stars">
              <span>★★★★★</span>
            </div>
          </div>
        </li>
      </ul>
      <div className="comments">{comment}</div>
    </li>
  );
}

export default ReviewCard;
