import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import { useHistory } from "react-router-dom";

import logo from "../images/logo.png";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  const history = useHistory();

  const addRestaurant = e => {
    e.preventDefault();
    history.push("/businesses/new");
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li>
          <button onClick={addRestaurant}>Create a restaurant</button>
        </li>
        <li id="profileButton">
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li>
          <LoginFormModal />
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
      </>
    );
  }

  return (
    <header>
      <img id="logo" src={logo} alt="logo" />
      <ul id="navlinks">
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/businesses">Restaurants</NavLink>
        </li>
        {isLoaded && sessionLinks}
      </ul>
    </header>
  );
}

export default Navigation;
