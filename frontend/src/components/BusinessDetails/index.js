import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiness } from "../../store/businessDetail";
import yummiesPic from "../images/yummies.png";
import UpdateBusinessFrom from "../UpdateBusinessModal";
import ConfirmDelete from "../ConfirmDelete";
import { getReviews } from "../../store/reviews";
import ReviewCard from "./ReviewCard";
import CreateReview from "./CreateReview";
import "./businessDetails.css";

function BusinessDetails() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [reviewList, setReviewList] = useState([]);
  const { businessId } = useParams();

  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const business = useSelector(state => state.businessDetail[businessId]);

  const reviews = useSelector(state => state.reviews);

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
    setReviewList(Object.values(reviews));
  }, [reviews]);

  useEffect(() => {
    dispatch(getBusiness(businessId));
    dispatch(getReviews(businessId));
  }, [dispatch]);

  let reviewPercentage;

  if (business && business.reviewPercentage) {
    reviewPercentage = {
      width: business.reviewPercentage,
    };
  } else {
    reviewPercentage = {
      width: 0,
    };
  }

  return (
    business && (
      <div>
        <div id="titleAndEdit">
          <h1>{title}</h1>
          {sessionUser && sessionUser.id === business.ownerId && (
            <div>
              <UpdateBusinessFrom {...business} />
              <ConfirmDelete businessId={businessId} />
            </div>
          )}
        </div>
        {image ? (
          <img src={image} alt={`Picture of ${title}`} id="businessImage" />
        ) : (
          <img src={yummiesPic} alt={`Picture of ${title}`} id="businessImage" />
        )}
        <div id="infoSection">
          <div id="address">
            <p>Address:</p>
            <div>{address}</div>
            <div>{city}</div>
            <div>{state}</div>
            <div>{zipCode}</div>
          </div>
          <div id="description">
            <div>
              <p>{description}</p>
            </div>
          </div>
          <div id="ratingAndCreate">
            <div className="ratings">
              <div className="full-stars" style={reviewPercentage}>
                <span>★★★★★</span>
              </div>
              <div className="empty-stars">
                <span>★★★★★</span>
              </div>
            </div>
            {sessionUser && <CreateReview {...businessId} />}
          </div>
        </div>
        <div id="reviews">
          <h2>Reviews</h2>
          <ul>
            {reviewList.length > 0 ? (
              reviewList.map(review => {
                return <ReviewCard {...review} key={review.id} />;
              })
            ) : (
              <h2 id="noReviews">No Reviews Yet!</h2>
            )}
          </ul>
        </div>
      </div>
    )
  );
}

export default BusinessDetails;
