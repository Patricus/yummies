import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addBusiness } from "../../store/businessDetail";
import "./businessForm.css";

function CreateBusiness() {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
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

    if (!sessionUser) {
      setErrors(["You must be logged in to create a restaurant."]);
      return;
    }

    try {
      const business = await dispatch(
        addBusiness({
          ownerId: sessionUser.id,
          title,
          image,
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
    <div className="body">
      <h1>Create a Restaurant</h1>
      <div id="createForm">
        <form onSubmit={submit}>
          <ul id="errorList">
            {errors.map((error, index) => (
              <li className="error" key={index}>
                {error}
              </li>
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
          <input
            name="image"
            type="text"
            value={image}
            onChange={e => setImage(e.target.value)}
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
    </div>
  );
}

export default CreateBusiness;
