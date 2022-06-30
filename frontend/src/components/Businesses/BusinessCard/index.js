import React from "react";
import { Link } from "react-router-dom";
import yummiesPic from "../../images/yummies.png";

function BusinessCard(business) {
  const { id, title, image } = business;

  // const reviewPercentage = (
  //   (business.Reviews.reduce((total, rating) => total + rating.rating, 0) /
  //     business.Reviews.length) *
  //   20
  // ).toFixed(1);

  let businessReviewPercentage;

  if (business.reviewPercentage) {
    businessReviewPercentage = {
      width: business.reviewPercentage,
    };
  } else {
    businessReviewPercentage = {
      width: 0,
    };
  }

  let businessPic = yummiesPic;
  if (image) businessPic = image;

  return (
    <Link to={`/businesses/${id}`}>
      <div className="businessCard">
        <div className="imgFrame">
          <img src={businessPic} alt={title} />
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
