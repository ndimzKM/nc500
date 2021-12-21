import axios from "axios";

export const UPDATE_HOSTELS = "UPDATE_HOSTELS";
export const UPDATE_ITINERARY = "UPDATE_ITINERARY";
export const UPDATE_STAGES = "UPDATE_STAGES";
export const UPDATE_SINGLE_STAGE = "UPDATE_SINGLE_STAGE";
export const TOGGLE_MODAL = "TOGGLE_MODAL";

export const setHostels = () => (dispatch) => {
  axios
    .get("http://localhost:5000/hostels")
    .then((res) => {
      let { data } = res;
      dispatch({
        type: UPDATE_HOSTELS,
        payload: data,
      });
    })
    .catch((err) => console.log(err));
};

export const loadItineraries = (user) => (dispatch) => {
  axios
    .get(`http://localhost:5000/itineraries/${user}`)
    .then((res) => {
      let { data } = res;
      dispatch({
        type: UPDATE_ITINERARY,
        payload: data,
      });
    })
    .catch((err) => console.log(err));
};

export const updateItinerary = (itinerary) => (dispatch) => {
  dispatch({
    type: UPDATE_ITINERARY,
    payload: itinerary,
  });
};

export const updateStages = (stages) => (dispatch) => {
  dispatch({
    type: UPDATE_STAGES,
    payload: stages,
  });
};

export const updateSingleStage = (stage) => (dispatch) => {
  dispatch({
    type: UPDATE_SINGLE_STAGE,
    payload: stage,
  });
};

export const toggleModal = (state) => (dispatch) => {
  dispatch({
    type: TOGGLE_MODAL,
    payload: state,
  });
};
