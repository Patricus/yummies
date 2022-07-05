import React, { useState } from "react";
import { Modal } from "../../../context/Modal";
import CreateReviewModal from "./CreateReviewModal";

function CreateReview(business) {
  const [showModal, setShowModal] = useState(false);
  const { businessId } = business;
  console.log("createReview-businessId", businessId);

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
