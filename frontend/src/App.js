import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import SplashPage from "./components/SplashPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Businesses from "./components/Businesses";
import BusinessDetails from "./components/BusinessDetails";
import CreateBusiness from "./components/BusinessForm";
import AboutMe from "./components/AboutMe";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/">
            <SplashPage />
          </Route>
          <Route exact path="/businesses">
            <Businesses />
          </Route>
          <Route exact path="/businesses/new">
            <CreateBusiness />
          </Route>
          <Route path="/businesses/:businessId">
            <BusinessDetails />
          </Route>
        </Switch>
      )}
      <AboutMe />
    </>
  );
}

export default App;
