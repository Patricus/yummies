import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import UpdateBusinessForm from "./LoginForm";

function UpdateBusinessModal() {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <button onClick={() => setShowModal(true)}>Log In</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <UpdateBusinessForm />
        </Modal>
      )}
    </>
  );
}

export default UpdateBusinessModal;
