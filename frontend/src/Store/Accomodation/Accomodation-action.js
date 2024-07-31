import axios from "axios";
import { accomodationActions } from "./Accomodation-slice";

// Store -> Action -> Reducer
export const createAccomodation = (accomodationData) => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());
    // creating  a new accommodation by sending post request to the server with data in JSON format
    const response = await axios.post(
      "https://homelyhub-backend-cmes.onrender.com/api/v1/rent/user/newAccommodation",
      accomodationData
    );
    if (!response) {
      throw Error("Could not get any Accomodation");
    }
  } catch (e) {
    dispatch(accomodationActions.getErrors(e.response.data.message));
  }
};

export const getAllAccomodation = () => async (dispatch) => {
  try {
    dispatch(accomodationActions.getAccomodationRequest());
    // get request to fetch all the accomodation data
    const { data } = await axios.get(
      "https://homelyhub-backend-cmes.onrender.com/api/v1/rent/user/myAccommodation"
    );
    const accom = data.data;
    dispatch(accomodationActions.getAccomodation(accom));
  } catch (e) {
    dispatch(accomodationActions.getErrors(e.response.data.message));
  }
};
