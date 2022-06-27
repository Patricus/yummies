import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiness } from "../../store/businessDetail";
import yummiesPic from "../images/yummies.png";
import UpdateBusinessFrom from "../UpdateBusinessModal";

function BusinessDetails() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const { businessId } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const business = useSelector(state => {
    return state.businessDetail[businessId];
  });

  useEffect(() => {
    if (!business) return;
    setTitle(business.title);
    setImage(business.image);
    setDescription(business.description);
    setAddress(business.address);
    setCity(business.city);
    setState(business.state);
    setZipCode(business.zipCode);
  }, [business]);

  useEffect(() => {
    dispatch(getBusiness(businessId));
  }, [dispatch]);

  const deleteBusiness = () => {};

  return (
    business && (
      <div>
        <h1>{title}</h1>
        {sessionUser.id === business.ownerId && (
          <>
            <UpdateBusinessFrom {...business} />
            <button onClick={deleteBusiness}>Delete Restaurant</button>
          </>
        )}
        {image ? (
          <img src={image} alt={`Picture of ${title}`} />
        ) : (
          <img src={yummiesPic} alt={`Picture of ${title}`} />
        )}

        <p>{description}</p>
        <div>
          <div>{address}</div>
          <div>{city}</div>
          <div>{state}</div>
          <div>{zipCode}</div>
        </div>
      </div>
    )
  );
}

export default BusinessDetails;
