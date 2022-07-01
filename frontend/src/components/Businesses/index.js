import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBusinesses } from "../../store/businesses";
import BusinessCard from "./BusinessCard";
import "./businesses.css";

function Businesses() {
  //Get all businesses
  const dispatch = useDispatch();

  const businesses = useSelector(state => {
    return Object.values(state.allBusinesses);
  });

  useEffect(() => {
    dispatch(allBusinesses());
  }, [dispatch]);

  return (
    <div className="body">
      <h1>Restaurants</h1>
      <ul id="businesses">
        {businesses &&
          businesses.map(business => {
            return (
              <li key={business.id}>
                <BusinessCard {...business} />
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Businesses;
