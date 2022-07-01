import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBusiness } from "../../store/businessDetail";
import "./updateBusiness.css";

function UpdateBusinessFrom({ business, setShowModal }) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState(business.title);
  const [image, setImage] = useState(business.image);
  const [description, setDescription] = useState(business.description);
  const [address, setAddress] = useState(business.address);
  const [state, setState] = useState(business.state);
  const [city, setCity] = useState(business.city);
  const [zipCode, setZipCode] = useState(business.zipCode);

  const sessionUser = useSelector(state => state.session.user);

  const submit = async e => {
    e.preventDefault();
    setErrors([]);

    try {
      await dispatch(
        updateBusiness({
          id: business.id,
          title,
          image,
          description,
          address,
          state,
          city,
          zipCode,
        })
      );
      setShowModal(false);
    } catch (e) {
      const { errors } = await e.json();
      setErrors(errors);
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Edit Restaurant</h2>
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
      <label htmlFor="image">Image</label>
      <input name="image" type="text" value={image} onChange={e => setImage(e.target.value)} />
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
      <div className="buttons">
        <button>Edit Restaurant</button>
        <button
          onClick={e => {
            e.preventDefault();
            setShowModal(false);
          }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default UpdateBusinessFrom;
