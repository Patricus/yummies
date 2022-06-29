import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateReviewModal from "./CreateReviewModal";

function CreateReview(businessId) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Write a Review</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <CreateReviewModal setShowModal={setShowModal} businessId={businessId} />
        </Modal>
      )}
    </>
  );
}

export default CreateReview;
