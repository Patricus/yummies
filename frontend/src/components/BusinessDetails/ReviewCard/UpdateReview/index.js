import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBusinessForm from "./UpdateBusinessForm";

function UpdateReviewModal(review) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Restaurant</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBusinessForm review={review} setShowModal={setShowModal} />
        </Modal>
      )}
    </>
  );
}

export default UpdateReviewModal;
