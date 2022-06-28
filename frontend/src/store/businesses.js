import { csrfFetch } from "./csrf";

const READ_BUSINESSES = "businesses/READ";

//Action Creators

const readBusinesses = businesses => ({
  type: READ_BUSINESSES,
  businesses,
});

//Thunks

export const allBusinesses = () => async dispatch => {
  const res = await csrfFetch("/api/businesses");

  if (res.ok) {
    const businesses = await res.json();
    dispatch(readBusinesses(businesses));
    return businesses;
  }
};

//Reducer
const businessesReducer = (state = {}, action) => {
  switch (action.type) {
    case READ_BUSINESSES:
      const readState = {};
      action.businesses.forEach(business => {
        readState[business.id] = business;
      });
      return readState;

    default:
      return state;
  }
};

export default businessesReducer;
