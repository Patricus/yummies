import { csrfFetch } from "./csrf";
import reviewReducer, { getReviews } from "./reviews";

const CREATE_BUSINESS = "businessDetail/CREATE";
const READ_BUSINESS = "businessDetail/READ";
const UPDATE_BUSINESS = "businessDetail/UPDATE";
const DELETE_BUSINESS = "businessDetail/DELETE";

//Action Creators

const createBusiness = business => ({
  type: CREATE_BUSINESS,
  business,
});

const readBusinesses = business => ({
  type: READ_BUSINESS,
  business,
});

const patchBusiness = business => ({
  type: UPDATE_BUSINESS,
  business,
});

const deleteBusiness = businessId => ({
  type: DELETE_BUSINESS,
  businessId,
});

//Thunks

export const addBusiness = business => async dispatch => {
  const res = await csrfFetch("/api/businesses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(business),
  });

  if (res.ok) {
    const newBusiness = await res.json();
    dispatch(createBusiness(newBusiness));
    return newBusiness;
  }
};

export const getBusiness = businessId => async dispatch => {
  const res = await csrfFetch(`/api/businesses/${businessId}`);

  if (res.ok) {
    const business = await res.json();
    await dispatch(readBusinesses(business));
    dispatch(getReviews(businessId));
    return business;
  }
};

export const updateBusiness = business => async dispatch => {
  const res = await csrfFetch(`/api/businesses/${business.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(business),
  });

  if (res.ok) {
    const updatedBusiness = await res.json();
    dispatch(patchBusiness(updatedBusiness));
    return updateBusiness;
  }
};

export const removeBusiness = businessId => async dispatch => {
  const res = await csrfFetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteBusiness(businessId));
  }
};

//Reducer
const businessDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BUSINESS:
      const createState = {};
      createState[action.business.id] = action.business;
      return createState;

    case READ_BUSINESS:
      const readState = {};
      readState[action.business.id] = action.business;
      return readState;

    case UPDATE_BUSINESS:
      const updateState = {};
      updateState[action.business.id] = action.business;
      return updateState;

    case DELETE_BUSINESS:
      const deleteState = { ...state };
      delete deleteState[action.businessId];
      return deleteState;

    default:
      return state;
  }
};

export default businessDetailReducer;
