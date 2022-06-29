import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBusiness } from "../../store/businessDetail";

function CreateBusiness() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");

  const sessionUser = useSelector(state => state.session.user);
  let history = useHistory();

  const submit = async e => {
    e.preventDefault();
    setErrors([]);

    try {
      const business = await dispatch(
        addBusiness({
          ownerId: sessionUser.id,
          title,
          description,
          address,
          state,
          city,
          zipCode,
        })
      );
      history.push(`/businesses/${business.id}`);
    } catch (e) {
      const data = await e.json();
      if (data && data.errors) setErrors(data.errors);
    }
  };

  return (
    <div>
      <form onSubmit={submit}>
        <ul>
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <label htmlFor="address">Address</label>
        <input
          name="address"
          type="text"
          value={address}
          onChange={e => setAddress(e.target.value)}
          required
        />
        <label htmlFor="city">City</label>
        <input
          name="city"
          type="text"
          value={city}
          onChange={e => setCity(e.target.value)}
          required
        />
        <label htmlFor="state">State</label>
        <input
          name="state"
          type="text"
          value={state}
          onChange={e => setState(e.target.value)}
          required
        />
        <label htmlFor="zipCode">Zip Code</label>
        <input
          name="zipCode"
          type="number"
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          required
        />
        <button>Create Restaurant</button>
      </form>
    </div>
  );
}

export default CreateBusiness;
