import React, { useState } from "react";
import { removeBusiness } from "../../store/businessDetail";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import './confirmDelete.css'

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
    history.push("/businesses");
  };

  const cancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h2>Delete restaurant?</h2>
      <div>This can't be undone!</div>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <button className="deleteButton" onClick={deleteBusiness}>
        DELETE
      </button>
      <button onClick={cancelDelete}>Cancel</button>
    </div>
  );
}

export default ConfirmDeleteModal;
