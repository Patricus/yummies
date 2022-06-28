import { csrfFetch } from "./csrf";

const CREATE_REVIEW = "review/CREATE";
const READ_REVIEW = "review/READ";
const UPDATE_REVIEW = "review/UPDATE";
const DELETE_REVIEW = "review/DELETE";

//Action Creators

const createReview = review => ({
  type: CREATE_REVIEW,
  review,
});

const readReviews = review => ({
  type: READ_REVIEW,
  review,
});

const patchReview = review => ({
  type: UPDATE_REVIEW,
  review,
});

const deleteReview = reviewId => ({
  type: DELETE_REVIEW,
  reviewId,
});

//Thunks

export const addReview = review => async dispatch => {
  const res = await csrfFetch("/api/reviews", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const newReview = await res.json();
    dispatch(createReview(newReview));
    return newReview;
  }
};

export const getReviews = businessId => async dispatch => {
  const res = await csrfFetch(`/api/reviews`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(businessId),
  });

  if (res.ok) {
    const reviews = await res.json();
    dispatch(readReviews(reviews));
    return reviews;
  }
};

export const updateReview = review => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${review.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(review),
  });

  if (res.ok) {
    const updatedReview = await res.json();
    dispatch(patchReview(updatedReview));
    return updateReview;
  }
};

export const removeReview = reviewId => async dispatch => {
  const res = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteReview(reviewId));
  }
};

//Reducer
const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_REVIEW:
      const createState = { ...state };
      createState[action.review.id] = action.review;
      return createState;

    case READ_REVIEW:
      const readState = {};
      readState[action.review.id] = action.review;
      return readState;

    case UPDATE_REVIEW:
      const updateState = {};
      updateState[action.review.id] = action.review;
      return updateState;

    case DELETE_REVIEW:
      const deleteState = { ...state };
      delete deleteState[action.reviewId];
      return deleteState;

    default:
      return state;
  }
};

export default reviewReducer;
