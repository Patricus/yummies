import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allBusinesses } from "../../store/businesses";
import BusinessCard from "./BusinessCard";

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
    <div>
      <h1>Restaurants</h1>
      <ul>
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
