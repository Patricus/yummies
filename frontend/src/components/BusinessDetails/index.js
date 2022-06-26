import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiness } from "../../store/businessDetail";
import yummiesPic from "../images/yummies.png";

function BusinessDetails() {
  const { businessId } = useParams();

  const dispatch = useDispatch();

  const business = useSelector(state => {
    return state.businessDetail[businessId];
  });

  useEffect(() => {
    dispatch(getBusiness(businessId));
  }, [dispatch]);

  return (
    business && (
      <div>
        <h1>{business.title}</h1>
        {business.image ? (
          <img src={business.image} alt={`Picture of ${business.title}`} />
        ) : (
          <img src={yummiesPic} alt={`Picture of ${business.title}`} />
        )}

        <p>{business.description}</p>
        <div>
          <div>{business.address}</div>
          <div>{business.city}</div>
          <div>{business.state}</div>
          <div>{business.zipCode}</div>
        </div>
      </div>
    )
  );
}

export default BusinessDetails;
