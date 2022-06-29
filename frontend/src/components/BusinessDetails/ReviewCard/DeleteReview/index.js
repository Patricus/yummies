import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import ConfirmDeleteReviewModal from "./ConfirmDeleteReview";

function DeleteReview(reviewId) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDeleteReviewModal {...reviewId} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default DeleteReview;
