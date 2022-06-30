import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../../../store/reviews";

function UpdateReviewFrom({ review, setShowModal }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [rating, setRating] = useState(review.rating);
  const [comment, setComment] = useState(review.comment);

  const submit = async e => {
    e.preventDefault();
    setErrors([]);

    try {
      await dispatch(
        updateReview({
          id: review.id,
          userId: review.userId,
          businessId: review.businessId,
          rating,
          comment,
        })
      );
      setShowModal(false);
    } catch (e) {
      const { errors: err } = await e.json();
      setErrors(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <ul id="errorList">
        {errors.map((error, index) => (
          <li className="error" key={index}>
            {error}
          </li>
        ))}
      </ul>
      <label htmlFor="rating">Rating</label>
      <input
        name="rating"
        type="number"
        value={rating}
        onChange={e => setRating(e.target.value)}
        required
      />
      <label htmlFor="comment">Comment</label>
      <textarea name="comment" value={comment} onChange={e => setComment(e.target.value)} />
      <button>Edit Review</button>
    </form>
  );
}

export default UpdateReviewFrom;
