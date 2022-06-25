import React from "react";
import { Link } from "react-router-dom";
import { getBusiness } from "../../../store/business";
//todo create store/business

function BusinessCard(business) {
  //Find business by id

  return (
    <Link to={`/businesses/${business.id}`}>
      <div className="businessCard">
        <div className="imgFrame">
          <img src={`../../../images/businesses/${business.id}`} alt={business.title} />
        </div>
        <div className="cardData">
          <h2>{business.title}</h2>
          <div>{business.rating}</div>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;
