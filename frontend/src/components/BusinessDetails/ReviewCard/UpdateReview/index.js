import React, { useState } from "react";
import { Modal } from "../../../../context/Modal";
import UpdateReviewFrom from "./UpdateReviewForm";

function UpdateReviewModal(review) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateReviewFrom review={review} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewModal;
