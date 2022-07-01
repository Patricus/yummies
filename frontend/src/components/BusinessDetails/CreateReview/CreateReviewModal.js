import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../../store/businessDetail";
import { addReview } from "../../../store/reviews";

function UpdateReviewFrom({ businessId, setShowModal }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const sessionUser = useSelector(state => state.session.user);

  const submit = async e => {
    e.preventDefault();
    setErrors([]);

    try {
      await dispatch(
        addReview({
          userId: sessionUser.id,
          businessId: businessId[0],
          rating,
          comment,
        })
      );
      await dispatch(getBusiness(businessId[0]));

      setShowModal(false);
    } catch (e) {
      const { errors: err } = await e.json();
      setErrors(err);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Create a Review</h2>
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
      <div className="buttons">
        <button>Create Review</button>
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
