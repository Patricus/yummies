import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getBusiness } from "../../../../store/businessDetail";
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
      await dispatch(getBusiness(review.businessId));

      setShowModal(false);
    } catch (e) {
      const { errors: err } = await e.json();
      setErrors(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Edit Review</h2>
      <ul id="errorList">
        {errors.map((error, index) => (
          <li className="error" key={index}>
            {error}
          </li>
        ))}
      </ul>
      <label>Rating</label>
      <div id="chooseRating">
        <input
          type="radio"
          id="5star"
          name="rating"
          value={5}
          checked={5 === rating}
          onChange={e => setRating(+e.target.value)}
        />
        <label htmlFor="5star">★</label>

        <input
          type="radio"
          id="4star"
          name="rating"
          value={4}
          checked={4 === rating}
          onChange={e => setRating(+e.target.value)}
        />
        <label htmlFor="4star">★</label>

        <input
          type="radio"
          id="3star"
          name="rating"
          value={3}
          checked={3 === rating}
          onChange={e => setRating(+e.target.value)}
        />
        <label htmlFor="3star">★</label>

        <input
          type="radio"
          id="2star"
          name="rating"
          value={2}
          checked={2 === rating}
          onChange={e => setRating(+e.target.value)}
        />
        <label htmlFor="2star">★</label>

        <input
          type="radio"
          id="1star"
          name="rating"
          value={1}
          checked={1 === rating}
          onChange={e => setRating(+e.target.value)}
        />
        <label htmlFor="1star">★</label>
      </div>
      <label htmlFor="comment">Comment</label>
      <textarea
        name="comment"
        value={comment}
        onChange={e => setComment(e.target.value)}
        required
      />
      <div className="buttons">
        <button>Edit Review</button>
        <button
          onClick={e => {
            e.preventDefault();
            setShowModal(false);
          }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateReviewFrom;
