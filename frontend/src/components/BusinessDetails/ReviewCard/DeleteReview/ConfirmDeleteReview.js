import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeReview } from "../../../../store/reviews";

function ConfirmDeleteReviewModal({ setShowModal, reviewId }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const deleteReview = async () => {
    setErrors([]);
    await dispatch(removeReview(reviewId)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <button className="deleteButton" onClick={deleteReview}>
        DELETE
      </button>
      <button onClick={cancelDelete}>Cancel</button>
    </div>
  );
}

export default ConfirmDeleteReviewModal;
