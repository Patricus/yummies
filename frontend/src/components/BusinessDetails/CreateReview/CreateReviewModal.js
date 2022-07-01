import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBusiness } from "../../../store/businessDetail";
import { addReview } from "../../../store/reviews";

function UpdateReviewFrom({ businessId, setShowModal }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [rating, setRating] = useState(0);
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
      <label>Rating</label>
      <div id="chooseRating" onChange={e => setRating(e.target.value)}>
        <input type="radio" id="5star" name="rating" value={5} />
        <label htmlFor="5star">★</label>

        <input type="radio" id="4star" name="rating" value={4} />
        <label htmlFor="4star">★</label>

        <input type="radio" id="3star" name="rating" value={3} />
        <label htmlFor="3star">★</label>

        <input type="radio" id="2star" name="rating" value={2} />
        <label htmlFor="2star">★</label>

        <input type="radio" id="1star" name="rating" value={1} />
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
