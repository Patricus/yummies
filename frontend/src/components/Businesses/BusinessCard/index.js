import React, { useState } from "react";
import { Link } from "react-router-dom";
import yummiesPic from "../../images/yummies.png";

function BusinessCard(business) {
  const { id, title, image } = business;

  const [businessPic, setBusinessPic] = useState(image);

  let businessReviewPercentage;

  if (business.reviewPercentage) {
    businessReviewPercentage = {
      width: `${business.reviewPercentage}%`,
    };
  } else {
    businessReviewPercentage = {
      width: 0,
    };
  }

  const defaultPic = () => {
    setBusinessPic(yummiesPic);
  };

  return (
    <Link to={`/businesses/${id}`}>
      <div className="businessCard">
        <div className="imgFrame">
          <img src={businessPic} onError={defaultPic} alt={`Picture of ${title}`} />
        </div>
        <div className="cardData">
          <h2>{title}</h2>
          <div className="ratings">
            <div className="full-stars" style={businessReviewPercentage}>
              <span>★★★★★</span>
            </div>
            <div className="empty-stars">
              <span>★★★★★</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default BusinessCard;
