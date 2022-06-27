import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateBusiness } from "../../store/businessDetail";

function UpdateBusinessFrom(business) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(business.title);
  const [description, setDescription] = useState(business.description);
  const [address, setAddress] = useState(business.address);
  const [state, setState] = useState(business.state);
  const [city, setCity] = useState(business.city);
  const [zipCode, setZipCode] = useState(business.zipCode);

  const submit = e => {
    e.preventDefault();
    setErrors([]);

    return dispatch(
      updateBusiness({
        id: business.id,
        title,
        description,
        address,
        state,
        city,
        zipCode,
      })
    ).catch(async res => {
      if (res && res.errors) setErrors(res.errors);
    });
  };

  return (
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
      <button>Edit Restaurant</button>
    </form>
  );
}

export default UpdateBusinessFrom;
