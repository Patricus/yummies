import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allBusinesses } from "../../store/business";
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
                <Link to={`/api/businesses/${business.id}`}>
                  <div className="businessCard">
                    <h2>{business.title}</h2>
                  </div>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Businesses;
