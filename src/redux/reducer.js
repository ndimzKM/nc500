import * as Types from "./actions";
const initialState = {
  hostels: [],
  itinerary: {
    startdate: "",
    stages: 0,
  },
  modalActive: false,
  stages: [
    //   {
    //     hostel: {}, //hostels contain number of nights for each adn hostel name/object
    //     nights:0
    //   }
  ],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.UPDATE_HOSTELS:
      return { ...state, hostels: action.payload };
    case Types.UPDATE_ITINERARY:
      return { ...state, itinerary: action.payload };
    case Types.UPDATE_STAGES:
      return { ...state, stages: action.payload };
    case Types.UPDATE_SINGLE_STAGE:
      return { ...state, stages: action.payload };
    case Types.TOGGLE_MODAL:
      return { ...state, modalActive: action.payload };

    default:
      return state;
  }
};

export { reducer };
