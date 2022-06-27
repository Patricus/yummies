import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

function ConfirmDelete(businessId) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Restaurant</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDeleteModal setShowModal={setShowModal} businessId={businessId} />
        </Modal>
      )}
    </>
  );
}

export default ConfirmDelete;
