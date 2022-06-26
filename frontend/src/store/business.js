const CREATE_BUSINESS = "business/CREATE";
const READ_BUSINESS = "business/READ";
const UPDATE_BUSINESS = "business/UPDATE";
const DELETE_BUSINESS = "business/DELETE";

//Action Creators

const createBusiness = business => ({
  type: CREATE_BUSINESS,
  business,
});

const readBusinesses = businesses => ({
  type: READ_BUSINESS,
  businesses,
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
  const res = await fetch("/api/businesses", {
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
  const res = await fetch(`/api/businesses/${businessId}`);

  if (res.ok) {
    const business = await res.json();
    dispatch(readBusinesses(business));
    return business;
  }
};

export const allBusinesses = () => async dispatch => {
  const res = await fetch("/api/businesses");

  if (res.ok) {
    const businesses = await res.json();
    dispatch(readBusinesses(businesses));
    return businesses;
  }
};

export const updateBusiness = business => async dispatch => {
  const res = await fetch(`/api/businesses/${business.id}`);

  if (res.ok) {
    const updatedBusiness = await res.json();
    dispatch(patchBusiness(updateBusiness));
    return updateBusiness;
  }
};

export const removeBusiness = businessId => async dispatch => {
  const res = await fetch(`/api/businesses/${businessId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteBusiness(businessId));
  }
};

//Reducer
const businessReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BUSINESS:
      const createState = { ...state };
      createState.businessDetail = {};
      createState.businessDetail[action.business.id] = action.business;
      createState.allBusinesses[action.business.id] = action.business;
      return createState;

    case READ_BUSINESS:
      const readState = { ...state };
      if (action.businesses) {
        action.businesses.forEach(business => {
          readState[business.id] = business;
        });
        return readState;
      } else {
        readState.businessDetail = {};
        readState.businessDetail[action.business.id] = action.business;
        return readState;
      }

    case UPDATE_BUSINESS:
      const updateState = { ...state };
      updateState.businessDetail = {};
      updateState.businessDetail[action.business.id] = action.business;
      updateState.allBusinesses[action.business.id] = action.business;
      return updateState;

    case DELETE_BUSINESS:
      const deleteState = { ...state };
      deleteState.businessDetail = {};
      delete deleteState.allBusinesses[action.business.id];
      return deleteState;

    default:
      return state;
  }
};

export default businessReducer;
