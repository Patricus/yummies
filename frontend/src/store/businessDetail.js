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
const businessDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_BUSINESS:
      const createState = { ...state };
      createState = {};
      createState[action.business.id] = action.business;
      return createState;

    case READ_BUSINESS:
      const readState = {};
      readState[action.business.id] = action.business;
      return readState;

    case UPDATE_BUSINESS:
      const updateState = { ...state };
      updateState = {};
      updateState[action.business.id] = action.business;
      return updateState;

    case DELETE_BUSINESS:
      const deleteState = { ...state };
      deleteState = {};
      return deleteState;

    default:
      return state;
  }
};

export default businessDetailReducer;
