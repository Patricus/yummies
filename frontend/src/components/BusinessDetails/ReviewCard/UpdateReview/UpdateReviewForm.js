import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateReview } from "../../../../store/reviews";

function UpdateReviewFrom({ review, setShowModal }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [rating, setRating] = useState(review.title);
  const [comment, setComment] = useState(review.description);

  const submit = async e => {
    e.preventDefault();
    setErrors([]);

    await dispatch(
      updateReview({
        rating,
        comment,
      })
    ).catch(async res => {
      if (res && res.errors) setErrors(res.errors);
    });
    setShowModal(false);
  };

  return (
    <form onSubmit={submit}>
      <ul>
        {errors.map((error, index) => (
          <li key={index}>{error}</li>
        ))}
      </ul>
      <label htmlFor="rating">Rating</label>
      <input
        name="rating"
        type="text"
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
