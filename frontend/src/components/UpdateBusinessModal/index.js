import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBusinessForm from "./UpdateBusinessForm";

function UpdateBusinessModal(business) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Restaurant</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBusinessForm {...business} />
        </Modal>
      )}
    </>
  );
}

export default UpdateBusinessModal;
