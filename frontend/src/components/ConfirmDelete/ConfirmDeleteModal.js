import React, { useState } from "react";
import { removeBusiness } from "../../store/businessDetail";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function ConfirmDeleteModal({ setShowModal, businessId: { businessId } }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);

  const history = useHistory();

  const deleteBusiness = async () => {
    setErrors([]);
    await dispatch(removeBusiness(businessId)).catch(async res => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
    history.push("/");
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <button onClick={deleteBusiness}>DELETE</button>
      <button onClick={cancelDelete}>Cancel</button>
    </>
  );
}

export default ConfirmDeleteModal;
