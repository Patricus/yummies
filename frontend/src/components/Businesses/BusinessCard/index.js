import React from "react";
import { Link } from "react-router-dom";
import yummiesPic from "../../images/yummies.png";

function BusinessCard(business) {
  const { id, title } = business;
  const reviews =
    business.Reviews.reduce((total, rating) => total + rating.rating, 0) / business.Reviews.length;
  return (
    <Link to={`/businesses/${id}`}>
      <div className="businessCard">
        <div className="imgFrame">
          <img src={yummiesPic} alt={title} />
        </div>
        <div className="cardData">
          <h2>{title}</h2>
          <div>{`Rating: ${reviews.toFixed(2)}`}</div>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;
