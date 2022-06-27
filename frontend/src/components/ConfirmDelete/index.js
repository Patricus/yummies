import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import ConfirmDelete from "./ConfirmDelete";

function ConfirmDelete() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <ConfirmDelete />
        </Modal>
      )}
    </>
  );
}

export default ConfirmDelete;
