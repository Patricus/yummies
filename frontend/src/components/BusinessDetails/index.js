import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getBusiness } from "../../store/businessDetail";
import yummiesPic from "../images/yummies.png";
import UpdateBusinessFrom from "../UpdateBusinessModal";
import ConfirmDelete from "../ConfirmDelete";
import { getReviews } from "../../store/reviews";

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
    setReviewList(...Object.values(reviews));
  }, [reviews]);

  useEffect(() => {
    dispatch(getBusiness(businessId));
    dispatch(getReviews(businessId));
  }, [dispatch]);

  return (
    business && (
      <div>
        <h1>{title}</h1>
        {sessionUser && sessionUser.id === business.ownerId && (
          <>
            <UpdateBusinessFrom {...business} />
            <ConfirmDelete businessId={businessId} />
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
        <div>
          <h2>Reviews</h2>
          <ul>
            {reviewList &&
              reviewList.map(review => {
                {
                  console.log("review", review);
                }
                return (
                  <li key={review.id}>
                    <div>
                      <div>{review.User.username}</div>
                      <div>{review.rating}</div>
                    </div>
                    <div>{review.comment}</div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    )
  );
}

export default BusinessDetails;
