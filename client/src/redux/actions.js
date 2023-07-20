import axios from "axios";

export const getCountries = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/countries");
      if (data.length) {
        dispatch({ type: "GET_COUNTRIES", payload: data });
      }
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };
};

export const getCountryDetail = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/countries/${id}`);

      if (data.length) {
        return dispatch({
          type: "GET_COUNTRIES_DETAIL",
          payload: data,
        });
      }
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };
};

export const addActivity = (activities) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(
        "/activities",
        activities
      );
      return dispatch({ type: "ADD_ACTIVITIES", payload: data });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        const errorMessage = error.response.data.error;
        alert("Error: " + errorMessage);
      } else if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        const errorMessage = validationErrors.map((err) => err.message).join("\n");
        alert("Validation error:\n" + errorMessage);
      } else {
        alert("An error occurred while creating the activity");
      }
    }
  };
};

export const getActivities = () => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get("/activities");
      return dispatch({ type: "GET_ACTIVITIES", payload: data });
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };
};

export const onSearch = (name) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(
        `/countries?name=${name}`
      );

      if (data.length) {
        return dispatch({
          type: "SEARCH_COUNTRIES",
          payload: data,
        });
      } else {
        return dispatch({
          type: "SEARCH_COUNTRIES",
          payload: [], 
        });
      }
    } catch (error) {
      const errorMessage = "Error: This Country doesn't exist";
      dispatch({
        type: "SEARCH_ERROR",
        payload: errorMessage,
      });
    }
  };
};

export const deleteActivities = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.delete(
        `/activities/${id}`
      );

      if (data === 1) {
        return dispatch({
          type: "DELETE_ACTIVITIES",
          payload: id,
        });
      }
    } catch (error) {
      alert("Error: " + error.response);
    }
  };
};

export const filterCountryByContinent = (payload) => {
  return {
    type: "FILTER_BY_CONTINENT",
    payload,
  };
};

export const filterActivities = (payload) => {
  return {
    type: "FILTER_ACTIVITIES",
    payload,
  };
};

export const filterOrder = (payload) => {
  return {
    type: "FILTER_ORDER",
    payload,
  };
};

export const resetFilters = () => {
  return {
    type: "RESET_FILTERS",
  };
};

export const flipCard = (cardId) => {
  return {
    type: "FLIP_CARD",
    payload: cardId,
  };
};

export const resetPage = () => {
  return {
    type: "RESET_PAGE",
  };
};